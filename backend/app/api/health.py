from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text
from app.core.database import get_control_db, hospital_sessions

router = APIRouter()

@router.get("/health", tags=["System"])
async def health_check():
    return {"status": "healthy", "service": "AEGISZ-Health"}

@router.get("/ready", tags=["System"])
async def readiness_check(
    db_control: AsyncSession = Depends(get_control_db)
):
    status = {"status": "ready", "databases": {}}
    try:
        await db_control.execute(text("SELECT 1"))
        status["databases"]["control"] = "connected"
        
        for name, session_maker in hospital_sessions.items():
            async with session_maker() as session:
                await session.execute(text("SELECT 1"))
                status["databases"][name] = "connected"
    except Exception as e:
        status["status"] = "not_ready"
        status["error"] = str(e)
        
    return status
