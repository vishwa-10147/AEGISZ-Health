"""Crypto Models."""
from pydantic import BaseModel

class CryptoEnvelope(BaseModel):
    data: str

class KeyPair(BaseModel):
    public: str
    private: str

class SignatureResult(BaseModel):
    valid: bool
