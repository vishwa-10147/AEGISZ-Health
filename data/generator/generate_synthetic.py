import json
import os

def generate_data():
    data = {
        "hospital-A": {
            "patients": [
                {
                    "id": "patient-A-001",
                    "resource_data": {
                        "id": "patient-A-001", "resourceType": "Patient",
                        "name": [{"family": "Smith", "given": ["John"]}],
                        "birthDate": "1980-01-01"
                    }
                },
                {
                    "id": "patient-A-002",
                    "resource_data": {
                        "id": "patient-A-002", "resourceType": "Patient",
                        "name": [{"family": "Doe", "given": ["Jane"]}],
                        "birthDate": "1992-05-15"
                    }
                }
            ],
            "resources": [
                {
                    "id": "obs-A-001",
                    "patient_id": "patient-A-001",
                    "resource_type": "Observation",
                    "resource_data": {
                        "id": "obs-A-001", "resourceType": "Observation", "status": "final",
                        "code": {"text": "Blood Pressure"}, "subject": {"reference": "Patient/patient-A-001"}
                    }
                },
                {
                    "id": "med-A-001",
                    "patient_id": "patient-A-001",
                    "resource_type": "MedicationRequest",
                    "resource_data": {
                        "id": "med-A-001", "resourceType": "MedicationRequest", "status": "active",
                        "intent": "order", "medicationCodeableConcept": {"text": "Lisinopril"},
                        "subject": {"reference": "Patient/patient-A-001"}
                    }
                }
            ]
        },
        "hospital-B": {
            "patients": [
                {
                    "id": "patient-B-001",
                    "resource_data": {
                        "id": "patient-B-001", "resourceType": "Patient",
                        "name": [{"family": "Brown", "given": ["Bob"]}],
                        "birthDate": "1975-11-20"
                    }
                }
            ],
            "resources": [
                {
                    "id": "enc-B-001",
                    "patient_id": "patient-B-001",
                    "resource_type": "Encounter",
                    "resource_data": {
                        "id": "enc-B-001", "resourceType": "Encounter", "status": "finished",
                        "subject": {"reference": "Patient/patient-B-001"}
                    }
                }
            ]
        }
    }
    
    os.makedirs('data/synthetic', exist_ok=True)
    with open('data/synthetic/seed.json', 'w') as f:
        json.dump(data, f, indent=2)
    print("Synthetic data generated at data/synthetic/seed.json")

if __name__ == "__main__":
    generate_data()
