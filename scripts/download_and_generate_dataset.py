#!/usr/bin/env python3
"""
AEGISZ-Health -- Synthetic Dataset Generator
=============================================

Generates ALL project data locally. No external downloads.

  1. FHIR-compatible patient bundles for Hospital A and Hospital B
  2. Synthetic access / audit logs (normal + anomalous patterns)
  3. ML training features for the Isolation Forest anomaly detector
  4. Seed JSON for database seeding

Usage:
    python scripts/download_and_generate_dataset.py
"""

import csv
import json
import os
import random
import uuid
from datetime import datetime, timedelta
from pathlib import Path
from typing import Any

# ---------------------------------------------------------------------------
# Paths
# ---------------------------------------------------------------------------
SCRIPT_DIR = Path(__file__).resolve().parent
PROJECT_ROOT = SCRIPT_DIR.parent
DATA_DIR = PROJECT_ROOT / "data"
FHIR_DIR = DATA_DIR / "fhir"
HOSPITAL_A_DIR = FHIR_DIR / "hospital_a"
HOSPITAL_B_DIR = FHIR_DIR / "hospital_b"
ML_DATA_DIR = PROJECT_ROOT / "ml" / "data"
SYNTHETIC_DIR = DATA_DIR / "synthetic"

# ---------------------------------------------------------------------------
# Config
# ---------------------------------------------------------------------------
PATIENTS_PER_HOSPITAL = 50
NORMAL_ACCESS_LOGS = 2000
ANOMALOUS_ACCESS_LOGS = 200

random.seed(42)

# ---------------------------------------------------------------------------
# Reference data
# ---------------------------------------------------------------------------
FIRST_NAMES = [
    "Aarav", "Aditi", "Arjun", "Diya", "Ishaan", "Kavya", "Meera", "Nikhil",
    "Priya", "Rahul", "Riya", "Rohan", "Saanvi", "Sai", "Tanvi", "Vikram",
    "Ananya", "Dev", "Kiara", "Laksh", "James", "Mary", "Robert", "Patricia",
    "John", "Jennifer", "Michael", "Linda", "David", "Elizabeth", "Sarah",
    "Carlos", "Maria", "Wei", "Li", "Yuki", "Haruto", "Fatima", "Omar", "Aisha",
]

LAST_NAMES = [
    "Patel", "Sharma", "Kumar", "Singh", "Gupta", "Reddy", "Iyer", "Nair",
    "Desai", "Mehta", "Smith", "Johnson", "Williams", "Brown", "Jones",
    "Garcia", "Martinez", "Chen", "Wang", "Kim", "Ali", "Hassan",
    "Mueller", "Dubois", "Rossi", "Johansson", "Petrov", "Silva", "Costa",
]

CONDITIONS = [
    ("Hypertension", "I10"), ("Type 2 Diabetes", "E11.9"),
    ("Asthma", "J45.909"), ("COPD", "J44.1"), ("Depression", "F32.9"),
    ("Anxiety", "F41.9"), ("Hyperlipidemia", "E78.5"),
    ("Coronary Artery Disease", "I25.10"), ("Atrial Fibrillation", "I48.91"),
    ("Osteoarthritis", "M19.90"), ("Chronic Kidney Disease", "N18.9"),
    ("Anemia", "D64.9"), ("Hypothyroidism", "E03.9"),
    ("GERD", "K21.0"), ("Migraine", "G43.909"),
]

MEDICATIONS = [
    "Metformin 500mg", "Lisinopril 10mg", "Atorvastatin 20mg",
    "Amlodipine 5mg", "Omeprazole 20mg", "Metoprolol 50mg",
    "Losartan 50mg", "Levothyroxine 50mcg", "Albuterol Inhaler",
    "Sertraline 50mg", "Gabapentin 300mg", "Ibuprofen 400mg",
    "Aspirin 81mg", "Insulin Glargine 10 units", "Prednisone 10mg",
]

