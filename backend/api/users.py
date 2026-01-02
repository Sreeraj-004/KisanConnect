from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from core.security import get_current_user, get_db
from db.models import User
from schemas.user import UserRead, UserBase

router = APIRouter()


@router.get("/me", response_model=UserRead)
def get_current_user_profile(
    current_user: User = Depends(get_current_user),
):
    """Get current user's profile."""
    return current_user


@router.put("/me", response_model=UserRead)
def update_current_user_profile(
    user_update: UserBase,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Update current user's profile."""
    # Check if email is being changed and if it's already taken
    if user_update.email != current_user.email:
        existing = db.query(User).filter(User.email == user_update.email).first()
        if existing:
            raise HTTPException(status_code=400, detail="Email already registered")
    
    # Update fields
    current_user.name = user_update.name
    current_user.email = user_update.email
    current_user.phone = user_update.phone
    current_user.address = user_update.address
    
    db.commit()
    db.refresh(current_user)
    
    return current_user

