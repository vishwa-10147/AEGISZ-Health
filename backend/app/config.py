from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import List

class Settings(BaseSettings):
    PROJECT_NAME: str = "AEGISZ-Health API"
    VERSION: str = "0.1.0"
    
    HOSPITAL_A_DB_URL: str
    HOSPITAL_B_DB_URL: str
    CONTROL_DB_URL: str
    DATABASE_URL: str
    
    SECRET_KEY: str
    JWT_SECRET: str
    JWT_ALGORITHM: str = "HS256"
    JWT_EXPIRATION_MINUTES: int = 30
    
    ENVIRONMENT: str = "development"
    SECURE_EXECUTION_MODE: str = "simulated"
    LOG_LEVEL: str = "INFO"
    
    CORS_ORIGINS: str = "http://localhost:3000"
    
    @property
    def cors_origins_list(self) -> List[str]:
        return [origin.strip() for origin in self.CORS_ORIGINS.split(",")]

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

settings = Settings()
