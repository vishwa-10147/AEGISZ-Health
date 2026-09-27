"""Policy Models."""
from pydantic import BaseModel

class AccessPolicy(BaseModel):
    id: str

class PolicyDecision(BaseModel):
    allowed: bool
