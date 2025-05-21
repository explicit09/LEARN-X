from fastapi.testclient import TestClient

from backend.app.main import app

client = TestClient(app)


def test_preferences_requires_auth():
    response = client.put("/api/v1/users/preferences", json={"learningStyle": "visual"})
    assert response.status_code == 401
