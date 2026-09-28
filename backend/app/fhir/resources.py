from pydantic import BaseModel
from typing import List, Optional, Any, Dict

class FHIRResource(BaseModel):
    resourceType: str
    id: str

class Patient(FHIRResource):
    resourceType: str = "Patient"
    name: List[Dict[str, Any]] = []
    gender: Optional[str] = None
    birthDate: Optional[str] = None

class Observation(FHIRResource):
    resourceType: str = "Observation"
    status: str
    code: Dict[str, Any]
    subject: Dict[str, str]
    valueQuantity: Optional[Dict[str, Any]] = None

class Encounter(FHIRResource):
    resourceType: str = "Encounter"
    status: str
    subject: Dict[str, str]

class MedicationRequest(FHIRResource):
    resourceType: str = "MedicationRequest"
    status: str
    intent: str
    medicationCodeableConcept: Dict[str, Any]
    subject: Dict[str, str]
