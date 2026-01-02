from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from core.security import get_current_user, get_db
from db.models import Conversation, Message, User, UserRole
from schemas.messaging import ConversationRead, MessageCreate, MessageRead

router = APIRouter()


@router.post("/conversations", response_model=ConversationRead, status_code=status.HTTP_200_OK)
def get_or_create_conversation(
    counterpart_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    counterpart = db.get(User, counterpart_id)
    if not counterpart:
        raise HTTPException(status_code=404, detail="User not found")

    # Enforce buyer-farmer only
    if {current_user.role, counterpart.role} != {UserRole.BUYER, UserRole.FARMER}:
        raise HTTPException(
            status_code=400,
            detail="Conversations allowed only between buyer and farmer",
        )

    if current_user.role == UserRole.BUYER:
        buyer_id, farmer_id = current_user.id, counterpart.id
    else:
        buyer_id, farmer_id = counterpart.id, current_user.id

    conv = (
        db.query(Conversation)
        .filter(Conversation.buyer_id == buyer_id, Conversation.farmer_id == farmer_id)
        .first()
    )
    if not conv:
        conv = Conversation(buyer_id=buyer_id, farmer_id=farmer_id)
        db.add(conv)
        db.commit()
        db.refresh(conv)
    return conv


@router.post("/messages", response_model=MessageRead, status_code=status.HTTP_201_CREATED)
def send_message(
    msg_in: MessageCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    conv = db.get(Conversation, msg_in.conversation_id)
    if not conv:
        raise HTTPException(status_code=404, detail="Conversation not found")

    if current_user.id not in (conv.buyer_id, conv.farmer_id):
        raise HTTPException(status_code=403, detail="Not part of this conversation")

    message = Message(
        conversation_id=conv.id,
        sender_id=current_user.id,
        message_text=msg_in.message_text,
    )
    db.add(message)
    db.commit()
    db.refresh(message)
    return message


@router.get("/conversations", response_model=list[ConversationRead])
def list_conversations(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """List all conversations for the current user."""
    conversations = (
        db.query(Conversation)
        .filter(
            (Conversation.buyer_id == current_user.id) |
            (Conversation.farmer_id == current_user.id)
        )
        .order_by(Conversation.created_at.desc())
        .all()
    )
    return conversations


@router.get("/conversations/{conv_id}/messages", response_model=list[MessageRead])
def list_messages(
    conv_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    conv = db.get(Conversation, conv_id)
    if not conv:
        raise HTTPException(status_code=404, detail="Conversation not found")

    if current_user.id not in (conv.buyer_id, conv.farmer_id):
        raise HTTPException(status_code=403, detail="Not part of this conversation")

    return (
        db.query(Message)
        .filter(Message.conversation_id == conv_id)
        .order_by(Message.created_at.asc())
        .all()
    )







