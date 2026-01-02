from datetime import datetime
from enum import Enum

from pydantic import BaseModel


class OrderStatus(str, Enum):
    pending = "pending"
    shipped = "shipped"
    delivered = "delivered"
    cancelled = "cancelled"


class OrderItemBase(BaseModel):
    product_id: int
    quantity: int


class OrderItemRead(BaseModel):
    id: int
    product_id: int
    quantity: int
    price: float

    class Config:
        from_attributes = True


class OrderCreate(BaseModel):
    items: list[OrderItemBase]


class OrderRead(BaseModel):
    id: int
    buyer_id: int
    total_amount: float
    status: OrderStatus
    created_at: datetime
    items: list[OrderItemRead]

    class Config:
        from_attributes = True







