"""Patients endpoints."""
from fastapi import APIRouter

router = APIRouter(prefix="/patients", tags=["patients"])

@router.get("/{patient_id}/resources")
async def get_patient_resources(patient_id: str) -> dict:
    """GET /patients/{patient_id}/resources"""
    return {"patient_id": patient_id, "resources": []}
