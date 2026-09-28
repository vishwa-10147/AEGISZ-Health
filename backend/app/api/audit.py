from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_control_db
from app.audit.service import AuditService
from app.audit.verification import AuditVerification

router = APIRouter(prefix="/audit", tags=["Audit"])

@router.get("/events")
async def get_audit_events(limit: int = 50, db: AsyncSession = Depends(get_control_db)):
    events = await AuditService.get_events(db, limit)
    # Serialize datetime objects for JSON
    for e in events:
        if hasattr(e['timestamp'], 'isoformat'):
            e['timestamp'] = e['timestamp'].isoformat()
    return events

@router.get("/verify")
async def verify_audit_chain(db: AsyncSession = Depends(get_control_db)):
    return await AuditVerification.verify_chain(db)
