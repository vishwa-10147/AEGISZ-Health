# AEGISZ-Health — Detailed Implementation Plan

## 1. Purpose

This plan tells the AI build agent **what to build, in what order, and how to verify each stage**.

The project must be built incrementally.

Do not attempt to build the entire application in one step.

---

# 2. Build Strategy

Use this sequence:

```text
Foundation
   ↓
Hospital Data Ownership
   ↓
Identity + Authorization
   ↓
FHIR Exchange
   ↓
PQC
   ↓
Audit Integrity
   ↓
Clinical Audit + AI
   ↓
Frontend
   ↓
Secure Execution Abstraction
   ↓
IBM LinuxONE Deployment
   ↓
Security Testing
   ↓
Demo Hardening
```

Every phase must finish with a testable result.

---

# 3. Phase 0 — Repository Inspection

## Goal

Understand the existing repository before creating files.

### Agent tasks

1. List the repository.
2. Read existing README files.
3. Identify existing backend/frontend.
4. Identify installed dependencies.
5. Identify existing database configuration.
6. Identify existing tests.
7. Identify existing Docker configuration.
8. Identify environment files.
9. Do not overwrite existing working components blindly.

### Output

Create a short internal implementation assessment:

```text
Existing:
Missing:
Reusable:
Needs modification:
Blocked:
```

---

# 4. Phase 1 — Project Foundation

## Goal

Create a clean reproducible base.

### Build

```text
backend/
frontend/
data/
hospital-agent/
deploy/
docs/
tests/
scripts/
```

### Backend

Set up:

- Python environment
- FastAPI
- Pydantic
- database layer
- configuration
- logging

### Frontend

Set up:

- React
- TypeScript
- routing
- API client
- basic layout

### Infrastructure

Create:

```text
.env.example
.gitignore
docker-compose.yml
Makefile
```

### Acceptance

```text
Backend starts.
Frontend starts.
Database starts.
Health endpoint works.
```

---

# 5. Phase 2 — Synthetic Healthcare Dataset

## Goal

Create safe data for development.

### Resources

Generate synthetic:

```text
Patient
Encounter
Observation
MedicationRequest
DiagnosticReport
DocumentReference
```

### Scenarios

Create:

```text
normal_patient
incomplete_patient
duplicate_patient_record
inconsistent_document
```

### Rules

- no real patient information;
- deterministic seed;
- reproducible generation;
- identifiable synthetic IDs.

### Acceptance

The agent can:

```text
seed database
query patient
retrieve resources
reset database
```

---

# 6. Phase 3 — Hospital Data Ownership

## Goal

Represent federation.

Create:

```text
Hospital A DB
Hospital B DB
Control/Audit DB
```

### Hospital A

Contains its own synthetic patients.

### Hospital B

Contains its own synthetic patients.

### Control plane

Contains:

```text
users
hospitals
policies
exchange_requests
public_keys
audit_events
```

### Acceptance

Prove that:

```text
Hospital B cannot directly query Hospital A DB.
```

Only the authorized exchange mechanism can request data.

---

# 7. Phase 4 — Authentication

## Goal

Identify actors.

Implement:

```text
DOCTOR
HOSPITAL_ADMIN
AUDITOR
SECURITY_ADMIN
SYSTEM_AGENT
```

Start with a development authentication mechanism if a full identity provider is not yet required.

Keep the interface compatible with OAuth2/OIDC/JWT.

### Acceptance

Tests:

```text
valid token → accepted
invalid token → rejected
expired token → rejected
```

---

# 8. Phase 5 — Authorization

## Goal

Control access before data release.

Authorization inputs:

```text
actor
role
hospital
patient
resource
purpose
policy
```

### Example

```text
Doctor Hospital B
requests
Patient A-001
from Hospital A
for emergency-care
```

Policy engine evaluates.

### Acceptance

Test:

```text
authorized → allowed
wrong hospital → denied
wrong role → denied
unauthorized patient → denied
```

---

# 9. Phase 6 — FHIR-Compatible Exchange

## Goal

Implement selective EHR exchange.

### Request

