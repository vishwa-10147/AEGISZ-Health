CREATE TABLE IF NOT EXISTS hospitals (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    status VARCHAR(20) DEFAULT 'ACTIVE'
);

CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(50) PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    role VARCHAR(50) NOT NULL,
    hospital_id VARCHAR(50) REFERENCES hospitals(id),
    hashed_password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS exchange_requests (
    id VARCHAR(50) PRIMARY KEY,
    patient_id VARCHAR(50) NOT NULL,
    source_hospital VARCHAR(50) NOT NULL,
    destination_hospital VARCHAR(50) NOT NULL,
    purpose VARCHAR(100) NOT NULL,
    status VARCHAR(50) NOT NULL
);
