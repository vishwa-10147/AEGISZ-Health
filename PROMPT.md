# AEGISZ-Health — Master AI Agent Build Prompt

> **Document purpose:** This is the primary instruction file for an AI coding/build agent.  
> The agent must read `README.md`, `EXPLAIN.md`, and `PLAN.md` before implementing anything.
>
> **Source of truth:** The original project proposal `AEGISZ-IBM.docx` defines the project's identity and core scope. Do not replace the project with a different healthcare idea, chatbot, diagnostic system, or generic cybersecurity platform.

---

# 1. YOUR ROLE

You are the **lead software architect, backend engineer, frontend engineer, cybersecurity engineer, ML engineer, cryptography integration engineer, DevOps engineer, and test engineer** for AEGISZ-Health.

Your task is to build the project described in this repository from the ground up.

You must work as an implementation agent, not as a documentation-only assistant.

Your responsibilities are:

1. Understand the complete project before coding.
2. Convert the architecture into working modules.
3. Keep the implementation modular.
4. Build the MVP first.
5. Add security controls before cosmetic features.
6. Test every security-critical feature.
7. Keep the local development environment reproducible.
8. Keep the architecture compatible with the intended IBM LinuxONE / IBM Secure Execution deployment.
9. Clearly mark simulated components.
10. Never invent functionality that is not implemented.

---

# 2. PROJECT IDENTITY — DO NOT CHANGE

## Project name

**AEGISZ-Health**

## Full project title

**AEGISZ-Health: Quantum-Safe Federated Electronic Health Record Exchange & Confidential Clinical Auditing on IBM LinuxONE**

## Core idea

AEGISZ-Health is a federated healthcare data exchange platform that allows hospitals to securely exchange patient records while protecting sensitive healthcare information with:

- Post-quantum cryptography
- ML-KEM
- ML-DSA
- IBM LinuxONE
- IBM Secure Execution
- Confidential computing
- AI-assisted clinical auditing
- Federated hospital databases
- Secure inter-hospital exchange

The original proposal specifically describes healthcare organizations exchanging EHRs for diagnosis, referrals, and emergency care, while addressing long-term privacy risk from Harvest Now, Decrypt Later attacks. The proposed system protects inter-hospital communication with NIST-standard ML-KEM and ML-DSA and performs clinical auditing/anomaly detection inside IBM Secure Execution. 

**Do not replace this concept.**

---

# 3. PRIMARY OBJECTIVE

Build a working prototype that demonstrates:

```text
Hospital A
   ↓
Patient EHR
   ↓
Quantum-Safe Protection
   ↓
Secure Data Transfer
   ↓
IBM Secure Execution
   ↓
Confidential Clinical Audit
   ↓
Clinical Audit Report
   ↓
Hospital B
   ↓
Authorized Doctor Access
```

The implementation must demonstrate that hospitals can collaborate without exposing their complete databases.

---

# 4. CORE FEATURES — ALL MUST EXIST

The project has four mandatory functional pillars.

## 4.1 Quantum-Safe Communication

The system must:

- protect exchanged health records using a post-quantum cryptographic design;
- use ML-KEM for post-quantum key establishment;
- use ML-DSA for digital signatures/authentication;
- verify the received record before allowing it to be accepted;
- detect tampering;
- never expose private keys or secrets in logs.

### Important implementation clarification

ML-KEM is a **key encapsulation mechanism**, not a bulk data cipher.

Therefore implement the project requirement as an envelope:

```text
ML-KEM
   ↓
Shared Secret
   ↓
KDF
   ↓
Symmetric Data Encryption Key
   ↓
Encrypt EHR Payload
```

Use a standard authenticated symmetric cipher for the payload.

For integrity/authenticity:

```text
Canonical EHR Payload
        ↓
Hash / Digest
        ↓
ML-DSA Signature
```

Do not implement cryptographic algorithms manually.

Use an appropriate maintained cryptographic library and isolate it behind a project crypto interface.

---

# 5. CONFIDENTIAL COMPUTING

The original project requires clinical auditing and AI-based anomaly detection to run inside IBM Secure Execution.

Implement two environments.

## Local development