```json
{
  "patient_id": "patient-A-001",
  "source_hospital": "hospital-A",
  "destination_hospital": "hospital-B",
  "purpose": "emergency-care",
  "resources": [
    "Observation",
    "MedicationRequest"
  ]
}
```

### Process

```text
Request
 ↓
Authenticate
 ↓
Authorize
 ↓
Select resources
 ↓
Return only allowed resources
```

### Acceptance

If request asks for:

```text
Observation
MedicationRequest
```

the result must not automatically contain:

```text
DocumentReference
other patients
entire database
```

---

# 10. Phase 7 — PQC Crypto Service

## Goal

Add the quantum-safe security layer.

Create a crypto abstraction:

```text
CryptoService
├── key management
├── KEM
├── payload encryption
├── signing
└── verification
```

### ML-KEM

Use ML-KEM for key establishment.

### Payload

Use an authenticated symmetric encryption mechanism.

### ML-DSA

Use ML-DSA to authenticate/sign the exchange.

### Envelope

Include:

```text
protocol version
algorithm identifiers
sender
recipient
key identifier
KEM ciphertext
nonce
ciphertext
associated data
signature
payload digest
```

### Acceptance

Tests:

```text
encrypt → decrypt = original
sign → verify = valid
modify payload → verify = invalid
wrong key → failure
```

---

# 11. Phase 8 — Secure Key Handling

## Goal

Prevent secrets from entering source code.

Implement an abstraction:

```text
KeyProvider
├── DevelopmentKeyProvider
└── Production/IBMKeyProvider
```

### Development

Environment/configuration-backed secrets may be used only for local testing.

### Production

Document integration with secure key management.

### Acceptance

Search source code and confirm:

```text
no hard-coded private keys
no hard-coded tokens
no secrets in logs
```

---

# 12. Phase 9 — Tamper-Evident Audit

## Goal

Make security activity verifiable.

Create events:

```text
exchange_requested
exchange_authorized
exchange_denied
record_selected
record_encrypted
record_transferred
signature_verified
signature_failed
break_glass
audit_generated
```

Chain events:

```text
previous_hash
current_hash
```

### Verification

Implement:

```text
GET /audit/verify
```

### Acceptance

1. Generate valid chain.
2. Modify one event.
3. Run verification.
4. Verification must report tampering.

---

# 13. Phase 10 — Clinical Audit Engine

## Goal

Analyze records and activity.

### Rule engine

Implement deterministic checks first:

```text
missing field
duplicate record
invalid reference
timestamp inconsistency
document inconsistency
```

### Access anomaly

Implement:

```text
unusual frequency
repeated denial
unusual access pattern
break-glass frequency
```

### ML

If appropriate, add:

```text
Isolation Forest
or
LOF
or
statistical baseline
```

Do not add ML simply for appearance.

### Acceptance

Synthetic abnormal cases must produce findings.

---

# 14. Phase 11 — AI Explanation

## Goal

Make audit findings understandable.

Input:

```text
structured audit facts
```

Output:

```text
human-readable explanation
```

Example:

```text
Finding:
Unusual access frequency

Explanation:
The account accessed 24 patient records within a short
period compared with its normal activity baseline.
```

The explanation must not change the underlying security decision.

---

# 15. Phase 12 — Break-Glass

## Goal

Support emergency healthcare access.

### Flow

```text
Doctor
 ↓
Emergency reason
 ↓
Break-glass policy
 ↓
Minimum required record
 ↓
Access
 ↓
High-severity audit
```

### Acceptance

Missing reason:

```text
DENIED
```

Valid emergency:

```text
ALLOWED + AUDIT
```

---

# 16. Phase 13 — React Doctor Portal

## Build screens

### Dashboard

```text
Pending Requests
Recent Exchanges
Security Status
Audit Alerts
```

### Patient

```text
Patient
Encounter
Observation
Medication
```

### Exchange

```text
Source
Destination
Purpose
Requested resources
Authorization
PQC status
Verification
```

### Security

```text
ML-KEM
ML-DSA
Encryption
Signature
Secure Execution
```

### Audit

```text
Events
Findings
Severity
Chain Verification
AI Explanation
```

---

