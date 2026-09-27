# AEGISZ-Health — Complete System Explanation

## 1. What is AEGISZ-Health?

AEGISZ-Health is a **quantum-safe federated Electronic Health Record exchange and confidential clinical auditing platform** intended for IBM LinuxONE.

The project combines four major capabilities:

```text
1. Quantum-Safe Communication
2. Confidential Computing
3. Federated Hospital Exchange
4. Clinical Audit Engine
```

These are not separate projects. They form one security architecture.

The original project proposal defines the system as a federated healthcare data exchange platform built on IBM LinuxONE, using ML-KEM for post-quantum key encapsulation, ML-DSA for digital signatures, IBM Secure Execution for confidential clinical auditing, and AI-assisted anomaly detection. 

---

# 2. The Problem We Are Solving

Hospitals need to exchange EHRs for:

- diagnosis;
- referrals;
- emergency care;
- collaboration between healthcare organizations.

The problem is that medical records contain highly sensitive information.

The project proposal identifies a long-term security concern:

```text
Encrypted medical data
        ↓
stolen today
        ↓
stored by attacker
        ↓
potentially decrypted by future quantum computers
```

This is the **Harvest Now, Decrypt Later (HNDL)** concern described in the proposal.

The system therefore needs to address:

```text
Confidentiality
Integrity
Authenticity
Privacy
Secure processing
Auditing
```

---

# 3. What We Are Building

The system is not simply:

```text
Hospital A → API → Hospital B
```

It is:

```text
             AEGISZ-HEALTH

Hospital A
   │
   │ owns EHR
   ▼
Hospital A Data Layer
   │
   │ authorized subset
   ▼
PQC Protection
   │
   │ secure transfer
   ▼
IBM Secure Execution
   │
   │ confidential audit
   ▼
Clinical Audit Report
   │
   ▼
Hospital B
   │
   ▼
Authorized Doctor
```

The central principle is:

> Hospitals retain ownership of their databases while securely sharing only authorized records.

That is one of the core features explicitly stated in the original project proposal.

---

# 4. The Four Main Components

## 4.1 Quantum-Safe Communication

Purpose:

Protect EHR exchanges against future quantum-era threats.

The project uses:

```text
ML-KEM
ML-DSA
```

### ML-KEM

ML-KEM is used for post-quantum key establishment.

Conceptually:

```text
Hospital A
    │
    │ ML-KEM encapsulation
    ▼
Shared secret
    │
    ▼
Symmetric encryption key
```

The actual EHR payload should then be encrypted using a standard authenticated symmetric encryption algorithm.

### ML-DSA

ML-DSA is used for digital signatures.

Conceptually:

```text
EHR payload
    ↓
Digest
    ↓
ML-DSA signature
```

Hospital B can verify:

```text
Was the data changed?
Who signed it?
Is the signature valid?
```

The implementation must use established cryptographic libraries.

---

# 5. Why We Need Both Encryption and Signatures

Encryption and signatures solve different problems.

### Encryption

Answers:

> Can an unauthorized party read the medical record?

### Signature

Answers:

> Has the medical record been modified, and can its origin be authenticated?

Therefore:

```text
Confidentiality → Encryption
Integrity       → Signature
Authenticity    → Signature
```

Both are required.

---

# 6. Confidential Computing

Encryption protects data:

```text
while stored
while transmitted
```

But healthcare systems also need protection while sensitive information is being processed.

AEGISZ-Health therefore places clinical auditing and AI-based anomaly detection inside the intended IBM Secure Execution environment.

Conceptually:

```text
Encrypted EHR
     ↓
Secure workload
     ↓
Protected processing environment
     ↓
Clinical audit
     ↓
Audit result
```

The project should not expose sensitive patient information unnecessarily outside the confidential processing boundary.

---

# 7. IBM LinuxONE

IBM LinuxONE is the intended enterprise deployment platform.

The project is specifically designed to demonstrate IBM Z/LinuxONE security capabilities.

The local development environment is not the final deployment environment.

Therefore:

