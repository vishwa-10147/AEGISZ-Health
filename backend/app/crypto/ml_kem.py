import os
import logging

try:
    import oqs
    OQS_AVAILABLE = True
except ImportError:
    OQS_AVAILABLE = False
    logging.warning("liboqs not found. Using SIMULATED ML-KEM for development to prevent crashes on systems missing C bindings.")

class MLKEMService:
    def __init__(self, alg_name: str = "Kyber512"):
        self.alg_name = alg_name

    def generate_keypair(self) -> dict:
        if OQS_AVAILABLE:
            with oqs.KeyEncapsulation(self.alg_name) as kem:
                public_key = kem.generate_keypair()
                secret_key = kem.export_secret_key()
                return {"public_key": public_key, "secret_key": secret_key}
        else:
            return {"public_key": os.urandom(32), "secret_key": os.urandom(32)}

    def encapsulate(self, public_key: bytes) -> dict:
        if OQS_AVAILABLE:
            with oqs.KeyEncapsulation(self.alg_name) as kem:
                ciphertext, shared_secret = kem.encap_secret(public_key)
                return {"ciphertext": ciphertext, "shared_secret": shared_secret}
        else:
            # Simulated 32-byte shared secret (AES-256 compatible)
            return {"ciphertext": os.urandom(32), "shared_secret": b"simulated_shared_secret_32_bytes"}

    def decapsulate(self, ciphertext: bytes, secret_key: bytes) -> bytes:
        if OQS_AVAILABLE:
            with oqs.KeyEncapsulation(self.alg_name) as kem:
                kem.secret_key = secret_key
                return kem.decap_secret(ciphertext)
        else:
            return b"simulated_shared_secret_32_bytes"
