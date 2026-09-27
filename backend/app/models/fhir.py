"""FHIR base models."""
from pydantic import BaseModel
from enum import Enum

class ResourceType(str, Enum):
    PATIENT = "Patient"
    ENCOUNTER = "Encounter"

class FHIRResource(BaseModel):
    id: str
    resourceType: ResourceType
