from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text
from app.core.database import hospital_sessions
router = APIRouter(prefix="/patients", tags=["Patients"])

@router.get("/")
async def list_patients(
    hospital_id: str,
    limit: int = 20
):
    try:
        if hospital_id not in hospital_sessions:
            raise ValueError()
        session: AsyncSession = hospital_sessions[hospital_id]()
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid hospital ID")
        
    try:
        # Fetch patients
        result = await session.execute(
            text("SELECT id, resource_data FROM patients LIMIT :limit"),
            {"limit": limit}
        )
        patients = []
        for row in result.fetchall():
            pat = {"id": row.id}
            if row.resource_data:
                # Add a few high-level FHIR fields for display
                name = row.resource_data.get("name", [{}])[0]
                pat["name"] = f"{name.get('given', [''])[0]} {name.get('family', '')}"
                pat["gender"] = row.resource_data.get("gender", "unknown")
                pat["birthDate"] = row.resource_data.get("birthDate", "unknown")
            patients.append(pat)
            
        return {"hospital": hospital_id, "patients": patients}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        await session.close()