OBS_TYPES = [
    ("Blood Pressure Systolic", "mm[Hg]", 90, 180, "8480-6"),
    ("Blood Pressure Diastolic", "mm[Hg]", 60, 120, "8462-4"),
    ("Heart Rate", "/min", 50, 120, "8867-4"),
    ("Body Temperature", "Cel", 36.0, 39.5, "8310-5"),
    ("Respiratory Rate", "/min", 12, 25, "9279-1"),
    ("Oxygen Saturation", "%", 88, 100, "2708-6"),
    ("BMI", "kg/m2", 18.0, 42.0, "39156-5"),
    ("Glucose", "mg/dL", 60, 300, "2339-0"),
    ("HbA1c", "%", 4.0, 12.0, "4548-4"),
    ("Creatinine", "mg/dL", 0.5, 5.0, "2160-0"),
]

ROLES = ["DOCTOR", "HOSPITAL_ADMIN", "AUDITOR", "SECURITY_ADMIN", "SYSTEM_AGENT"]

DEPARTMENTS = [
    "Emergency", "Cardiology", "Radiology", "General Medicine", "Pediatrics",
    "Oncology", "Neurology", "Orthopedics", "ICU", "Surgery",
]

REPORT_TYPES = [
    "Complete Blood Count", "Metabolic Panel", "Lipid Panel",
    "Urinalysis", "Chest X-Ray", "CT Scan", "MRI Brain",
    "Echocardiogram", "EKG", "Thyroid Panel",
]

DOC_TYPES = [
    "Discharge Summary", "Progress Note", "Operative Report",
    "Consultation Note", "Radiology Report", "Pathology Report",
    "Nursing Assessment", "Referral Letter",
]

# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def _uid():
    return str(uuid.uuid4())


def _random_date(start_year=2022, end_year=2025):
    start = datetime(start_year, 1, 1)
    end = datetime(end_year, 12, 31)
    delta = end - start
    dt = start + timedelta(seconds=random.randint(0, int(delta.total_seconds())))
    return dt.strftime("%Y-%m-%dT%H:%M:%SZ")


def _random_birthdate():
    year = random.randint(1940, 2010)
    month = random.randint(1, 12)
    day = random.randint(1, 28)
    return "{}-{:02d}-{:02d}".format(year, month, day)


# ---------------------------------------------------------------------------
# FHIR resource generators
# ---------------------------------------------------------------------------

def gen_patient(patient_id, hospital):
    return {
        "resourceType": "Patient",
        "id": patient_id,
        "meta": {"tag": [{"code": "hospital-{}".format(hospital)}]},
        "identifier": [{"system": "urn:hospital:{}".format(hospital), "value": patient_id}],
        "name": [{"family": random.choice(LAST_NAMES), "given": [random.choice(FIRST_NAMES)]}],
        "gender": random.choice(["male", "female"]),
        "birthDate": _random_birthdate(),
        "address": [{"city": "Synthetic City", "state": "SC", "country": "SY"}],
    }


def gen_encounters(pid, n):
    return [{
        "resourceType": "Encounter",
        "id": _uid(),
        "status": random.choice(["finished", "in-progress", "planned"]),
        "class": {"code": random.choice(["AMB", "EMER", "IMP", "OBSENC"])},
        "subject": {"reference": "Patient/{}".format(pid)},
        "period": {"start": _random_date()},
        "serviceType": {"text": random.choice(DEPARTMENTS)},
    } for _ in range(n)]


def gen_observations(pid, n):
    obs = []
    for _ in range(n):
        name, unit, lo, hi, loinc = random.choice(OBS_TYPES)
        obs.append({
            "resourceType": "Observation",
            "id": _uid(),
            "status": "final",
            "code": {"coding": [{"system": "http://loinc.org", "code": loinc, "display": name}]},
            "subject": {"reference": "Patient/{}".format(pid)},
            "effectiveDateTime": _random_date(),
            "valueQuantity": {"value": round(random.uniform(lo, hi), 1), "unit": unit},
        })
    return obs