```text
Developer PC
    ↓
Local simulation
    ↓
same application interfaces
    ↓
IBM LinuxONE
    ↓
IBM Secure Execution
```

The AI agent must maintain this distinction throughout development.

---

# 8. Federated Hospital Exchange

The word **federated** is important.

Hospital A owns:

```text
Hospital A EHR database
```

Hospital B owns:

```text
Hospital B EHR database
```

Neither hospital should need to upload its complete database into a single central plaintext repository.

Instead:

```text
Hospital B requests
       ↓
Hospital A checks authorization
       ↓
Hospital A selects required records
       ↓
Records are protected
       ↓
Records are transferred
```

This reduces unnecessary data exposure.

---

# 9. Data Minimization

Suppose Hospital B requests:

```text
Recent observations
Medication information
```

Hospital A should not send:

```text
Entire patient history
Old unrelated documents
Other patients
Entire database
```

The exchange should be:

```text
REQUEST
  ↓
SELECT ONLY REQUIRED RESOURCES
  ↓
PROTECT
  ↓
TRANSFER
```

This is one of the most important privacy concepts in the project.

---

# 10. Healthcare Data

Use synthetic/de-identified healthcare records.

The implementation can use FHIR-compatible resources such as:

```text
Patient
Encounter
Observation
MedicationRequest
DiagnosticReport
DocumentReference
```

The objective is not to build a complete hospital information system.

The objective is to demonstrate secure exchange of healthcare records.

---

# 11. Clinical Audit Engine

The clinical audit engine examines healthcare information and related activity for problems.

The original proposal explicitly identifies:

- missing information;
- duplicate records;
- document inconsistencies.

The implementation can additionally analyze security/access patterns.

Pipeline:

```text
FHIR / Audit Data
      ↓
Validation
      ↓
Rules
      ↓
Feature Extraction
      ↓
Anomaly Detection
      ↓
Clinical/Security Audit Finding
      ↓
Audit Report
```

---

# 12. AI's Role

AI is an assistant to the audit process.

Example:

```text
Audit event:
Doctor accessed 25 records in 2 minutes

AI/rules:
Potentially abnormal access pattern

Output:
"Unusual access frequency detected.
Review required."
```

The AI is NOT the authorization system.

Correct:

```text
Policy Engine → decides access
AI → explains/analyzes
```

Incorrect:

```text
AI → decides whether doctor may access patient
```

The latter must not be implemented.

---

# 13. Audit Reports

The system must provide transparent audit reports.

An audit report can contain:

```text
Timestamp
Actor
Hospital
Action
Resource
Purpose
Decision
Severity
Finding
```

Do not put complete patient records into audit logs.

---

# 14. Tamper-Evident Auditing

An ordinary database table can be modified by someone with sufficient privileges.

Therefore the project should make audit history tamper-evident.

Example:

```text
Event 1
   ↓
Hash 1

Event 2 + Hash 1
   ↓
Hash 2

Event 3 + Hash 2
   ↓
Hash 3
```

If Event 2 changes:

```text
Hash 2 changes
   ↓
Hash 3 no longer matches
   ↓
Audit verification fails
```

The UI should be able to show:

```text
AUDIT CHAIN: VALID
```

or:

```text
AUDIT CHAIN: TAMPER DETECTED
```

---

# 15. Authentication and Authorization

The system must know:

```text
Who is requesting?
Which hospital?
What role?
Which patient?
Which resource?
Why is it being requested?
```

Example:

```text
Doctor B
   ↓
Hospital B
   ↓
requests Patient 001
   ↓
purpose = emergency care
   ↓
policy evaluation
```

Only then should the exchange proceed.

---

# 16. Break-Glass Access

Healthcare environments may need emergency access.

The project should support a controlled emergency path.

Example:

```text
Emergency
   ↓
Doctor requests break-glass
   ↓
Reason entered
   ↓
Emergency policy
   ↓
Minimum required information
   ↓
Access
   ↓
High-severity audit event
```

The emergency path must not silently bypass auditing.

---

# 17. Complete Exchange Flow

This is the main system flow the AI agent must understand.

