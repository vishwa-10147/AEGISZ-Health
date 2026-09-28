import hashlib
import json
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text

class AuditChain:
    @staticmethod
    async def get_last_hash(db: AsyncSession) -> str:
        query = text("SELECT event_hash FROM audit_events ORDER BY timestamp DESC LIMIT 1")
        result = await db.execute(query)
        row = result.fetchone()
        return row[0] if row else "GENESIS_HASH_00000000000000000000000000000000"

    @staticmethod
    def compute_hash(event_data: dict, previous_hash: str) -> str:
        # Ensure deterministic ordering
        data_string = json.dumps(event_data, sort_keys=True)
        combined = f"{previous_hash}||{data_string}"
        return hashlib.sha256(combined.encode('utf-8')).hexdigest()
