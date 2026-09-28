from app.crypto.envelope import PQCEnvelopeService
import pytest

def test_pqc_envelope_creation_and_opening():
    service = PQCEnvelopeService()
    payload = {"patient": "test-data", "status": "active", "resourceType": "Patient"}
    
    # Using simulated byte keys for the test
    recipient_kem_pub = b"test_kem_pub"
    recipient_kem_sec = b"test_kem_sec"
    sender_dsa_pub = b"test_dsa_pub"
    sender_dsa_sec = b"test_dsa_sec"
    
    # 1. Create Envelope
    envelope = service.create_envelope(payload, recipient_kem_pub, sender_dsa_sec)
    
    assert "kem_ciphertext" in envelope
    assert "payload_ciphertext" in envelope
    assert "signature" in envelope
    assert "nonce" in envelope
    
    # 2. Open Envelope
    opened = service.open_envelope(envelope, recipient_kem_sec, sender_dsa_pub)
    assert opened == payload

def test_pqc_envelope_tamper_detection():
    service = PQCEnvelopeService()
    payload = {"secret": "data"}
    envelope = service.create_envelope(payload, b"kem_pub", b"dsa_sec")
    
    # Tamper with the ciphertext
    envelope["payload_ciphertext"] = "modified" + envelope["payload_ciphertext"][8:]
    
    with pytest.raises(ValueError, match="TAMPER DETECTED"):
        service.open_envelope(envelope, b"kem_sec", b"dsa_pub")
