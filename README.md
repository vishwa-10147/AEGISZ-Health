# 🏥 AEGISZ-Health: Quantum-Safe Federated EHR Exchange

![Build Status](https://img.shields.io/badge/Build-Passing-brightgreen)
![Python](https://img.shields.io/badge/Python-3.11+-blue)
![React](https://img.shields.io/badge/React-18-61DAFB)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791)
![Security](https://img.shields.io/badge/Security-Post--Quantum%20(ML--KEM)-red)

**AEGISZ-Health** is a next-generation, federated Electronic Health Record (EHR) exchange platform designed to solve the critical dilemma of healthcare technology: **Providing lightning-fast medical data access during emergencies while guaranteeing mathematically unbreakable security against future cyber threats.**

---

## 🛑 The Problem
Modern hospitals struggle to share patient data. Current solutions attempt to build "centralized databases," which act as massive honeypots for hackers. Furthermore, any data stolen today could be decrypted tomorrow by emerging Quantum Computers ("Harvest Now, Decrypt Later" attacks).

## 🚀 Our Solution
AEGISZ-Health eliminates the honeypot by keeping patient data strictly within its origin hospital until explicitly requested. When a transfer is authorized, the data is secured using **NIST-approved Post-Quantum Cryptography** and logged on an immutable **Tamper-Evident Hash Chain**.

---

## ✨ Key Features

*   **🛡️ Quantum-Safe Cryptography:** Utilizes `liboqs` (Open Quantum Safe) to wrap FHIR payloads in **ML-KEM (Kyber)** key encapsulation and **ML-DSA (Dilithium)** digital signatures.
*   **🌐 6-Node Federated Mesh Network:** Completely decentralized data architecture utilizing 7 isolated PostgreSQL databases (6 independent hospitals + 1 global security ledger) orchestrated via Docker.
*   **⛓️ Tamper-Evident Security Ledger:** A lightweight, high-speed SHA-256 hash chain that acts as a blockchain-alternative to instantly detect if a database administrator maliciously alters access logs.
*   **🚨 "Break Glass" Emergency Protocol:** Security should never cost a life. In critical emergencies, doctors can instantly bypass the admin approval queue to access data, which triggers a High-Severity Audit event and alerts the governance board.
*   **🧠 AI-Driven Anomaly Detection:** An automated intrusion prevention system that monitors API request velocity. If a compromised account attempts to mass-download patient records, the AI engine freezes the account in milliseconds (HTTP 429).
*   **👥 Role-Based Clinical Dashboards:** Custom React.js interfaces. Doctors receive a streamlined Clinical UI, while System Administrators operate a Global Command Center for data governance.

---

## 🏗️ Architecture & Tech Stack

### Tech Stack
*   **Backend:** `Python`, `FastAPI`, `SQLAlchemy`, `asyncpg`
*   **Frontend:** `React`, `TypeScript`, `Vite`, `Tailwind CSS`
*   **Infrastructure:** `Docker`, `Docker Compose` (7 simultaneous containers)
*   **Cryptography:** `liboqs-python` (Post-Quantum algorithms)
*   **Data Generation:** `Faker` (Synthetic FHIR data generation for thousands of clinical encounters)

### System Workflow
1.  **Request:** Doctor A requests Patient B's medical history from Hospital F.
2.  **Governance:** The request enters the Global Ledger. (Unless "Break Glass" is engaged).
3.  **Approval:** System Admin reviews and approves the request.
4.  **Encryption:** Hospital F packages the data, encrypts it using ML-KEM, and signs it using ML-DSA.
5.  **Delivery & Audit:** The payload is transferred, and the exact cryptographic hash of the transaction is permanently cemented into the Security Ledger.

---

## 🚀 Quick Start (Run Locally)

### Prerequisites
*   Docker & Docker Compose
*   Python 3.11+
*   Node.js 18+

### 1. Boot the Federated Network
We have included a Windows batch script that simultaneously boots the 7 databases, runs the FastAPI backend, and starts the React frontend.
```cmd
./start.cmd
```

### 2. Login Credentials
Once the frontend boots at `http://localhost:5173`, you can explore the two distinct dashboards using our pre-seeded synthetic dataset:

**System Administrator (Command Center & Approvals):**
*   **Username:** `admin`
*   **Password:** `password123`

**Doctors (Clinical Dashboard & Data Requests):**
*   **Username:** `doctor_a` (Metro General - Hospital A)
*   **Username:** `doctor_b` (City Medical - Hospital B)
*   *(Credentials work for `doctor_c` through `doctor_f`)*
*   **Password:** `password123`

---

## 🧬 Synthetic Data Compliance
To ensure complete HIPAA and GDPR compliance during development and demonstration, **0% real patient data is used in this repository**. All data, including 300+ patients and thousands of medical encounters, is programmatically generated synthetic FHIR data.

---
*Built with ❤️ for the Healthcare Innovation Hackathon.*