# 17. Phase 14 — Secure Execution Abstraction

## Goal

Make the application ready for IBM Secure Execution.

Create:

```text
ConfidentialExecutionProvider
├── LocalDevelopmentProvider
└── IBMProvider
```

### Local

```text
SIMULATED
```

### IBM

```text
IBM LinuxONE
Secure Execution
```

The application should not contain IBM-specific logic everywhere.

Keep the integration behind an interface.

---

# 18. Phase 15 — IBM LinuxONE Deployment

## Goal

Create the production-target deployment structure.

```text
deploy/linuxone/
├── README.md
├── architecture.md
├── container/
├── secure-execution/
├── secrets/
└── attestation/
```

Document:

- LinuxONE architecture;
- workload deployment;
- confidential workload boundary;
- secret handling;
- attestation;
- networking;
- monitoring.

Do not claim actual IBM deployment unless it has been performed.

---

# 19. Phase 16 — Threat Modeling

Create:

```text
docs/threat-model.md
```

Threats:

```text
malicious doctor
stolen token
compromised hospital agent
network attacker
replay attack
payload tampering
audit tampering
AI misuse
administrator misuse
```

For each:

```text
Threat
Attack
Impact
Control
Test
```

---

# 20. Phase 17 — Security Testing

Run:

### Authentication

```text
invalid token
expired token
missing token
```

### Authorization

```text
wrong role
wrong hospital
wrong patient
wrong purpose
```

### Crypto

```text
wrong signature
modified payload
wrong key
replay
```

### Audit

```text
modified event
deleted event
broken chain
```

### Break-glass

```text
missing reason
unauthorized user
excessive access
```

---

# 21. Phase 18 — Performance Testing

Measure:

```text
FHIR selection time
ML-KEM operation time
payload encryption time
ML-DSA signing time
verification time
end-to-end exchange time
audit analysis time
```

Do not invent values.

Save results to:

```text
results/
```

---

# 22. Phase 19 — Demo Preparation

Create a repeatable demo dataset.

## Demo 1

Normal exchange.

## Demo 2

Unauthorized access.

## Demo 3

Tampered record.

## Demo 4

Break-glass.

## Demo 5

Audit anomaly.

The demo must be runnable without manually editing database rows during presentation.

---

# 23. Phase 20 — Final Documentation

Required:

```text
README.md
PLAN.md
EXPLAIN.md
PROMPT.md

docs/
├── architecture.md
├── crypto-design.md
├── threat-model.md
├── audit-integrity.md
├── deployment-linuxone.md
├── api.md
├── model-card.md
└── demo-script.md
```

---

# 24. Final Acceptance Checklist

## Functional

- [ ] Hospital A works.
- [ ] Hospital B works.
- [ ] EHR exchange works.
- [ ] selective resource exchange works.
- [ ] authorization works.
- [ ] break-glass works.
- [ ] audit works.

## Security

- [ ] ML-KEM works.
- [ ] payload encryption works.
- [ ] ML-DSA works.
- [ ] tamper detection works.
- [ ] authentication works.
- [ ] authorization works.
- [ ] audit integrity works.

## AI

- [ ] audit rules work.
- [ ] anomaly detection works.
- [ ] explanation works.
- [ ] AI does not make authorization decisions.

## IBM

- [ ] LinuxONE target documented.
- [ ] Secure Execution abstraction exists.
- [ ] local simulation is clearly labeled.
- [ ] no false deployment claim.

## Demo

- [ ] normal exchange
- [ ] unauthorized access
- [ ] tampering
- [ ] emergency
- [ ] audit anomaly

---

# 25. Priority Rules

If time is limited:

```text
P0 — Must work
    Hospital exchange
    Authorization
    PQC
    Audit integrity

P1 — Must demonstrate
    Clinical audit
    Tampering
    Break-glass
    React portal

P2 — Strong enhancement
    AI explanation
    Advanced anomaly detection
    LinuxONE deployment profile

P3 — Production expansion
    full OIDC
    HSM integration
    advanced observability
    Kubernetes
    automated compliance reporting
```

Never sacrifice P0 security correctness for P2/P3 features.