```text
STEP 1
Doctor at Hospital B requests a patient record.

STEP 2
Hospital B identity is authenticated.

STEP 3
Authorization/policy is evaluated.

STEP 4
Hospital A receives the request.

STEP 5
Hospital A determines which resources may be shared.

STEP 6
Only authorized resources are selected.

STEP 7
The selected EHR payload is protected with the PQC envelope.

STEP 8
The payload is transferred.

STEP 9
Hospital B verifies the signature.

STEP 10
Hospital B decrypts the protected payload.

STEP 11
Clinical/security auditing is performed.

STEP 12
An audit report is generated.

STEP 13
The authorized doctor sees the approved record.

STEP 14
The complete transaction remains auditable.
```

---

# 18. Failure Flow — Unauthorized Access

```text
Doctor
  ↓
Request
  ↓
Authentication
  ↓
Authorization
  ↓
DENIED
  ↓
No EHR released
  ↓
Audit event
```

The system must not return the record and then log the violation.

The authorization decision must happen before release.

---

# 19. Failure Flow — Tampering

```text
Hospital A
   ↓
Protected record
   ↓
Transfer
   ↓
Simulated attacker modifies data
   ↓
Hospital B verifies signature
   ↓
INVALID
   ↓
Record rejected
   ↓
Security event
   ↓
Audit
```

This is one of the most important demonstrations for the hackathon.

---

# 20. Local vs Production

The AI agent must understand that there are two implementation levels.

## Level 1 — Hackathon/local

Use:

```text
Docker
FastAPI
React
PostgreSQL
synthetic data
PQC libraries
simulated Secure Execution boundary
```

## Level 2 — IBM target

Use:

```text
IBM LinuxONE
IBM Secure Execution
confidential workload
attestation/deployment controls
```

The local implementation should preserve interfaces so that the confidential workload can later be deployed on LinuxONE.

---

# 21. Frontend

The frontend is a demonstration and operational interface.

It should make the security architecture visible.

Important status indicators:

```text
PQC: ENABLED
Signature: VERIFIED
Hospital A: CONNECTED
Hospital B: CONNECTED
Audit Chain: VALID
Confidential Environment: LOCAL / IBM
```

The UI should help judges understand the system without reading the code.

---

# 22. Backend

FastAPI is the gateway.

It should coordinate:

```text
Authentication
Authorization
Hospital exchange
FHIR resources
Crypto service
Audit service
Clinical audit
Attestation status
```

Keep each responsibility in a separate module.

---

# 23. Database Separation

At minimum represent:

```text
Hospital A DB
Hospital B DB
Control/Audit DB
```

The hospital databases represent ownership boundaries.

The control database should not become a copy of both hospital EHRs.

---

# 24. What the AI Agent Must NOT Do

The coding agent must not:

- turn this into a chatbot;
- turn it into an AI doctor;
- use real patient records;
- remove IBM LinuxONE;
- remove Secure Execution;
- remove ML-KEM;
- remove ML-DSA;
- remove federated exchange;
- centralize all hospital records;
- let AI decide authorization;
- invent clinical claims;
- claim security features without implementation;
- replace security controls with prompts.

---

# 25. What the AI Agent SHOULD Do

The agent should:

- build incrementally;
- test each module;
- use synthetic data;
- create clear interfaces;
- keep security boundaries explicit;
- create reproducible setup;
- generate attack simulations;
- create audit reports;
- provide meaningful UI;
- document implementation status;
- distinguish mock/simulation/production components.

---

# 26. Final Mental Model

The AI agent should remember this:

```text
                AEGISZ-HEALTH
                      │
        ┌─────────────┼─────────────┐
        │             │             │
   FEDERATION       PQC       CONFIDENTIAL
        │             │          COMPUTING
        │             │             │
 Hospital A       ML-KEM        IBM Secure
 Hospital B       ML-DSA        Execution
        │             │             │
        └─────────────┼─────────────┘
                      │
              CLINICAL AUDIT
                      │
                AI + RULES
                      │
                AUDIT REPORT
```

The project is therefore a **secure healthcare data-exchange system**, not merely a cryptography project and not merely an AI project.
