from typing import List, Dict, Any
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text

class HospitalService:
    @staticmethod
    async def get_patient_resources(db: AsyncSession, patient_id: str, allowed_types: List[str]) -> List[Dict[str, Any]]:
        """
        Federated query restricted to specific DB session. 
        Only returns resources of types listed in allowed_types.
        """
        query = text("""
            SELECT resource_data FROM fhir_resources 
            WHERE patient_id = :patient_id AND resource_type = ANY(:allowed_types)
        """)
        result = await db.execute(query, {"patient_id": patient_id, "allowed_types": allowed_types})
        return [row[0] for row in result.fetchall()]

    @staticmethod
    async def patient_exists(db: AsyncSession, patient_id: str) -> bool:
        """
        Check whether the patient record exists in the owning hospital's local database.
        """
        query = text("""
            SELECT EXISTS (
                SELECT 1 FROM patients WHERE id = :patient_id
            ) OR EXISTS (
                SELECT 1 FROM fhir_resources WHERE patient_id = :patient_id
            )
        """)
        result = await db.execute(query, {"patient_id": patient_id})
        row = result.fetchone()
        return bool(row[0]) if row else False
        
    @staticmethod
    async def get_patient(db: AsyncSession, patient_id: str) -> Dict[str, Any]:
        """
        Fetch patient demographics from the specific hospital DB.
        """
        query = text("SELECT resource_data FROM patients WHERE id = :patient_id")
        result = await db.execute(query, {"patient_id": patient_id})
        row = result.fetchone()
        return row[0] if row else None
