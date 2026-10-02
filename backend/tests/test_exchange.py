import pytest

from app.exchange.request import ExchangeCreate
from app.exchange.service import ExchangeService


@pytest.mark.asyncio
async def test_validate_source_patient_exists_rejects_missing_patient(monkeypatch):
    class DummyResult:
        def __init__(self, value):
            self.value = value

    class DummySession:
        async def __aenter__(self):
            return self

        async def __aexit__(self, exc_type, exc, tb):
            return False

    async def fake_patient_exists(db, patient_id):
        return False

    monkeypatch.setattr("app.exchange.service.HospitalService.patient_exists", fake_patient_exists)
    monkeypatch.setattr("app.core.database.hospital_sessions", {"hospital-A": lambda: DummySession()})

    with pytest.raises(ValueError, match="not found in source hospital database"):
        await ExchangeService.validate_source_patient_exists("hospital-A", "missing-patient")


def test_exchange_request_allows_missing_emergency_reason():
    request = ExchangeCreate(
        patient_id="patient-B-001",
        destination_hospital="hospital-B",
        purpose="Treatment",
        requested_resources=["Encounter", "Observation"],
        emergency_reason=None,
    )

    assert request.emergency_reason is None


def test_exchange_flow_requires_auth(client):
    # Test that the endpoints exist and require authentication
    response = client.post(
        "/exchange/request",
        json={
            "patient_id": "patient-A-001",
            "destination_hospital": "hospital-B",
            "purpose": "treatment",
            "requested_resources": ["Patient", "Observation"]
        }
    )
    # Should be 401 unauthorized because no valid Bearer token is provided
    assert response.status_code == 401

def test_exchange_approval_requires_auth(client):
    response = client.post("/exchange/req-12345/approve")
    assert response.status_code == 401
