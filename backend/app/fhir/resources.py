"""FHIR Models."""
from pydantic import BaseModel

class Patient(BaseModel):
    id: str

class Encounter(BaseModel):
    id: str

class Observation(BaseModel):
    id: str

class MedicationRequest(BaseModel):
    id: str

class DiagnosticReport(BaseModel):
    id: str

class DocumentReference(BaseModel):
    id: str
