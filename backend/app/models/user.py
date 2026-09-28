from pydantic import BaseModel
from typing import Optional
from app.auth.roles import UserRole

class User(BaseModel):
    id: str
    username: str
    role: UserRole
    hospital_id: Optional[str] = None

class UserInDB(User):
    hashed_password: str
