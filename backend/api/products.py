from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session

from core.security import get_current_user, get_db, require_role
from db.models import Product, User, UserRole
from schemas.product import ProductCreate, ProductRead, ProductUpdate

router = APIRouter()


@router.post(
    "/", response_model=ProductRead, status_code=status.HTTP_201_CREATED,
    dependencies=[Depends(require_role(UserRole.FARMER))]
)
def create_product(
    product_in: ProductCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    product = Product(
        farmer_id=current_user.id,
        **product_in.model_dump(),
    )
    db.add(product)
    db.commit()
    db.refresh(product)
    return product


@router.get("/", response_model=list[ProductRead])
def list_products(
    db: Session = Depends(get_db),
    category: str | None = Query(default=None),
    q: str | None = Query(default=None, description="Search query for product name or description"),
):
    """List products with optional category filter and search."""
    query = db.query(Product)
    
    if category:
        query = query.filter(Product.category == category)
    
    if q:
        search_term = f"%{q.lower()}%"
        query = query.filter(
            (Product.name.ilike(search_term)) |
            (Product.description.ilike(search_term))
        )
    
    return query.all()


@router.get("/{product_id}", response_model=ProductRead)
def get_product(product_id: int, db: Session = Depends(get_db)):
    product = db.get(Product, product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product


@router.put(
    "/{product_id}",
    response_model=ProductRead,
    dependencies=[Depends(require_role(UserRole.FARMER))],
)
def update_product(
    product_id: int,
    product_in: ProductUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    product = db.get(Product, product_id)
    if not product or product.farmer_id != current_user.id:
        raise HTTPException(status_code=404, detail="Product not found")
    for field, value in product_in.model_dump(exclude_unset=True).items():
        setattr(product, field, value)
    db.commit()
    db.refresh(product)
    return product


@router.delete(
    "/{product_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    dependencies=[Depends(require_role(UserRole.FARMER))],
)
def delete_product(
    product_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    product = db.get(Product, product_id)
    if not product or product.farmer_id != current_user.id:
        raise HTTPException(status_code=404, detail="Product not found")
    db.delete(product)
    db.commit()