def gen_conditions(pid, n):
    chosen = random.sample(CONDITIONS, min(n, len(CONDITIONS)))
    return [{
        "resourceType": "Condition",
        "id": _uid(),
        "clinicalStatus": {"coding": [{"code": "active"}]},
        "code": {"coding": [{"system": "http://hl7.org/fhir/sid/icd-10-cm", "code": icd, "display": name}]},
        "subject": {"reference": "Patient/{}".format(pid)},
        "onsetDateTime": _random_date(2018, 2024),
    } for name, icd in chosen]


def gen_medication_requests(pid, n):
    chosen = random.sample(MEDICATIONS, min(n, len(MEDICATIONS)))
    return [{
        "resourceType": "MedicationRequest",
        "id": _uid(),
        "status": random.choice(["active", "completed", "stopped"]),
        "intent": "order",
        "medicationCodeableConcept": {"text": med},
        "subject": {"reference": "Patient/{}".format(pid)},
        "authoredOn": _random_date(),
    } for med in chosen]


def gen_diagnostic_reports(pid, n):
    return [{
        "resourceType": "DiagnosticReport",
        "id": _uid(),
        "status": "final",
        "code": {"text": random.choice(REPORT_TYPES)},
        "subject": {"reference": "Patient/{}".format(pid)},
        "effectiveDateTime": _random_date(),
        "conclusion": "Synthetic report -- no real clinical findings.",
    } for _ in range(n)]


def gen_document_references(pid, n):
    return [{
        "resourceType": "DocumentReference",
        "id": _uid(),
        "status": "current",
        "type": {"text": random.choice(DOC_TYPES)},
        "subject": {"reference": "Patient/{}".format(pid)},
        "date": _random_date(),
        "description": "Synthetic document reference.",
    } for _ in range(n)]


def gen_patient_bundle(patient_id, hospital):
    """Generate a complete FHIR Bundle for one patient."""
    entries = [{"resource": gen_patient(patient_id, hospital)}]

    resources = (
        gen_encounters(patient_id, random.randint(2, 8))
        + gen_observations(patient_id, random.randint(5, 20))
        + gen_conditions(patient_id, random.randint(1, 5))
        + gen_medication_requests(patient_id, random.randint(1, 6))
        + gen_diagnostic_reports(patient_id, random.randint(1, 4))
        + gen_document_references(patient_id, random.randint(1, 3))
    )
    for r in resources:
        entries.append({"resource": r})

    return {"resourceType": "Bundle", "type": "collection", "entry": entries}


# ---------------------------------------------------------------------------
# Generate FHIR data
# ---------------------------------------------------------------------------

def generate_fhir_data():
    """Generate FHIR bundles for both hospitals."""
    print("[1/4] Generating FHIR patient bundles ...")
    all_patients = {"A": [], "B": []}

    for hospital, out_dir in [("A", HOSPITAL_A_DIR), ("B", HOSPITAL_B_DIR)]:
        out_dir.mkdir(parents=True, exist_ok=True)
        for i in range(1, PATIENTS_PER_HOSPITAL + 1):
            pid = "patient-{}-{:04d}".format(hospital, i)
            bundle = gen_patient_bundle(pid, hospital)
            (out_dir / "{}.json".format(pid)).write_text(
                json.dumps(bundle, indent=2), encoding="utf-8"
            )
            all_patients[hospital].append(pid)
        print("      Hospital {}: {} patients -> {}".format(hospital, PATIENTS_PER_HOSPITAL, out_dir))

    return all_patients


# ---------------------------------------------------------------------------
# Access / Audit log generation
# ---------------------------------------------------------------------------

