"""Hospital Model."""
from pydantic import BaseModel

class Hospital(BaseModel):
    id: str
    name: str
    status: str