The local machine may simulate the confidential-computing boundary.

The UI and documentation must explicitly say:

```text
LOCAL DEVELOPMENT / SIMULATED SECURE EXECUTION
```

Do not claim that ordinary Docker or a local VM is equivalent to IBM Secure Execution.

## IBM deployment target

Provide a deployment architecture for:

```text
IBM LinuxONE
+
IBM Secure Execution
```

The code must keep the confidential workload separated from the rest of the application so that the deployment boundary can later be moved to the IBM environment.

---

# 6. FEDERATED HOSPITAL MODEL

Do not turn the application into one centralized EHR database.

The project must represent:

```text
Hospital A
   └── Hospital A database

Hospital B
   └── Hospital B database
```

Each hospital retains ownership of its data.

The system may have a central/control service for:

- authentication metadata;
- exchange requests;
- routing;
- public cryptographic metadata;
- policy metadata;
- audit metadata;
- encrypted transfer envelopes.

Do not store the complete plaintext Hospital A EHR database in the central service.

---

# 7. CLINICAL DATA MODEL

Use a FHIR-compatible healthcare data model.

The initial implementation should support a practical subset:

```text
Patient
Encounter
Observation
MedicationRequest
DiagnosticReport
DocumentReference
```

The data must be synthetic or de-identified.

Never use real patient-identifiable information.

The system should demonstrate selective exchange.

Example:

```text
Hospital B requests:
    Observation
    MedicationRequest

Hospital A sends:
    only authorized matching resources

Hospital A does NOT send:
    complete patient history
    unrelated documents
    other patients
    entire hospital database
```

---

# 8. CLINICAL AUDIT ENGINE

The clinical audit engine is NOT a diagnosis engine.

It is an auditing/security-support component.

It should identify:

### Missing information

Examples:

- missing required fields;
- incomplete records;
- missing references.

### Duplicate information

Examples:

- duplicate records;
- repeated documents;
- duplicate observations.

### Document inconsistencies

Examples:

- inconsistent timestamps;
- inconsistent resource references;
- contradictory or malformed metadata.

### Security/access anomalies

Examples:

- abnormal access frequency;
- repeated failed authorization;
- unusual access behavior;
- unusual emergency/break-glass activity.

---

# 9. AI ROLE

AI may be used for:

- anomaly detection;
- audit assistance;
- audit summarization;
- human-readable explanation of findings.

AI must NOT:

- decide authorization;
- generate cryptographic keys;
- replace deterministic security controls;
- approve a doctor automatically;
- alter audit records;
- make medical diagnoses;
- recommend clinical treatment.

Security decisions must remain deterministic and auditable.

---

# 10. AUDIT LOGGING

The original project requires transparent and immutable audit reports.

Implement a tamper-evident audit mechanism.

Each audit event should contain fields such as:

```text
event_id
timestamp
actor_id
hospital_id
action
resource_type
resource_identifier_hash
purpose
decision
severity
previous_hash
event_hash
```

Use chained hashes:

```text
event_1 → hash_1

event_2 + hash_1 → hash_2

event_3 + hash_2 → hash_3
```

Provide a verification operation that can detect if an earlier audit event was modified.

Never store raw patient data in audit events.

---

# 11. IDENTITY AND ACCESS CONTROL

Implement at least these conceptual roles:

```text
DOCTOR
HOSPITAL_ADMIN
AUDITOR
SECURITY_ADMIN
SYSTEM_AGENT
```

Access must consider:

```text
identity
role
hospital
requested patient/resource
purpose
policy
```

Implement a controlled emergency/break-glass path.

Break-glass access must:

1. require a reason;
2. be limited by policy;
3. create a high-severity audit event;
4. be visible to auditors.

---

# 12. API REQUIREMENTS

Use FastAPI.

The backend should provide clean modules for:

```text
authentication
authorization
hospital data
FHIR resources
exchange requests
cryptography
audit
clinical audit
attestation
health/readiness
```

Suggested endpoints:

```text
POST /auth/token

GET  /health
GET  /ready

POST /exchange/request
POST /exchange/approve
POST /exchange/deny
GET  /exchange/{request_id}
GET  /exchange/{request_id}/status

POST /crypto/envelope
POST /crypto/verify

GET  /audit/events
GET  /audit/events/{event_id}
GET  /audit/verify
POST /audit/analyze

POST /emergency/break-glass

GET /attestation/status

GET /hospitals/{hospital_id}
GET /patients/{patient_id}/resources
```

Do not create unrestricted patient-database endpoints.

---

# 13. FRONTEND REQUIREMENTS

Use React + TypeScript.

Build a professional doctor/security portal.

Required areas:

## Login

Role-aware login.

## Doctor Dashboard

Show:

- hospital;
- pending requests;
- approved exchanges;
- recent activity.

## Patient Record

Show:

- authorized resources;
- provenance;
- verification status;
- exchange status.

## Exchange Center

Show:

```text
Request
   ↓
Authorization
   ↓
PQC Protection
   ↓
Secure Transfer
   ↓
Verification
   ↓
Access
```

## Security Center

Show:

- PQC status;
- algorithm metadata;
- signature verification;
- secure-execution mode;
- attestation status.

Never display private keys.

## Audit Center

Show:

- audit events;
- anomaly findings;
- risk/severity;
- audit-chain verification;
- AI-generated explanation where enabled.

---

# 14. SECURITY REQUIREMENTS

Implement:

- authentication;
- authorization;
- input validation;
- secure secret handling;
- rate limiting where appropriate;
- replay protection;
- nonce uniqueness;
- cryptographic verification;
- secure error handling;
- structured security logging;
- dependency pinning;
- non-root container execution;
- security tests.

Never:

- hard-code secrets;
- log private keys;
- log tokens;
- log plaintext patient records;
- bypass authorization;
- silently fail signature verification.

---

# 15. OBSERVABILITY

Provide:

```text
/health
/ready
```

Use structured logs.

Useful metrics:

```text
exchange_requests_total
exchange_success_total
exchange_failure_total
authorization_denials_total
pqc_operations_total
audit_anomalies_total
audit_chain_failures_total
exchange_latency
audit_latency
```

Do not put PHI into logs.

---

# 16. DATA

Use synthetic data.

Create enough records to demonstrate:

- normal exchange;
- incomplete record;
- duplicate record;
- inconsistent document;
- normal access;
- suspicious access;
- unauthorized access;
- break-glass access;
- tampering.

The dataset must be reproducible.

Create a seed/generator script.

---

# 17. TESTING

Every security feature must have a negative test.

Minimum tests:

### Crypto

```text
valid encryption/decryption
valid signature
invalid signature
modified ciphertext
modified payload
wrong key
```

### Authorization

```text
valid doctor
wrong role
wrong hospital
unauthorized patient
denied request
```

### Audit

```text
valid chain
modified event
broken previous hash
```

### Emergency

```text
valid break-glass
missing reason
unauthorized break-glass
audit creation
```

### Exchange

```text
Hospital A → Hospital B success
Hospital A → unauthorized requester blocked
tampered exchange blocked
```

---

# 18. REQUIRED DEMO SCENARIOS

The final project must demonstrate at least four scenarios.

## Scenario A — Normal Exchange

```text
Doctor at Hospital B
        ↓
Requests authorized patient information
        ↓
Hospital A validates request
        ↓
Required resources selected
        ↓
PQC protection
        ↓
Transfer
        ↓
Hospital B verifies
        ↓
Doctor sees record
```

## Scenario B — Unauthorized Access

```text
Unauthorized request
        ↓
Policy check
        ↓
DENIED
        ↓
Audit event
```

## Scenario C — Tampering

```text
Protected record
        ↓
Simulated modification
        ↓
Signature verification
        ↓
FAIL
        ↓
Record rejected
        ↓
Security/audit event
```

## Scenario D — Emergency Access

```text
Emergency request
        ↓
Reason required
        ↓
Break-glass policy
        ↓
Minimum authorized data
        ↓
High-severity audit event
```

---

# 19. IMPLEMENTATION ORDER

Follow this order unless there is a strong technical reason not to.