def generate_access_logs(all_patients):
    """Generate synthetic access logs with normal + anomalous patterns."""
    print("[2/4] Generating access/audit logs ...")

    # Create users
    users = []
    for hospital in ("A", "B"):
        for i in range(1, 16):
            users.append({
                "user_id": "user-{}-{:03d}".format(hospital, i),
                "hospital": hospital,
                "role": random.choice(ROLES[:3]),
                "department": random.choice(DEPARTMENTS),
            })

    resource_types = ["Patient", "Encounter", "Observation", "MedicationRequest", "DiagnosticReport"]
    actions = ["READ", "SEARCH", "EXPORT"]
    work_hour_weights = [
        1, 1, 1, 1, 1, 2, 5, 10, 15, 15, 15, 14,   # 0-11
        14, 15, 15, 14, 12, 8, 5, 3, 2, 1, 1, 1,    # 12-23
    ]

    logs = []

    # Normal access
    for _ in range(NORMAL_ACCESS_LOGS):
        user = random.choice(users)
        patients = all_patients.get(user["hospital"], [])
        if not patients:
            continue
        hour = random.choices(range(24), weights=work_hour_weights)[0]
        logs.append({
            "event_id": _uid(),
            "timestamp": _random_date(2024, 2025),
            "user_id": user["user_id"],
            "user_role": user["role"],
            "user_hospital": user["hospital"],
            "user_department": user["department"],
            "patient_id": random.choice(patients),
            "patient_hospital": user["hospital"],
            "resource_type": random.choice(resource_types),
            "action": random.choice(actions),
            "hour_of_day": hour,
            "is_cross_hospital": False,
            "is_break_glass": False,
            "records_accessed": random.randint(1, 5),
            "session_duration_sec": random.randint(30, 1800),
            "label": "normal",
        })

    # Anomalous access
    anomaly_generators = [
        # Cross-hospital unauthorized
        lambda u: {
            "other_hosp": "B" if u["hospital"] == "A" else "A",
            "overrides": lambda oh: {
                "patient_id": random.choice(all_patients.get(oh, ["?"])),
                "patient_hospital": oh,
                "is_cross_hospital": True,
                "records_accessed": random.randint(1, 10),
                "session_duration_sec": random.randint(5, 300),
            },
        },
    ]

    for _ in range(ANOMALOUS_ACCESS_LOGS):
        user = random.choice(users)
        anomaly_type = random.choice([
            "cross_hospital", "off_hours_bulk", "role_mismatch",
            "excessive_records", "rapid_fire",
        ])
        patients = all_patients.get(user["hospital"], [])
        if not patients:
            continue

        base = {
            "event_id": _uid(),
            "timestamp": _random_date(2024, 2025),
            "user_id": user["user_id"],
            "user_role": user["role"],
            "user_hospital": user["hospital"],
            "user_department": user["department"],
            "patient_id": random.choice(patients),
            "patient_hospital": user["hospital"],
            "resource_type": random.choice(resource_types),
            "action": "READ",
            "hour_of_day": random.randint(0, 23),
            "is_cross_hospital": False,
            "is_break_glass": False,
            "records_accessed": 1,
            "session_duration_sec": 60,
            "label": "anomalous",
        }

        if anomaly_type == "cross_hospital":
            other = "B" if user["hospital"] == "A" else "A"
            other_patients = all_patients.get(other, [])
            if other_patients:
                base["patient_id"] = random.choice(other_patients)
                base["patient_hospital"] = other
                base["is_cross_hospital"] = True
                base["records_accessed"] = random.randint(1, 10)

        elif anomaly_type == "off_hours_bulk":
            base["hour_of_day"] = random.randint(1, 4)
            base["action"] = "EXPORT"
            base["records_accessed"] = random.randint(50, 500)
            base["session_duration_sec"] = random.randint(10, 120)

        elif anomaly_type == "role_mismatch":
            base["user_role"] = "SECURITY_ADMIN"
            base["user_department"] = "IT"
            base["action"] = "EXPORT"
            base["resource_type"] = "MedicationRequest"
            base["records_accessed"] = random.randint(10, 100)

        elif anomaly_type == "excessive_records":
            base["action"] = "SEARCH"
            base["records_accessed"] = random.randint(100, 1000)
            base["session_duration_sec"] = random.randint(5, 30)

        elif anomaly_type == "rapid_fire":
            base["records_accessed"] = random.randint(20, 80)
            base["session_duration_sec"] = random.randint(1, 10)

        logs.append(base)

    random.shuffle(logs)
    print("      {} normal + {} anomalous = {} total events".format(
        NORMAL_ACCESS_LOGS, ANOMALOUS_ACCESS_LOGS, len(logs)
    ))
    return logs


