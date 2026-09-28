from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text
from app.core.database import get_control_db, get_hospital_a_db, get_hospital_b_db

router = APIRouter()

@router.get("/health", tags=["System"])
async def health_check():
    return {"status": "healthy", "service": "AEGISZ-Health"}

@router.get("/ready", tags=["System"])
async def readiness_check(
    db_control: AsyncSession = Depends(get_control_db),
    db_a: AsyncSession = Depends(get_hospital_a_db),
    db_b: AsyncSession = Depends(get_hospital_b_db)
):
    status = {"status": "ready", "databases": {}}
    try:
        await db_control.execute(text("SELECT 1"))
        status["databases"]["control"] = "connected"
        await db_a.execute(text("SELECT 1"))
        status["databases"]["hospital_a"] = "connected"
        await db_b.execute(text("SELECT 1"))
        status["databases"]["hospital_b"] = "connected"
    except Exception as e:
        status["status"] = "not_ready"
        status["error"] = str(e)
        
    return status
