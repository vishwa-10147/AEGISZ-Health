import uuid
import datetime
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text
from app.audit.chain import AuditChain

class AuditService:
    @staticmethod
    async def create_event(
        db: AsyncSession, actor_id: str, hospital_id: str, action: str,
        resource_type: str = None, resource_identifier_hash: str = None,
        purpose: str = None, decision: str = "ALLOW", severity: str = "INFO"
    ):
        event_id = f"evt-{uuid.uuid4().hex[:12]}"
        timestamp = datetime.datetime.utcnow().isoformat()
        
        previous_hash = await AuditChain.get_last_hash(db)
        
        event_data = {
            "id": event_id,
            "timestamp": timestamp,
            "actor_id": actor_id,
            "hospital_id": hospital_id,
            "action": action,
            "resource_type": resource_type,
            "resource_identifier_hash": resource_identifier_hash,
            "purpose": purpose,
            "decision": decision,
            "severity": severity
        }
        
        event_hash = AuditChain.compute_hash(event_data, previous_hash)
        
        query = text("""
            INSERT INTO audit_events (
                id, timestamp, actor_id, hospital_id, action, resource_type, 
                resource_identifier_hash, purpose, decision, severity, 
                previous_hash, event_hash
            ) VALUES (
                :id, :ts, :act, :hosp, :actn, :rt, :rih, :purp, :dec, :sev, :ph, :eh
            )
        """)
        await db.execute(query, {
            "id": event_id, "ts": timestamp, "act": actor_id, "hosp": hospital_id,
            "actn": action, "rt": resource_type, "rih": resource_identifier_hash,
            "purp": purpose, "dec": decision, "sev": severity, 
            "ph": previous_hash, "eh": event_hash
        })
        await db.commit()
        return event_id
        
    @staticmethod
    async def get_events(db: AsyncSession, limit: int = 100):
        query = text("SELECT * FROM audit_events ORDER BY timestamp DESC LIMIT :limit")
        result = await db.execute(query, {"limit": limit})
        columns = result.keys()
        return [dict(zip(columns, row)) for row in result.fetchall()]
