from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from core.security import get_current_user, get_db, require_role
from db.models import Order, OrderItem, Product, User, UserRole
from schemas.order import OrderCreate, OrderRead

router = APIRouter()


@router.post(
    "/", response_model=OrderRead, status_code=status.HTTP_201_CREATED,
    dependencies=[Depends(require_role(UserRole.BUYER))]
)
def create_order(
    order_in: OrderCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    if not order_in.items:
        raise HTTPException(status_code=400, detail="Order must contain items")

    product_ids = [i.product_id for i in order_in.items]
    products = {
        p.id: p
        for p in db.query(Product).filter(Product.id.in_(product_ids))
    }
    if len(products) != len(product_ids):
        raise HTTPException(status_code=400, detail="Invalid product in order")

    order = Order(buyer_id=current_user.id, total_amount=0)
    db.add(order)
    db.flush()

    total_amount = 0.0
    for item_in in order_in.items:
        product = products[item_in.product_id]
        if product.quantity < item_in.quantity:
            raise HTTPException(
                status_code=400,
                detail=f"Insufficient stock for product {product.id}",
            )
        line_price = float(product.price) * item_in.quantity
        total_amount += line_price
        product.quantity -= item_in.quantity
        db.add(
            OrderItem(
                order_id=order.id,
                product_id=product.id,
                quantity=item_in.quantity,
                price=product.price,
            )
        )

    order.total_amount = total_amount
    db.commit()
    db.refresh(order)
    return order


@router.get(
    "/", response_model=list[OrderRead],
    dependencies=[Depends(require_role(UserRole.BUYER))]
)
def list_my_orders(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return (
        db.query(Order)
        .filter(Order.buyer_id == current_user.id)
        .order_by(Order.created_at.desc())
        .all()
    )


@router.get("/{order_id}", response_model=OrderRead)
def get_order(
    order_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Get order details by ID."""
    order = db.get(Order, order_id)
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    
    # Buyers can only see their own orders
    # Farmers can see orders for their products
    if current_user.role == UserRole.BUYER:
        if order.buyer_id != current_user.id:
            raise HTTPException(status_code=403, detail="Not authorized to view this order")
    elif current_user.role == UserRole.FARMER:
        # Check if order contains farmer's products
        product_ids = [item.product_id for item in order.items]
        farmer_products = (
            db.query(Product)
            .filter(Product.id.in_(product_ids), Product.farmer_id == current_user.id)
            .first()
        )
        if not farmer_products:
            raise HTTPException(status_code=403, detail="Not authorized to view this order")
    
    return order


@router.put(
    "/{order_id}/status",
    response_model=OrderRead,
    dependencies=[Depends(require_role(UserRole.FARMER, UserRole.ADMIN))],
)
def update_order_status(
    order_id: int,
    new_status: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Update order status (Farmer or Admin only)."""
    from db.models import OrderStatus
    
    try:
        status_enum = OrderStatus(new_status)
    except ValueError:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid status. Must be one of: {[s.value for s in OrderStatus]}",
        )
    
    order = db.get(Order, order_id)
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    
    # Farmers can only update orders for their products
    if current_user.role == UserRole.FARMER:
        product_ids = [item.product_id for item in order.items]
        farmer_products = (
            db.query(Product)
            .filter(Product.id.in_(product_ids), Product.farmer_id == current_user.id)
            .first()
        )
        if not farmer_products:
            raise HTTPException(
                status_code=403,
                detail="Not authorized to update this order",
            )
    
    order.status = status_enum
    db.commit()
    db.refresh(order)
    
    return order


@router.post(
    "/{order_id}/cancel",
    response_model=OrderRead,
    dependencies=[Depends(require_role(UserRole.BUYER))],
)
def cancel_order(
    order_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Cancel an order (Buyer only, only if order is pending)."""
    from db.models import OrderStatus
    
    order = db.get(Order, order_id)
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    
    # Only buyer can cancel their own order
    if order.buyer_id != current_user.id:
        raise HTTPException(
            status_code=403,
            detail="Not authorized to cancel this order",
        )
    
    # Only pending orders can be cancelled
    if order.status != OrderStatus.PENDING:
        raise HTTPException(
            status_code=400,
            detail=f"Cannot cancel order with status '{order.status.value}'. Only pending orders can be cancelled.",
        )
    
    # Restore product quantities
    for item in order.items:
        product = db.get(Product, item.product_id)
        if product:
            product.quantity += item.quantity
    
    # Update order status to cancelled
    order.status = OrderStatus.CANCELLED
    db.commit()
    db.refresh(order)
    
    return order







