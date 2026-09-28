CREATE TABLE IF NOT EXISTS patients (
    id VARCHAR(50) PRIMARY KEY,
    resource_data JSONB NOT NULL
);

CREATE TABLE IF NOT EXISTS fhir_resources (
    id VARCHAR(50) PRIMARY KEY,
    patient_id VARCHAR(50) REFERENCES patients(id),
    resource_type VARCHAR(50) NOT NULL,
    resource_data JSONB NOT NULL
);
