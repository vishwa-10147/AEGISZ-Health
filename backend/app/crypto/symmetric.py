from cryptography.hazmat.primitives.ciphers.aead import AESGCM
import os

class SymmetricCrypto:
    @staticmethod
    def encrypt_payload(key: bytes, plaintext: bytes) -> dict:
        """Encrypts data using AES-GCM (AES-256 requires 32-byte key)"""
        # Ensure key is 32 bytes for AES-256
        aesgcm = AESGCM(key[:32]) 
        nonce = os.urandom(12)
        ciphertext = aesgcm.encrypt(nonce, plaintext, None)
        return {"ciphertext": ciphertext, "nonce": nonce}

    @staticmethod
    def decrypt_payload(key: bytes, nonce: bytes, ciphertext: bytes) -> bytes:
        """Decrypts data using AES-GCM and verifies authenticity"""
        aesgcm = AESGCM(key[:32])
        return aesgcm.decrypt(nonce, ciphertext, None)
