import asyncio
import json
from sqlalchemy.ext.asyncio import create_async_engine
from sqlalchemy import text
from app.config import settings
import sys

async def init_schema():
    print("Initializing Database Schemas...")
    engine_control = create_async_engine(settings.CONTROL_DB_URL.replace("postgresql://", "postgresql+asyncpg://"))
    engine_a = create_async_engine(settings.HOSPITAL_A_DB_URL.replace("postgresql://", "postgresql+asyncpg://"))
    engine_b = create_async_engine(settings.HOSPITAL_B_DB_URL.replace("postgresql://", "postgresql+asyncpg://"))

    with open('data/schemas/control.sql', 'r') as f:
        control_sql = f.read()
    with open('data/schemas/hospital_a.sql', 'r') as f:
        hosp_a_sql = f.read()
    with open('data/schemas/hospital_b.sql', 'r') as f:
        hosp_b_sql = f.read()

    async with engine_control.begin() as conn:
        for stmt in control_sql.split(";")[:-1]: await conn.execute(text(stmt))
    async with engine_a.begin() as conn:
        for stmt in hosp_a_sql.split(";")[:-1]: await conn.execute(text(stmt))
    async with engine_b.begin() as conn:
        for stmt in hosp_b_sql.split(";")[:-1]: await conn.execute(text(stmt))

    print("Schemas initialized.")
    return engine_a, engine_b, engine_control

async def seed_data(engine_a, engine_b, engine_control):
    print("Loading synthetic data...")
    try:
        with open('data/synthetic/seed.json', 'r') as f:
            data = json.load(f)
    except Exception as e:
        print(f"Could not load seed.json: {e}")
        return

    # Seed Hospital A
    hosp_a_data = data.get("hospital-A", {})
    async with engine_a.begin() as conn:
        for p in hosp_a_data.get("patients", []):
            await conn.execute(text("INSERT INTO patients (id, resource_data) VALUES (:id, :rd) ON CONFLICT (id) DO NOTHING"), 
                               {"id": p["id"], "rd": json.dumps(p["resource_data"])})
        for r in hosp_a_data.get("resources", []):
            await conn.execute(text("INSERT INTO fhir_resources (id, patient_id, resource_type, resource_data) VALUES (:id, :pid, :rt, :rd) ON CONFLICT (id) DO NOTHING"),
                               {"id": r["id"], "pid": r["patient_id"], "rt": r["resource_type"], "rd": json.dumps(r["resource_data"])})

    # Seed Hospital B
    hosp_b_data = data.get("hospital-B", {})
    async with engine_b.begin() as conn:
        for p in hosp_b_data.get("patients", []):
            await conn.execute(text("INSERT INTO patients (id, resource_data) VALUES (:id, :rd) ON CONFLICT (id) DO NOTHING"), 
                               {"id": p["id"], "rd": json.dumps(p["resource_data"])})
        for r in hosp_b_data.get("resources", []):
            await conn.execute(text("INSERT INTO fhir_resources (id, patient_id, resource_type, resource_data) VALUES (:id, :pid, :rt, :rd) ON CONFLICT (id) DO NOTHING"),
                               {"id": r["id"], "pid": r["patient_id"], "rt": r["resource_type"], "rd": json.dumps(r["resource_data"])})

    print("Data seeded successfully!")

async def main():
    e_a, e_b, e_c = await init_schema()
    await seed_data(e_a, e_b, e_c)

if __name__ == "__main__":
    asyncio.run(main())
