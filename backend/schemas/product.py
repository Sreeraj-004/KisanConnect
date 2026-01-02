from datetime import datetime

from pydantic import BaseModel


class ProductBase(BaseModel):
    name: str
    category: str | None = None
    description: str | None = None
    price: float
    quantity: int
    image_url: str | None = None


class ProductCreate(ProductBase):
    """Farmer-specific fields like farmer_id come from auth."""

    pass


class ProductUpdate(BaseModel):
    name: str | None = None
    category: str | None = None
    description: str | None = None
    price: float | None = None
    quantity: int | None = None
    image_url: str | None = None


class ProductRead(ProductBase):
    id: int
    farmer_id: int
    created_at: datetime

    class Config:
        from_attributes = True