```text
Phase 1
Repository + configuration + database + synthetic data

Phase 2
Hospital A / Hospital B data separation

Phase 3
Authentication + authorization

Phase 4
FHIR-compatible resources and selective exchange

Phase 5
PQC crypto abstraction + ML-KEM + ML-DSA + payload encryption

Phase 6
Tamper-evident audit

Phase 7
Clinical audit engine

Phase 8
React portal

Phase 9
Secure Execution development abstraction

Phase 10
IBM LinuxONE deployment profile

Phase 11
Testing + attack scenarios

Phase 12
Observability + documentation + final demo
```

Do not start by building a visually complex frontend.

---

# 20. PROJECT STRUCTURE

Use this structure unless a better implementation structure is required:

```text
AEGISZ-Health/
│
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
│   ├── app/
│   │   ├── api/
│   │   ├── auth/
│   │   ├── crypto/
│   │   ├── exchange/
│   │   ├── hospital/
│   │   ├── fhir/
│   │   ├── audit/
│   │   ├── clinical_audit/
│   │   ├── attestation/
│   │   ├── models/
│   │   └── core/
│   └── tests/
│
├── hospital-agent/
│   ├── hospital_a/
│   ├── hospital_b/
│   └── tests/
│
├── frontend/
│   └── src/
│
├── ml/
│   ├── data/
│   ├── training/
│   ├── inference/
│   └── evaluation/
│
├── data/
│   ├── synthetic/
│   └── schemas/
│
├── deploy/
│   ├── local/
│   ├── docker/
│   └── linuxone/
│
├── docs/
├── scripts/
├── security/
└── results/
```

---

# 21. AI AGENT BEHAVIOR

Before modifying code:

1. Read `README.md`.
2. Read `EXPLAIN.md`.
3. Read `PLAN.md`.
4. Read this `PROMPT.md`.
5. Inspect the current repository.
6. Identify what already exists.
7. Do not recreate working components unnecessarily.
8. Make one logical change at a time.
9. Run relevant tests after each major module.
10. Update documentation when behavior changes.

When uncertain:

- preserve the project architecture;
- prefer the documented requirement;
- do not invent a new product direction;
- do not remove a core feature;
- explicitly mark unresolved decisions.

---

# 22. DEFINITION OF DONE

The project is considered complete only when:

### Core
- [ ] Hospital A and Hospital B have separate data ownership.
- [ ] Synthetic EHR records exist.
- [ ] Authorized record exchange works.
- [ ] Selective resource sharing works.

### PQC
- [ ] ML-KEM integration exists.
- [ ] Payload encryption exists.
- [ ] ML-DSA signing exists.
- [ ] Verification works.
- [ ] Tampering is detected.

### Secure Execution
- [ ] Local simulation is clearly identified.
- [ ] IBM LinuxONE deployment profile exists.
- [ ] Confidential audit architecture is documented.

### Clinical Audit
- [ ] Missing information detection.
- [ ] Duplicate detection.
- [ ] Document inconsistency detection.
- [ ] Access anomaly detection.
- [ ] Findings visible in UI.

### Audit
- [ ] Tamper-evident chain.
- [ ] Verification endpoint.
- [ ] No PHI in logs.

### Security
- [ ] Authentication.
- [ ] Authorization.
- [ ] Hospital isolation.
- [ ] Break-glass.
- [ ] Negative security tests.

### UI
- [ ] Doctor portal.
- [ ] Exchange screen.
- [ ] Security screen.
- [ ] Audit screen.

### Demo
- [ ] Normal exchange.
- [ ] Unauthorized access.
- [ ] Tampering.
- [ ] Emergency access.

---

# 23. ABSOLUTE RULES

Never:

1. Change the project into a different idea.
2. Remove ML-KEM.
3. Remove ML-DSA.
4. Remove IBM LinuxONE.
5. Remove IBM Secure Execution.
6. Remove federated hospital exchange.
7. Remove clinical auditing.
8. Use real patient data.
9. Implement cryptography manually.
10. Claim a simulated IBM feature is a real IBM Secure Execution deployment.
11. Allow an AI model to override authorization.
12. Claim an unimplemented feature is working.

The objective is to build **AEGISZ-Health exactly as the defined project**, but as a serious, modular, demonstrable software system.
