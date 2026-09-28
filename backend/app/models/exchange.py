from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class ExchangeRequestModel(BaseModel):
    id: str
    patient_id: str
    source_hospital: str
    destination_hospital: str
    purpose: str
    status: str
