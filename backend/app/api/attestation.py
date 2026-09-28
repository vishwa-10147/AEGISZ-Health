from fastapi import APIRouter
from app.attestation.provider import ConfidentialExecutionProvider
import hashlib

router = APIRouter(prefix="/attestation", tags=["Confidential Computing"])

@router.get("/quote")
async def get_attestation_quote():
    """
    Returns a simulated hardware attestation quote for the backend workload.
    """
    # Measure a dummy payload to represent the backend binary state
    dummy_payload = "AEGISZ_HEALTH_BACKEND_V1"
    workload_hash = hashlib.sha256(dummy_payload.encode()).hexdigest()
    
    quote = ConfidentialExecutionProvider.get_hardware_quote(workload_hash)
    return quote
