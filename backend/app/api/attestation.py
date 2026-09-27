"""Attestation endpoints."""
from fastapi import APIRouter

router = APIRouter(prefix="/attestation", tags=["attestation"])

@router.get("/status")
async def get_attestation_status() -> dict:
    """GET /attestation/status"""
    return {"attested": True}
