"""
Pytest fixtures for AEGISZ-Health backend tests.
"""
import pytest

@pytest.fixture
def test_app():
    """FastAPI TestClient fixture."""
    from fastapi.testclient import TestClient
    from fastapi import FastAPI
    app = FastAPI()
    return TestClient(app)

@pytest.fixture
def test_db():
    """Test database session fixture."""
    pass

@pytest.fixture
def sample_user():
    """User fixture with DOCTOR role."""
    return {"id": "user-123", "role": "DOCTOR", "name": "Dr. Smith"}

@pytest.fixture
def sample_hospital_a():
    """Hospital A fixture."""
    return {"id": "hosp-a", "name": "General Hospital"}

@pytest.fixture
def sample_hospital_b():
    """Hospital B fixture."""
    return {"id": "hosp-b", "name": "Specialty Clinic"}

@pytest.fixture
def sample_patient():
    """Synthetic patient fixture."""
    return {"id": "pat-456", "name": "John Doe", "dob": "1980-01-01"}

@pytest.fixture
def valid_token():
    """JWT token fixture."""
    return "valid.jwt.token"

@pytest.fixture
def expired_token():
    """Expired JWT fixture."""
    return "expired.jwt.token"

@pytest.fixture
def auth_headers(valid_token):
    """Dict with Authorization: Bearer <token>."""
    return {"Authorization": f"Bearer {valid_token}"}
