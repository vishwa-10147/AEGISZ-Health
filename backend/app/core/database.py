from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession
from sqlalchemy.orm import declarative_base
from app.config import settings

Base = declarative_base()

def get_engine(url: str):
    return create_async_engine(url.replace("postgresql://", "postgresql+asyncpg://"), echo=(settings.ENVIRONMENT == "development"))

engine_control = get_engine(settings.CONTROL_DB_URL)
SessionLocalControl = async_sessionmaker(autocommit=False, autoflush=False, bind=engine_control, class_=AsyncSession)

hospital_engines = {
    "hospital-A": get_engine(settings.HOSPITAL_A_DB_URL),
    "hospital-B": get_engine(settings.HOSPITAL_B_DB_URL),
    "hospital-C": get_engine(settings.HOSPITAL_C_DB_URL),
    "hospital-D": get_engine(settings.HOSPITAL_D_DB_URL),
    "hospital-E": get_engine(settings.HOSPITAL_E_DB_URL),
    "hospital-F": get_engine(settings.HOSPITAL_F_DB_URL),
}

hospital_sessions = {
    name: async_sessionmaker(autocommit=False, autoflush=False, bind=eng, class_=AsyncSession)
    for name, eng in hospital_engines.items()
}

async def get_control_db():
    async with SessionLocalControl() as session:
        yield session

# Helper for tests that were mocking these
async def get_hospital_a_db():
    async with hospital_sessions["hospital-A"]() as session:
        yield session

async def get_hospital_b_db():
    async with hospital_sessions["hospital-B"]() as session:
        yield session
