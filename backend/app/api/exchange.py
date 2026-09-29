import time
from collections import defaultdict
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text
from typing import List
from app.core.database import get_control_db, get_hospital_a_db, get_hospital_b_db
from app.core.dependencies import get_current_user
from app.models.user import User
from app.exchange.request import ExchangeCreate
from app.exchange.service import ExchangeService
from app.audit.service import AuditService

router = APIRouter(prefix="/exchange", tags=["Exchange"])

# In-memory Anomaly Detection (Rate Limiter Simulation)
request_history = defaultdict(list)

@router.get("/")
async def list_exchanges(
    db: AsyncSession = Depends(get_control_db),
    current_user: User = Depends(get_current_user)
):
    query = text("SELECT * FROM exchange_requests LIMIT 20")
    res = await db.execute(query)
    reqs = []
    for row in res.fetchall():
        r = dict(row._mapping)
        reqs.append(r)
    return reqs

@router.post("/request")
async def request_exchange(
    req: ExchangeCreate,
    db: AsyncSession = Depends(get_control_db),
    current_user: User = Depends(get_current_user)
):
    if current_user.role.value != "DOCTOR":
        raise HTTPException(status_code=403, detail="Not authorized to request exchanges")
    
    # --- AI Anomaly Detection Engine ---
    now = time.time()
    user_requests = request_history[current_user.username]
    # Filter requests in the last 60 seconds
    user_requests = [t for t in user_requests if now - t < 60]
    request_history[current_user.username] = user_requests
    
    if len(user_requests) >= 3:
        await AuditService.create_event(
            db=db, actor_id=current_user.username, hospital_id=current_user.hospital_id,
            action="ANOMALY_DETECTED", purpose="High velocity requests blocked", severity="HIGH"
        )
        raise HTTPException(status_code=429, detail="AI Anomaly Detected: Abnormal request volume. Account temporarily locked.")
    
    request_history[current_user.username].append(now)
    # -----------------------------------
    
    result = await ExchangeService.create_request(db, req, current_user.hospital_id, current_user.username)
    return result

@router.get("/{request_id}")
async def get_exchange(
    request_id: str,
    db: AsyncSession = Depends(get_control_db),
    current_user: User = Depends(get_current_user)
):
    req = await ExchangeService.get_request(db, request_id)
    if not req:
        raise HTTPException(status_code=404, detail="Request not found")
    return req

@router.post("/{request_id}/approve")
async def approve_exchange(
    request_id: str,
    db: AsyncSession = Depends(get_control_db),
    current_user: User = Depends(get_current_user)
):
    req = await ExchangeService.get_request(db, request_id)
    if not req:
        raise HTTPException(status_code=404, detail="Request not found")
    
    if current_user.hospital_id != req["destination_hospital"] and current_user.role.value != "SYSTEM_AGENT":
        raise HTTPException(status_code=403, detail="Not authorized to approve for this hospital")
        
    query = text("UPDATE exchange_requests SET status = 'APPROVED' WHERE id = :id")
    await db.execute(query, {"id": request_id})
    await db.commit()
    return {"id": request_id, "status": "APPROVED"}
    
@router.post("/{request_id}/execute")
async def execute_exchange(
    request_id: str,
    allowed_types: List[str] = Query(...),
    control_db: AsyncSession = Depends(get_control_db),
    current_user: User = Depends(get_current_user)
):
    req = await ExchangeService.get_request(control_db, request_id)
    if not req:
         raise HTTPException(status_code=404, detail="Request not found")

    from app.core.database import hospital_sessions
    hospital_id = req["destination_hospital"]
    if hospital_id not in hospital_sessions:
        raise HTTPException(status_code=400, detail="Invalid target hospital")

    try:
        async with hospital_sessions[hospital_id]() as target_db:
            resources = await ExchangeService.execute_exchange(control_db, target_db, request_id, allowed_types)
            return {"request_id": request_id, "data": resources}
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
