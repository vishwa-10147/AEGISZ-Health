from app.crypto.envelope import PQCEnvelopeService
from typing import Dict, Any

class SecureTransfer:
    def __init__(self):
        self.pqc_service = PQCEnvelopeService()
        
    def protect_payload(self, payload: list, recipient_kem_pub: str, sender_dsa_sec: str) -> dict:
        """
        Wraps the exchanged FHIR resources in a Quantum-Safe Envelope.
        """
        import base64
        # In a real system, these keys would be looked up from a PKI/KeyProvider. 
        # Here we decode them from the input strings.
        kem_pub_bytes = base64.b64decode(recipient_kem_pub) if recipient_kem_pub else b"simulated_kem_pub"
        dsa_sec_bytes = base64.b64decode(sender_dsa_sec) if sender_dsa_sec else b"simulated_dsa_sec"
        
        # Package the list of resources into a dictionary
        payload_dict = {"resources": payload}
        
        return self.pqc_service.create_envelope(payload_dict, kem_pub_bytes, dsa_sec_bytes)

    def verify_and_decrypt(self, envelope: dict, recipient_kem_sec: str, sender_dsa_pub: str) -> list:
        """
        Verifies and opens the Quantum-Safe Envelope on the receiving end.
        """
        import base64
        kem_sec_bytes = base64.b64decode(recipient_kem_sec) if recipient_kem_sec else b"simulated_kem_sec"
        dsa_pub_bytes = base64.b64decode(sender_dsa_pub) if sender_dsa_pub else b"simulated_dsa_pub"
        
        payload_dict = self.pqc_service.open_envelope(envelope, kem_sec_bytes, dsa_pub_bytes)
        return payload_dict.get("resources", [])
