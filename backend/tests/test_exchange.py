from app.exchange.request import ExchangeCreate


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
