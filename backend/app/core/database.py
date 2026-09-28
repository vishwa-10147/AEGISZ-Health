from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession
from sqlalchemy.orm import declarative_base
from app.config import settings

# Base class for SQLAlchemy models
Base = declarative_base()

# Hospital A DB
engine_a = create_async_engine(settings.HOSPITAL_A_DB_URL.replace("postgresql://", "postgresql+asyncpg://"), echo=(settings.ENVIRONMENT == "development"))
SessionLocalA = async_sessionmaker(autocommit=False, autoflush=False, bind=engine_a, class_=AsyncSession)

# Hospital B DB
engine_b = create_async_engine(settings.HOSPITAL_B_DB_URL.replace("postgresql://", "postgresql+asyncpg://"), echo=(settings.ENVIRONMENT == "development"))
SessionLocalB = async_sessionmaker(autocommit=False, autoflush=False, bind=engine_b, class_=AsyncSession)

# Control DB
engine_control = create_async_engine(settings.CONTROL_DB_URL.replace("postgresql://", "postgresql+asyncpg://"), echo=(settings.ENVIRONMENT == "development"))
SessionLocalControl = async_sessionmaker(autocommit=False, autoflush=False, bind=engine_control, class_=AsyncSession)

# Dependencies
async def get_hospital_a_db():
    async with SessionLocalA() as session:
        yield session

async def get_hospital_b_db():
    async with SessionLocalB() as session:
        yield session

async def get_control_db():
    async with SessionLocalControl() as session:
        yield session
