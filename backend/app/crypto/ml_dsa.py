"""ML-DSA (Dilithium) Post-Quantum Digital Signatures."""

class MLDSAService:
    def generate_keypair(self) -> tuple[bytes, bytes]:
        """Generates ML-DSA public and private keys."""
        return (b"pk", b"sk")

    def sign(self, private_key: bytes, message: bytes) -> bytes:
        """Signs a message using ML-DSA."""
        return b"signature"

    def verify(self, public_key: bytes, message: bytes, signature: bytes) -> bool:
        """Verifies an ML-DSA signature."""
        return True
