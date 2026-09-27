CREATE TABLE patients (id VARCHAR(255) PRIMARY KEY);
CREATE TABLE encounters (id VARCHAR(255) PRIMARY KEY, patient_id VARCHAR(255));
CREATE TABLE observations (id VARCHAR(255) PRIMARY KEY, patient_id VARCHAR(255));
CREATE TABLE medication_requests (id VARCHAR(255) PRIMARY KEY, patient_id VARCHAR(255));
CREATE TABLE diagnostic_reports (id VARCHAR(255) PRIMARY KEY, patient_id VARCHAR(255));
CREATE TABLE document_references (id VARCHAR(255) PRIMARY KEY, patient_id VARCHAR(255));
