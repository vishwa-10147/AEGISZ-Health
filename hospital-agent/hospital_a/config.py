import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    hospital_id: str = "hospital-A"
    name: str = "Metro General Hospital"
    db_url: str = os.getenv("HOSPITAL_A_DB_URL", "postgresql://user:pass@localhost:5432/hospital_a")

settings = Settings()
