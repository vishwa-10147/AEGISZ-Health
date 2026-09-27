"""Audit Models."""
from pydantic import BaseModel

class AuditEvent(BaseModel):
    event_id: str
    timestamp: str
    actor_id: str
    hospital_id: str
    action: str
    resource_type: str
    resource_identifier_hash: str
    purpose: str
    decision: str
    severity: str
    previous_hash: str
    event_hash: str
