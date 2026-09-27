"""Key Providers."""
from typing import Protocol

class KeyProvider(Protocol):
    """Protocol for key management."""
    def get_public_key(self, entity_id: str) -> bytes: ...
    def get_private_key(self, entity_id: str) -> bytes: ...

class DevelopmentKeyProvider:
    """Mock key provider for development."""
    def get_public_key(self, entity_id: str) -> bytes:
        return b"dev_pk"
    def get_private_key(self, entity_id: str) -> bytes:
        return b"dev_sk"

class IBMKeyProvider:
    """IBM Secure Key Protect provider stub."""
    pass
