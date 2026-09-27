from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import List
from functools import lru_cache

class Settings(BaseSettings):
    project_name: str = "AEGISZ-Health"
    debug: bool = False
    
    cors_origins: List[str] = ["http://localhost:3000"]

    db_user: str = "postgres"
    db_password: str = "postgres"
    db_host: str = "localhost"
    db_port: str = "5432"
    
    hospital_a_db: str = "aegisz_hospital_a"
    hospital_b_db: str = "aegisz_hospital_b"
    control_db: str = "aegisz_control"

    secret_key: str = "supersecretkey"
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 30

    qkd_endpoint: str = "http://localhost:5000"

    model_config = SettingsConfigDict(env_file=".env")

    @property
    def hospital_a_url(self) -> str:
        return f"postgresql+asyncpg://{self.db_user}:{self.db_password}@{self.db_host}:{self.db_port}/{self.hospital_a_db}"
        
    @property
    def hospital_b_url(self) -> str:
        return f"postgresql+asyncpg://{self.db_user}:{self.db_password}@{self.db_host}:{self.db_port}/{self.hospital_b_db}"
        
    @property
    def control_url(self) -> str:
        return f"postgresql+asyncpg://{self.db_user}:{self.db_password}@{self.db_host}:{self.db_port}/{self.control_db}"

@lru_cache()
def get_settings():
    return Settings()
