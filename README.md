# AEGISZ-Health

## Quantum-Safe Federated Electronic Health Record Exchange & Confidential Clinical Auditing on IBM LinuxONE

AEGISZ-Health is a secure federated healthcare platform designed to allow hospitals to exchange patient records while protecting sensitive healthcare information with post-quantum cryptography and confidential computing.

The project combines:

- **Quantum-Safe Communication**
- **Confidential Computing**
- **Federated Hospital Exchange**
- **Clinical Audit Engine**
- **AI-Assisted Anomaly Detection**
- **IBM LinuxONE**
- **IBM Secure Execution**
- **FastAPI**
- **React**

---

# 1. Project Vision

Healthcare organizations need to exchange Electronic Health Records for diagnosis, referrals, and emergency care.

However, healthcare data is highly sensitive and may need to remain protected for many years.

The project addresses the security problem of:

```text
Hospital A
    ↓
Sensitive EHR
    ↓
Secure exchange
    ↓
Hospital B
```

without requiring hospitals to expose their complete databases.

The original project proposal specifically identifies future Harvest Now, Decrypt Later risks and proposes a quantum-safe federated exchange using ML-KEM and ML-DSA, with clinical auditing and AI-based anomaly detection inside IBM Secure Execution.

---

# 2. What AEGISZ-Health Does

At a high level:

```text
Hospital A
   ↓
Patient EHR
   ↓
Authorization
   ↓
Select required records
   ↓
Quantum-safe protection
   ↓
Secure transfer
   ↓
IBM Secure Execution
   ↓
Confidential clinical audit
   ↓
Audit report
   ↓
Hospital B
   ↓
Authorized doctor
```

The system is designed so that hospitals retain ownership of their own databases.

---

# 3. Core Architecture

```text
                         AEGISZ-HEALTH

 ┌────────────────────── Hospital A ──────────────────────┐
 │                                                        │
 │  Hospital EHR Database                                 │
 │          │                                             │
 │          ▼                                             │
 │  Hospital Data Layer                                   │
 │          │                                             │
 │          └──── authorized resource selection           │
 │                                                        │
 └──────────────────────┬─────────────────────────────────┘
                        │
                        ▼
              ┌─────────────────────┐
              │   FastAPI Gateway   │
              │                     │
              │ Authentication      │
              │ Authorization       │
              │ Exchange Control    │
              └──────────┬──────────┘
                         │
                         ▼
              ┌─────────────────────┐
              │    PQC Service      │
              │                     │
              │ ML-KEM              │
              │ Payload Encryption  │
              │ ML-DSA              │
              └──────────┬──────────┘
                         │
                         ▼
              ┌─────────────────────┐
              │ IBM Secure          │
              │ Execution Target    │
              │                     │
              │ Clinical Audit      │
              │ AI Anomaly Analysis │
              └──────────┬──────────┘
                         │
                         ▼
              ┌─────────────────────┐
              │  Audit Report       │
              │  Risk/Findings      │
              └──────────┬──────────┘
                         │
                         ▼
 ┌────────────────────── Hospital B ──────────────────────┐
 │                                                        │
 │  Hospital B Database                                   │
 │          │                                             │
 │          ▼                                             │
 │  Authorized Doctor Portal                             │
 │                                                        │
 └────────────────────────────────────────────────────────┘
```

---

# 4. Four Core Features

## 4.1 Quantum-Safe Communication

The system uses:

```text
ML-KEM
ML-DSA
```

ML-KEM provides post-quantum key establishment.

ML-DSA provides digital signatures.

The EHR payload uses a standard authenticated symmetric encryption mechanism after the key-establishment step.

Conceptually:

```text
ML-KEM
  ↓
Shared secret
  ↓
Encryption key
  ↓
EHR payload encryption
```

and:

```text
EHR payload
  ↓
Digest
  ↓
ML-DSA signature
```

The implementation must use established cryptographic libraries.

---

# 5. Confidential Computing

Sensitive clinical auditing is designed to run in an IBM Secure Execution environment.

The purpose is to protect data while it is being processed.

Local development will provide a simulation/abstraction.

The local system must never be described as equivalent to production IBM Secure Execution.

Deployment target:

```text
IBM LinuxONE
        ↓
IBM Secure Execution
        ↓
Confidential clinical audit
```

---

# 6. Federated Hospital Exchange

Hospital A owns:

```text
Hospital A EHR
```

Hospital B owns:

```text
Hospital B EHR
```

The system does not require complete database centralization.

Instead:

