from datetime import datetime

from pydantic import BaseModel


class ConversationRead(BaseModel):
    id: int
    buyer_id: int
    farmer_id: int
    created_at: datetime

    class Config:
        from_attributes = True


class MessageCreate(BaseModel):
    conversation_id: int
    message_text: str


class MessageRead(BaseModel):
    id: int
    conversation_id: int
    sender_id: int
    message_text: str
    is_read: bool
    created_at: datetime

    class Config:
        from_attributes = True


