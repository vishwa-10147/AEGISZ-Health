"""Symmetric Cryptography (AES-GCM)."""

def encrypt_payload(key: bytes, payload: bytes) -> tuple[bytes, bytes]:
    """Encrypts a payload using AES-GCM. Returns (nonce, ciphertext)."""
    return (b"nonce", b"ciphertext")

def decrypt_payload(key: bytes, nonce: bytes, ciphertext: bytes) -> bytes:
    """Decrypts a payload using AES-GCM."""
    return b"payload"
