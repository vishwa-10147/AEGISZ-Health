def test_login_requires_auth(client):
    response = client.post(
        "/token",
        data={"username": "invalid_user", "password": "wrong_password"},
        headers={"Content-Type": "application/x-www-form-urlencoded"}
    )
    assert response.status_code == 401
    assert response.json()["detail"] == "Incorrect username or password"

def test_protected_health_endpoint(client):
    response = client.get("/health")
    # Health endpoint is public
    assert response.status_code == 200
    assert response.json()["status"] == "healthy"
