"""Hospitals endpoints."""
from fastapi import APIRouter

router = APIRouter(prefix="/hospitals", tags=["hospitals"])

@router.get("/{hospital_id}")
async def get_hospital(hospital_id: str) -> dict:
    """GET /hospitals/{hospital_id}"""
    return {"hospital_id": hospital_id}
