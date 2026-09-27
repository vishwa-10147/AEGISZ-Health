from typing import AsyncGenerator
from fastapi import Depends
from app.config import Settings, get_settings
from app.core.database import get_hospital_a_db, get_hospital_b_db, get_control_db
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.exceptions import AuthenticationError

async def get_db_a() -> AsyncGenerator[AsyncSession, None]:
    async for session in get_hospital_a_db():
        yield session

async def get_db_b() -> AsyncGenerator[AsyncSession, None]:
    async for session in get_hospital_b_db():
        yield session
        
async def get_control_db_session() -> AsyncGenerator[AsyncSession, None]:
    async for session in get_control_db():
        yield session

def get_current_user():
    # Stub for auth dependency
    return {"user_id": 1, "username": "admin"}
