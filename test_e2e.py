import requests
import json
import time

BASE_URL = "http://localhost:8000"

def get_token(username, password):
    res = requests.post(f"{BASE_URL}/token", data={"username": username, "password": password})
    res.raise_for_status()
    return res.json()["access_token"]

def main():
    print("1. Checking Health and Readiness...")
    res = requests.get(f"{BASE_URL}/ready")
    print(res.json())

    # Get tokens
    token_doc = get_token("doctor_a", "password123")
    headers = {"Authorization": f"Bearer {token_doc}"}
    
    print("\n2. Testing Normal Request...")
    payload = {
        "patient_id": "pat-hospital-B-0",
        "destination_hospital": "hospital-B",
        "purpose": "Routine Checkup",
        "requested_resources": ["Patient", "Encounter"]
    }
    res = requests.post(f"{BASE_URL}/exchange/request", json=payload, headers=headers)
    print("Normal Request Response:", res.json())
    req_id = res.json()["id"]

    print("\n3. Testing Break Glass Request...")
    payload_bg = {
        "patient_id": "pat-hospital-B-0",
        "destination_hospital": "hospital-B",
        "purpose": "Emergency Surgery",
        "requested_resources": ["Patient", "Encounter"],
        "is_emergency": True,
        "emergency_reason": "Patient unconscious in ER"
    }
    res_bg = requests.post(f"{BASE_URL}/exchange/request", json=payload_bg, headers=headers)
    print("Break Glass Response:", res_bg.json())
    req_bg_id = res_bg.json()["id"]

    print("\n4. Testing AI Anomaly Detection (Spamming requests)...")
    for i in range(2):
        r = requests.post(f"{BASE_URL}/exchange/request", json=payload, headers=headers)
        print(f"Spam {i+1}:", r.status_code)
    
    r_anom = requests.post(f"{BASE_URL}/exchange/request", json=payload, headers=headers)
    print("Expected 429 Anomaly Block:", r_anom.status_code, r_anom.json())
    
    print("\n5. Testing Exchange Execution (Executing the Break Glass request)...")
    res_exec = requests.post(f"{BASE_URL}/exchange/{req_bg_id}/execute?allowed_types=Patient&allowed_types=Encounter", headers=headers)
    print("Execution Response Code:", res_exec.status_code)
    try:
        print("Execution Payload Keys:", res_exec.json().keys())
    except:
        print(res_exec.text)

if __name__ == "__main__":
    main()
