from pydantic import BaseModel
from typing import List

class ExchangeCreate(BaseModel):
    patient_id: str
    destination_hospital: str
    purpose: str
    requested_resources: List[str]

class ExchangeStatusUpdate(BaseModel):
    status: str
