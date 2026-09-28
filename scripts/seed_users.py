import asyncio
from sqlalchemy.ext.asyncio import create_async_engine
from sqlalchemy import text
from app.config import settings
from app.auth.authentication import get_password_hash

async def seed_users():
    print("Seeding Users in Control DB...")
    engine_control = create_async_engine(settings.CONTROL_DB_URL.replace("postgresql://", "postgresql+asyncpg://"))
    
    users = [
        ("u1", "doctor_a", "DOCTOR", "hospital-A", "password123"),
        ("u2", "doctor_b", "DOCTOR", "hospital-B", "password123"),
        ("u3", "admin", "SECURITY_ADMIN", None, "password123"),
        ("u4", "auditor", "AUDITOR", None, "password123"),
    ]
    
    async with engine_control.begin() as conn:
        for u in users:
            hashed = get_password_hash(u[4])
            await conn.execute(
                text("INSERT INTO users (id, username, role, hospital_id, hashed_password) VALUES (:id, :u, :r, :h, :pw) ON CONFLICT DO NOTHING"),
                {"id": u[0], "u": u[1], "r": u[2], "h": u[3], "pw": hashed}
            )
    print("Users seeded!")

if __name__ == "__main__":
    asyncio.run(seed_users())
