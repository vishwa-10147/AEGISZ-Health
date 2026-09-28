from app.audit.chain import AuditChain

def test_hash_chain_determinism():
    event_1 = {"id": "evt-1", "action": "LOGIN", "actor": "doctor_a"}
    prev_hash = "GENESIS_HASH_00000000000000000000000000000000"
    
    # Hash should be deterministic and identical for exact same inputs
    hash_1 = AuditChain.compute_hash(event_1, prev_hash)
    hash_2 = AuditChain.compute_hash(event_1, prev_hash)
    
    assert hash_1 == hash_2
    assert len(hash_1) == 64  # SHA-256 hex digest length

def test_hash_chain_tamper_detection():
    event_1 = {"id": "evt-1", "action": "LOGIN", "actor": "doctor_a"}
    prev_hash = "GENESIS_HASH_00000000000000000000000000000000"
    
    original_hash = AuditChain.compute_hash(event_1, prev_hash)
    
    # Modify event data
    event_1["actor"] = "hacker"
    tampered_hash = AuditChain.compute_hash(event_1, prev_hash)
    
    assert original_hash != tampered_hash
