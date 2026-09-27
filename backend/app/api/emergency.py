"""Emergency / Break Glass endpoints."""
from fastapi import APIRouter

router = APIRouter(prefix="/emergency", tags=["emergency"])

@router.post("/break-glass")
async def break_glass() -> dict:
    """POST /emergency/break-glass"""
    return {"status": "emergency access granted"}