```text
Request
   ↓
Authorization
   ↓
Resource selection
   ↓
Secure transfer
```

Only authorized records are exchanged.

---

# 7. Clinical Audit Engine

The audit engine identifies:

```text
Missing information
Duplicate records
Document inconsistencies
Access anomalies
```

The engine can combine:

```text
Deterministic rules
+
Anomaly detection
+
AI-assisted explanation
```

The AI component is an auditing assistant.

It is not a medical diagnosis system.

---

# 8. Healthcare Data

Use synthetic/de-identified healthcare information.

FHIR-compatible resource types:

```text
Patient
Encounter
Observation
MedicationRequest
DiagnosticReport
DocumentReference
```

No real patient information should be used.

---

# 9. Security Model

The system evaluates:

```text
Who?
   ↓
Which hospital?
   ↓
Which role?
   ↓
Which patient/resource?
   ↓
For what purpose?
   ↓
Does policy permit access?
```

Roles:

```text
DOCTOR
HOSPITAL_ADMIN
AUDITOR
SECURITY_ADMIN
SYSTEM_AGENT
```

---

# 10. Break-Glass Access

Emergency access is controlled.

```text
Emergency request
       ↓
Reason
       ↓
Policy
       ↓
Minimum required information
       ↓
Access
       ↓
High-severity audit event
```

Emergency access must not bypass auditing.

---

# 11. Audit Integrity

Audit events are chained using hashes.

```text
Event 1 → Hash 1
Event 2 + Hash 1 → Hash 2
Event 3 + Hash 2 → Hash 3
```

A modification breaks the chain.

The system exposes audit verification functionality.

---

# 12. Main Demo Scenarios

## Normal

```text
Doctor requests
→ authorized
→ protected
→ transferred
→ verified
→ accessed
```

## Unauthorized

```text
Request
→ policy failure
→ denied
→ audit event
```

## Tampered

```text
Protected record
→ modification
→ signature failure
→ rejected
```

## Emergency

```text
Break-glass
→ limited access
→ high-severity audit
```

---

# 13. Technology Stack

## Frontend

```text
React
TypeScript
```

## Backend

```text
Python
FastAPI
Pydantic
```

## Data

```text
PostgreSQL
FHIR-compatible resources
Synthetic data
```

## Security

```text
ML-KEM
ML-DSA
Authenticated payload encryption
Hash-based audit integrity
```

## AI/ML

```text
Python
Scikit-learn or equivalent
Rule engine
Anomaly detection
```

## Deployment

```text
Docker
IBM LinuxONE
IBM Secure Execution
```

---

# 14. Repository Structure

```text
AEGISZ-Health/
├── README.md
├── PLAN.md
├── EXPLAIN.md
├── PROMPT.md
├── LICENSE
├── .env.example
├── .gitignore
├── docker-compose.yml
├── Makefile
│
├── backend/
├── hospital-agent/
├── frontend/
├── ml/
├── data/
├── deploy/
├── docs/
├── scripts/
├── security/
└── results/
```

---

# 15. Development

The build process is defined in:

```text
PLAN.md
```

The conceptual explanation is defined in:

```text
EXPLAIN.md
```

The AI implementation instructions are defined in:

```text
PROMPT.md
```

Read all three before making major architectural changes.

---

# 16. Development Rules

The project must:

- use synthetic/de-identified data;
- protect secrets;
- never log PHI;
- never implement cryptography manually;
- maintain hospital data ownership;
- maintain authorization boundaries;
- clearly distinguish local simulation from IBM deployment;
- test security failures;
- never allow AI to override authorization.

---

# 17. Current Target

The project should ultimately demonstrate:

```text
Hospital A
     ↓
Authorized EHR selection
     ↓
PQC protection
     ↓
Secure transfer
     ↓
Confidential clinical audit
     ↓
Audit report
     ↓
Hospital B
     ↓
Authorized doctor
```

with working demonstrations of:

```text
✓ Normal exchange
✓ Unauthorized access prevention
✓ Tamper detection
✓ Break-glass access
✓ Clinical audit
✓ Audit-chain verification
✓ AI-assisted explanation
✓ IBM LinuxONE / Secure Execution deployment architecture
```

---

# 18. Important Scope Boundary

AEGISZ-Health is:

```text
A secure healthcare data exchange
+
a confidential clinical/security auditing system
```

It is NOT:

```text
a medical diagnosis system
a treatment recommendation system
a generic healthcare chatbot
a centralized patient database
a generic cybersecurity dashboard
```

The AI agent must preserve this scope.
