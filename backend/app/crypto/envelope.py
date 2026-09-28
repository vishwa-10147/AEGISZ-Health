import json
import base64
from app.crypto.ml_kem import MLKEMService
from app.crypto.ml_dsa import MLDSAService
from app.crypto.symmetric import SymmetricCrypto

class PQCEnvelopeService:
    def __init__(self):
        self.kem = MLKEMService()
        self.dsa = MLDSAService()
        
    def create_envelope(self, payload: dict, recipient_pub_kem: bytes, sender_sec_dsa: bytes) -> dict:
        """
        Creates a Quantum-Safe Envelope:
        1. Encapsulate symmetric key using recipient's ML-KEM public key.
        2. Encrypt payload using symmetric key (AES-GCM).
        3. Sign the ciphertext using sender's ML-DSA private key.
        """
        payload_bytes = json.dumps(payload).encode('utf-8')
        
        # 1. KEM Encapsulation
        kem_result = self.kem.encapsulate(recipient_pub_kem)
        kem_ciphertext = kem_result["ciphertext"]
        shared_secret = kem_result["shared_secret"]
        
        # 2. Symmetric Encryption (AES-GCM)
        sym_result = SymmetricCrypto.encrypt_payload(shared_secret, payload_bytes)
        payload_ciphertext = sym_result["ciphertext"]
        nonce = sym_result["nonce"]
        
        # 3. DSA Signature (Sign the ciphertexts to prevent tampering)
        signature_target = kem_ciphertext + nonce + payload_ciphertext
        signature = self.dsa.sign(signature_target, sender_sec_dsa)
        
        return {
            "version": "1.0",
            "kem_alg": self.kem.alg_name,
            "dsa_alg": self.dsa.alg_name,
            "kem_ciphertext": base64.b64encode(kem_ciphertext).decode(),
            "nonce": base64.b64encode(nonce).decode(),
            "payload_ciphertext": base64.b64encode(payload_ciphertext).decode(),
            "signature": base64.b64encode(signature).decode()
        }

    def open_envelope(self, envelope: dict, recipient_sec_kem: bytes, sender_pub_dsa: bytes) -> dict:
        """
        Opens a Quantum-Safe Envelope:
        1. Verify signature using sender's ML-DSA public key.
        2. Decapsulate symmetric key using recipient's ML-KEM private key.
        3. Decrypt payload using symmetric key (AES-GCM).
        """
        kem_ciphertext = base64.b64decode(envelope["kem_ciphertext"])
        nonce = base64.b64decode(envelope["nonce"])
        payload_ciphertext = base64.b64decode(envelope["payload_ciphertext"])
        signature = base64.b64decode(envelope["signature"])
        
        # 1. Verify Signature
        signature_target = kem_ciphertext + nonce + payload_ciphertext
        if not self.dsa.verify(signature_target, signature, sender_pub_dsa):
            raise ValueError("TAMPER DETECTED: Invalid ML-DSA signature or modified ciphertext!")
        
        # 2. KEM Decapsulation
        shared_secret = self.kem.decapsulate(kem_ciphertext, recipient_sec_kem)
        
        # 3. Symmetric Decryption
        try:
            payload_bytes = SymmetricCrypto.decrypt_payload(shared_secret, nonce, payload_ciphertext)
        except Exception:
            raise ValueError("TAMPER DETECTED: AES-GCM Tag Verification Failed (or wrong key)")
            
        return json.loads(payload_bytes.decode('utf-8'))
