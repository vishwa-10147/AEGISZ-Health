import asyncio
from sqlalchemy.ext.asyncio import create_async_engine
from sqlalchemy import text
from app.config import settings

async def f():
    engine = create_async_engine(settings.CONTROL_DB_URL)
    async with engine.begin() as c:
        await c.execute(text("INSERT INTO hospitals (id, name, status) VALUES ('hospital-A', 'Hospital A', 'ACTIVE') ON CONFLICT DO NOTHING"))
        await c.execute(text("INSERT INTO hospitals (id, name, status) VALUES ('hospital-B', 'Hospital B', 'ACTIVE') ON CONFLICT DO NOTHING"))
        
        # Now seed admin user
        from app.auth.authentication import get_password_hash
        pwd = get_password_hash("password123")
        await c.execute(text(f"INSERT INTO users (id, username, role, hospital_id, hashed_password) VALUES ('admin', 'admin', 'HOSPITAL_ADMIN', 'hospital-A', '{pwd}') ON CONFLICT DO NOTHING"))
        print("Admin user seeded successfully!")

asyncio.run(f())
