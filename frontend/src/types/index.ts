export interface User {
  id: string;
  username: string;
  role: 'Doctor' | 'Admin' | 'Auditor';
  hospitalId: string;
}

export interface Hospital {
  id: string;
  name: string;
  publicKey: string;
}

export interface Patient {
  id: string;
  name: string;
  dob: string;
  gender: string;
}

export enum ResourceType {
  Encounter = 'Encounter',
  Observation = 'Observation',
  Medication = 'Medication',
  Diagnostic = 'Diagnostic',
  Document = 'Document',
}

export interface FHIRResource {
  id: string;
  patientId: string;
  type: ResourceType;
  content: string; // JSON string representation
  timestamp: string;
}

export type ExchangeStatus = 'Requested' | 'Authorized' | 'Wrapped' | 'Transferred' | 'Verified' | 'Completed' | 'Failed';

export interface ExchangeRequest {
  id: string;
  sourceHospitalId: string;
  destHospitalId: string;
  patientId: string;
  purpose: string;
  status: ExchangeStatus;
  timestamp: string;
}

export interface AuditEvent {
  id: string;
  timestamp: string;
  action: string;
  actor: string;
  details: string;
  severity: 'INFO' | 'WARN' | 'CRITICAL';
}

export interface AuditFinding {
  eventId: string;
  explanation: string;
  riskLevel: string;
}

export interface CryptoStatus {
  mlKemActive: boolean;
  mlDsaActive: boolean;
  hybridMode: boolean;
}

export interface AttestationStatus {
  verified: boolean;
  mode: 'LOCAL' | 'SIMULATED' | 'HARDWARE';
}

export interface PQCEnvelope {
  ciphertext: string;
  signature: string;
  metadata: any;
}
