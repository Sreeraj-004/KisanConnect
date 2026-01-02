from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func

from core.security import get_current_user, get_db, require_role
from db.models import Order, OrderItem, Product, User, UserRole
from schemas.order import OrderRead
from schemas.product import ProductRead

router = APIRouter()


@router.get("/farmer", dependencies=[Depends(require_role(UserRole.FARMER))])
def farmer_dashboard(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Get farmer dashboard data."""
    # Get farmer's products
    products = (
        db.query(Product)
        .filter(Product.farmer_id == current_user.id)
        .order_by(Product.created_at.desc())
        .all()
    )
    
    # Get orders for farmer's products
    product_ids = [p.id for p in products]
    
    if product_ids:
        orders = (
            db.query(Order)
            .join(OrderItem)
            .filter(OrderItem.product_id.in_(product_ids))
            .distinct()
            .order_by(Order.created_at.desc())
            .limit(10)
            .all()
        )
    else:
        orders = []
    
    # Calculate statistics
    total_products = len(products)
    total_orders = len(orders) if product_ids else 0
    
    # Calculate total revenue
    total_revenue = (
        db.query(func.sum(OrderItem.price * OrderItem.quantity))
        .join(Order)
        .filter(OrderItem.product_id.in_(product_ids))
        .scalar() or 0.0
    )
    
    # Low stock products (quantity < 10)
    low_stock_products = [p for p in products if p.quantity < 10]
    
    return {
        "user": {
            "id": current_user.id,
            "name": current_user.name,
            "email": current_user.email,
            "role": current_user.role.value,
        },
        "statistics": {
            "total_products": total_products,
            "total_orders": total_orders,
            "total_revenue": float(total_revenue),
            "low_stock_count": len(low_stock_products),
        },
        "products": products,
        "recent_orders": orders,
        "low_stock_products": low_stock_products[:5],  # Top 5 low stock
    }


@router.get("/buyer", dependencies=[Depends(require_role(UserRole.BUYER))])
def buyer_dashboard(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Get buyer/customer dashboard data."""
    # Get all available products
    products = (
        db.query(Product)
        .filter(Product.quantity > 0)
        .order_by(Product.created_at.desc())
        .limit(10)
        .all()
    )
    
    # Get buyer's orders
    orders = (
        db.query(Order)
        .filter(Order.buyer_id == current_user.id)
        .order_by(Order.created_at.desc())
        .limit(5)
        .all()
    )
    
    # Get cart item count
    from db.models import CartItem
    cart_count = (
        db.query(func.sum(CartItem.quantity))
        .filter(CartItem.user_id == current_user.id)
        .scalar() or 0
    )
    
    # Calculate statistics
    total_orders = (
        db.query(func.count(Order.id))
        .filter(Order.buyer_id == current_user.id)
        .scalar() or 0
    )
    
    total_spent = (
        db.query(func.sum(Order.total_amount))
        .filter(Order.buyer_id == current_user.id)
        .scalar() or 0.0
    )
    
    return {
        "user": {
            "id": current_user.id,
            "name": current_user.name,
            "email": current_user.email,
            "role": current_user.role.value,
        },
        "statistics": {
            "total_orders": total_orders,
            "total_spent": float(total_spent),
            "cart_items": int(cart_count),
        },
        "featured_products": products,
        "recent_orders": orders,
    }

