import os
import logging

try:
    import oqs
    _ = getattr(oqs, "Signature", None)
    if _ is None:
        raise AttributeError("Wrong oqs module")
    OQS_AVAILABLE = True
except (ImportError, AttributeError):
    OQS_AVAILABLE = False
    logging.warning("liboqs not found or wrong module. Using SIMULATED ML-DSA for development.")

class MLDSAService:
    def __init__(self, alg_name: str = "Dilithium2"):
        self.alg_name = alg_name

    def generate_keypair(self) -> dict:
        if OQS_AVAILABLE:
            with oqs.Signature(self.alg_name) as sig:
                public_key = sig.generate_keypair()
                secret_key = sig.export_secret_key()
                return {"public_key": public_key, "secret_key": secret_key}
        else:
            return {"public_key": os.urandom(32), "secret_key": os.urandom(32)}

    def sign(self, message: bytes, secret_key: bytes) -> bytes:
        if OQS_AVAILABLE:
            with oqs.Signature(self.alg_name) as sig:
                sig.secret_key = secret_key
                return sig.sign(message)
        else:
            return b"simulated_signature_bytes_that_would_be_quite_long_in_production"

    def verify(self, message: bytes, signature: bytes, public_key: bytes) -> bool:
        if OQS_AVAILABLE:
            with oqs.Signature(self.alg_name) as sig:
                return sig.verify(message, signature, public_key)
        else:
            # Simulated verify always returns True for development wrapper if using simulated signature
            return signature == b"simulated_signature_bytes_that_would_be_quite_long_in_production"
