from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text
from typing import List
from app.core.database import get_control_db, get_hospital_a_db, get_hospital_b_db
from app.core.dependencies import get_current_user
from app.models.user import User
from app.exchange.request import ExchangeCreate
from app.exchange.service import ExchangeService

router = APIRouter(prefix="/exchange", tags=["Exchange"])

@router.post("/request")
async def request_exchange(
    req: ExchangeCreate,
    db: AsyncSession = Depends(get_control_db),
    current_user: User = Depends(get_current_user)
):
    if current_user.role.value != "DOCTOR":
        raise HTTPException(status_code=403, detail="Not authorized to request exchanges")
    
    result = await ExchangeService.create_request(db, req, current_user.hospital_id)
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
    db_a: AsyncSession = Depends(get_hospital_a_db),
    db_b: AsyncSession = Depends(get_hospital_b_db),
    current_user: User = Depends(get_current_user)
):
    req = await ExchangeService.get_request(control_db, request_id)
    if not req:
         raise HTTPException(status_code=404, detail="Request not found")

    target_db = db_a if req["destination_hospital"] == "hospital-A" else db_b
    
    try:
        resources = await ExchangeService.execute_exchange(control_db, target_db, request_id, allowed_types)
        return {"request_id": request_id, "data": resources}
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
