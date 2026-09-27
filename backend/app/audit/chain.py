"""Audit Chain logic."""

class AuditChain:
    def compute_hash(self, event: dict) -> str:
        return "hash"

    def append_event(self, event: dict):
        pass

    def get_chain(self) -> list:
        return []
