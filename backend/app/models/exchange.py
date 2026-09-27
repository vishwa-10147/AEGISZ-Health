"""Exchange Models."""
from pydantic import BaseModel

class ExchangeStatus(BaseModel):
    status: str

class ExchangeRequest(BaseModel):
    id: str
