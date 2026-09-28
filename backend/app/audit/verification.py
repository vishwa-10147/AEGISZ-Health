from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text
from app.audit.chain import AuditChain

class AuditVerification:
    @staticmethod
    async def verify_chain(db: AsyncSession) -> dict:
        query = text("SELECT * FROM audit_events ORDER BY timestamp ASC")
        result = await db.execute(query)
        columns = result.keys()
        events = [dict(zip(columns, row)) for row in result.fetchall()]
        
        if not events:
            return {"status": "VALID", "events_checked": 0, "message": "No events in chain"}
            
        previous_hash = "GENESIS_HASH_00000000000000000000000000000000"
        
        for i, event in enumerate(events):
            if event["previous_hash"] != previous_hash:
                return {
                    "status": "TAMPER_DETECTED",
                    "events_checked": i,
                    "broken_link_id": event["id"],
                    "message": f"Chain broken at event {event['id']}: previous_hash mismatch"
                }
            
            # Recompute hash 
            event_data = {
                "id": event["id"],
                "timestamp": event["timestamp"].isoformat() if hasattr(event["timestamp"], "isoformat") else event["timestamp"],
                "actor_id": event["actor_id"],
                "hospital_id": event["hospital_id"],
                "action": event["action"],
                "resource_type": event["resource_type"],
                "resource_identifier_hash": event["resource_identifier_hash"],
                "purpose": event["purpose"],
                "decision": event["decision"],
                "severity": event["severity"]
            }
            
            computed_hash = AuditChain.compute_hash(event_data, previous_hash)
            
            if computed_hash != event["event_hash"]:
                return {
                    "status": "TAMPER_DETECTED",
                    "events_checked": i,
                    "broken_link_id": event["id"],
                    "message": f"Data tampering detected at event {event['id']}: hash mismatch"
                }
                
            previous_hash = computed_hash
            
        return {"status": "VALID", "events_checked": len(events), "message": "Chain is fully intact"}
