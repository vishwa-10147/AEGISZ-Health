"""Health and Readiness endpoints."""
from fastapi import APIRouter

router = APIRouter()

@router.get("/health")
async def health() -> dict:
    """Returns basic health status."""
    return {"status": "ok"}

@router.get("/ready")
async def ready() -> dict:
    """Returns readiness status including DB checks."""
    # TODO: Implement DB check
    return {"status": "ready"}