# ---------------------------------------------------------------------------
# Save ML data
# ---------------------------------------------------------------------------

def save_ml_data(logs):
    """Save access logs as JSON + CSV feature matrix for ML training."""
    print("[3/4] Saving ML training data ...")
    ML_DATA_DIR.mkdir(parents=True, exist_ok=True)

    # Full JSON
    logs_path = ML_DATA_DIR / "access_logs.json"
    logs_path.write_text(json.dumps(logs, indent=2), encoding="utf-8")
    print("      access_logs.json     -> {} events".format(len(logs)))

    # CSV features for Isolation Forest
    csv_path = ML_DATA_DIR / "access_features.csv"
    cols = ["hour_of_day", "is_cross_hospital", "is_break_glass",
            "records_accessed", "session_duration_sec", "label"]
    with open(csv_path, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=cols)
        writer.writeheader()
        for log in logs:
            writer.writerow({
                "hour_of_day": log["hour_of_day"],
                "is_cross_hospital": int(log["is_cross_hospital"]),
                "is_break_glass": int(log["is_break_glass"]),
                "records_accessed": log["records_accessed"],
                "session_duration_sec": log["session_duration_sec"],
                "label": log["label"],
            })
    print("      access_features.csv  -> ready for Isolation Forest")


# ---------------------------------------------------------------------------
# Seed JSON
# ---------------------------------------------------------------------------

def save_seed_json(all_patients):
    """Write seed.json with all patient IDs and users."""
    print("[4/4] Writing seed.json ...")
    SYNTHETIC_DIR.mkdir(parents=True, exist_ok=True)

    seed = {
        "generated_at": datetime.utcnow().strftime("%Y-%m-%dT%H:%M:%SZ"),
        "patients": [],
        "users": [],
    }

    for hospital, pids in all_patients.items():
        for pid in pids:
            seed["patients"].append({"id": pid, "hospital": hospital})

    for hospital in ("A", "B"):
        for i in range(1, 16):
            seed["users"].append({
                "user_id": "user-{}-{:03d}".format(hospital, i),
                "hospital": hospital,
                "role": random.choice(ROLES),
                "department": random.choice(DEPARTMENTS),
            })

    seed_path = SYNTHETIC_DIR / "seed.json"
    seed_path.write_text(json.dumps(seed, indent=2), encoding="utf-8")
    print("      seed.json -> {} patients, {} users".format(
        len(seed["patients"]), len(seed["users"])
    ))


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main():
    print()
    print("=" * 55)
    print("  AEGISZ-Health -- Synthetic Dataset Generator")
    print("  No external downloads. All data generated locally.")
    print("=" * 55)
    print()

    all_patients = generate_fhir_data()
    logs = generate_access_logs(all_patients)
    save_ml_data(logs)
    save_seed_json(all_patients)

    print()
    print("=" * 55)
    print("  DONE")
    print("=" * 55)
    print("  Hospital A : {} patients  -> data/fhir/hospital_a/".format(len(all_patients["A"])))
    print("  Hospital B : {} patients  -> data/fhir/hospital_b/".format(len(all_patients["B"])))
    print("  Access logs: {} events   -> ml/data/access_logs.json".format(len(logs)))
    print("  ML features: CSV          -> ml/data/access_features.csv")
    print("  Seed file  : JSON         -> data/synthetic/seed.json")
    print("=" * 55)
    print()


if __name__ == "__main__":
    main()
