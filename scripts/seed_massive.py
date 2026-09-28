import asyncio
import json
import random
from sqlalchemy.ext.asyncio import create_async_engine
from sqlalchemy import text
from app.config import settings
from app.auth.authentication import get_password_hash
from faker import Faker

fake = Faker()

async def main():
    print("Generating massive dataset for 6 hospitals...")
    engine_control = create_async_engine(settings.CONTROL_DB_URL.replace("postgresql://", "postgresql+asyncpg://"))
    
    from app.core.database import hospital_engines
    
    # 1. Init schema for all hospitals
    with open('data/schemas/hospital_a.sql', 'r') as f:
        hosp_sql = f.read()
        
    for name, engine in hospital_engines.items():
        async with engine.begin() as conn:
            for stmt in hosp_sql.split(";")[:-1]:
                await conn.execute(text(stmt))
                
    # 2. Insert Hospitals & Users into Control DB
    hospitals = [
        ("hospital-A", "Metro General", "East"),
        ("hospital-B", "City Medical", "West"),
        ("hospital-C", "Northside Clinic", "North"),
        ("hospital-D", "Southbay Health", "South"),
        ("hospital-E", "Downtown ER", "Central"),
        ("hospital-F", "University Hospital", "Campus")
    ]
    
    async with engine_control.begin() as conn:
        for h in hospitals:
            await conn.execute(text("INSERT INTO hospitals (id, name, status) VALUES (:id, :n, 'ACTIVE') ON CONFLICT DO NOTHING"), {"id": h[0], "n": h[1]})
            
        pwd = get_password_hash("password123")
        # Global Admin
        await conn.execute(text("INSERT INTO users (id, username, role, hospital_id, hashed_password) VALUES ('admin', 'admin', 'HOSPITAL_ADMIN', 'hospital-A', :pwd) ON CONFLICT DO NOTHING"), {"pwd": pwd})
        
        # Add a doctor for each hospital
        for i, h in enumerate(hospitals):
            await conn.execute(text("INSERT INTO users (id, username, role, hospital_id, hashed_password) VALUES (:id, :u, 'DOCTOR', :hid, :pwd) ON CONFLICT DO NOTHING"), {
                "id": f"u_{i}", "u": f"doctor_{h[0].split('-')[1].lower()}", "hid": h[0], "pwd": pwd
            })

    # 3. Generate massive FHIR data for each hospital
    for name, engine in hospital_engines.items():
        print(f"Seeding 50 patients into {name}...")
        async with engine.begin() as conn:
            for i in range(50):
                pat_id = f"pat-{name}-{i}"
                patient_data = {
                    "resourceType": "Patient",
                    "id": pat_id,
                    "name": [{"family": fake.last_name(), "given": [fake.first_name()]}],
                    "gender": random.choice(["male", "female", "other"]),
                    "birthDate": fake.date_of_birth(minimum_age=18, maximum_age=90).isoformat(),
                    "telecom": [{"system": "phone", "value": fake.phone_number()}],
                    "address": [{"city": fake.city(), "state": fake.state()}]
                }
                
                await conn.execute(
                    text("INSERT INTO patients (id, resource_data) VALUES (:id, :data) ON CONFLICT DO NOTHING"),
                    {"id": pat_id, "data": json.dumps(patient_data)}
                )
                
                # Add some encounters and conditions
                for j in range(random.randint(1, 4)):
                    enc_id = f"enc-{pat_id}-{j}"
                    enc_data = {
                        "resourceType": "Encounter",
                        "id": enc_id,
                        "subject": {"reference": f"Patient/{pat_id}"},
                        "status": "finished",
                        "class": {"code": "AMB"}
                    }
                    await conn.execute(
                        text("INSERT INTO fhir_resources (id, patient_id, resource_type, resource_data) VALUES (:id, :pid, 'Encounter', :data) ON CONFLICT DO NOTHING"),
                        {"id": enc_id, "pid": pat_id, "data": json.dumps(enc_data)}
                    )

if __name__ == "__main__":
    asyncio.run(main())
