from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession
from sqlalchemy.orm import declarative_base
from app.config import get_settings

settings = get_settings()

engine_a = create_async_engine(settings.hospital_a_url, echo=settings.debug)
engine_b = create_async_engine(settings.hospital_b_url, echo=settings.debug)
engine_control = create_async_engine(settings.control_url, echo=settings.debug)

SessionLocalA = async_sessionmaker(engine_a, class_=AsyncSession, expire_on_commit=False)
SessionLocalB = async_sessionmaker(engine_b, class_=AsyncSession, expire_on_commit=False)
SessionLocalControl = async_sessionmaker(engine_control, class_=AsyncSession, expire_on_commit=False)

Base = declarative_base()

async def get_hospital_a_db():
    async with SessionLocalA() as session:
        yield session

async def get_hospital_b_db():
    async with SessionLocalB() as session:
        yield session
        
async def get_control_db():
    async with SessionLocalControl() as session:
        yield session
