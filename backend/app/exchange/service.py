from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text
import uuid
from app.exchange.request import ExchangeCreate
from app.hospital.service import HospitalService
from app.fhir.selector import ResourceSelector
from app.exchange.transfer import SecureTransfer

class ExchangeService:
    @staticmethod
    async def validate_source_patient_exists(source_hospital: str, patient_id: str) -> None:
        from app.core.database import hospital_sessions

        if source_hospital not in hospital_sessions:
            raise ValueError(f"Unknown source hospital: {source_hospital}")

        async with hospital_sessions[source_hospital]() as source_db:
            exists = await HospitalService.patient_exists(source_db, patient_id)
            if not exists:
                raise ValueError(f"Patient {patient_id} not found in source hospital database ({source_hospital})")

    @staticmethod
    async def create_request(db: AsyncSession, request: ExchangeCreate, source_hospital: str, username: str = "Unknown") -> dict:
        await ExchangeService.validate_source_patient_exists(source_hospital, request.patient_id)
        request_id = f"req-{uuid.uuid4().hex[:8]}"
        
        # Break Glass Protocol
        status = "PENDING"
        if request.is_emergency:
            status = "APPROVED"
            from app.audit.service import AuditService
            await AuditService.create_event(
                db=db, actor_id=username, hospital_id=source_hospital,
                action="BREAK_GLASS_OVERRIDE", purpose=request.emergency_reason, severity="CRITICAL"
            )

        query = text("""
            INSERT INTO exchange_requests (id, patient_id, source_hospital, destination_hospital, purpose, status)
            VALUES (:id, :pid, :sh, :dh, :purp, :status)
        """)
        await db.execute(query, {
            "id": request_id, "pid": request.patient_id, "sh": source_hospital,
            "dh": request.destination_hospital, "purp": request.purpose, "status": status
        })
        await db.commit()
        return {"id": request_id, "status": status, "is_emergency": request.is_emergency}

    @staticmethod
    async def get_request(db: AsyncSession, request_id: str) -> dict:
        query = text("SELECT id, patient_id, source_hospital, destination_hospital, purpose, status FROM exchange_requests WHERE id = :id")
        result = await db.execute(query, {"id": request_id})
        row = result.fetchone()
        if not row:
            return None
        return {"id": row[0], "patient_id": row[1], "source_hospital": row[2], "destination_hospital": row[3], "purpose": row[4], "status": row[5]}

    @staticmethod
    async def execute_exchange(control_db: AsyncSession, target_db: AsyncSession, request_id: str, allowed_types: list):
        # 1. Verify request is approved
        req = await ExchangeService.get_request(control_db, request_id)
        if not req or req["status"] != "APPROVED":
            raise ValueError("Exchange not approved or not found")
        
        # 2. Fetch resources from target hospital DB directly
        resources = await HospitalService.get_patient_resources(target_db, req["patient_id"], allowed_types)
        
        # 3. Filter strictly
        filtered = ResourceSelector.filter_authorized(resources, allowed_types)
        
        # 4. Wrap in Quantum-Safe Envelope (simulated keys for dev)
        transfer = SecureTransfer()
        envelope = transfer.protect_payload(filtered, recipient_kem_pub="", sender_dsa_sec="")
        
        return {"envelope": envelope, "meta": {"protected_by": "ML-KEM + ML-DSA (Simulated)"}}
