"""Exchange Request Models."""
from pydantic import BaseModel

class ExchangeRequest(BaseModel):
    patient_id: str
    source_hospital: str
    destination_hospital: str
    purpose: str
    resources: list[str]
