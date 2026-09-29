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

@router.post("/{patient_id}/summarize")
async def summarize_patient(
    patient_id: str,
    hospital_id: str,
):
    try:
        if hospital_id not in hospital_sessions:
            raise ValueError()
        session = hospital_sessions[hospital_id]()
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid hospital ID")
        
    try:
        # Fetch patient FHIR data
        result = await session.execute(
            text("SELECT resource_data FROM patients WHERE id = :id"),
            {"id": patient_id}
        )
        row = result.fetchone()
        if not row:
            raise HTTPException(status_code=404, detail="Patient not found")
            
        fhir_data = row.resource_data
        
        # Simulate an LLM call parsing the FHIR data
        # In a real app, you would pass fhir_data to OpenAI/Gemini here.
        name_block = fhir_data.get("name", [{}])[0]
        name = f"{name_block.get('given', [''])[0]} {name_block.get('family', '')}"
        gender = fhir_data.get("gender", "unknown")
        dob = fhir_data.get("birthDate", "unknown")
        
        summary = (
            f"🤖 AEGISZ AI Agent Analysis:\n"
            f"Patient {name} is a {gender} born on {dob}.\n"
            f"Review of FHIR Encounters indicates stable vitals. "
            f"No critical health anomalies detected in recent telemetry. "
            f"Recommend standard follow-up based on historical ML analysis."
        )
        
        return {"summary": summary}
    finally:
        await session.close()
