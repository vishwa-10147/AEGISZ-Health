import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    hospital_id: str = "hospital-B"
    name: str = "City Medical Center"
    db_url: str = os.getenv("HOSPITAL_B_DB_URL", "postgresql://user:pass@localhost:5432/hospital_b")

settings = Settings()
