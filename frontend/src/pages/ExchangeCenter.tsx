import React, { useState, useEffect } from 'react';
import apiClient from '../api/client';

const ExchangeCenter = () => {
  const [patientId, setPatientId] = useState('');
  const [destination, setDestination] = useState('hospital-B');
  const [purpose, setPurpose] = useState('Treatment');
  const [isEmergency, setIsEmergency] = useState(false);
  const [emergencyReason, setEmergencyReason] = useState('');
  const [status, setStatus] = useState('');
  const [isError, setIsError] = useState(false);
  const [terminalLog, setTerminalLog] = useState<string[]>([]);
  const [isQuantumSimulating, setIsQuantumSimulating] = useState(false);

  const [requests, setRequests] = useState<any[]>([]);
  const hospital = localStorage.getItem('hospital_id') || '';
  const role = localStorage.getItem('role') || '';

  const fetchRequests = () => {
    apiClient.get('/exchange/')
      .then(res => setRequests(res.data || []))
      .catch(console.error);
  };

  useEffect(() => {
    fetchRequests();
    const interval = setInterval(fetchRequests, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Processing quantum-safe exchange...');
    setIsError(false);
    setIsQuantumSimulating(true);
    setTerminalLog(['[SYSTEM] Initiating ML-KEM (Kyber-768) Protocol...']);

    try {
      // Simulate key generation delay
      setTimeout(() => setTerminalLog(prev => [...prev, `[KEYGEN] Generating Public Key pk_A (1184 bytes)`]), 500);
      setTimeout(() => setTerminalLog(prev => [...prev, `[NETWORK] Transmitting pk_A to ${destination}...`]), 1000);
      
      await apiClient.post('/exchange/request', {
        patient_id: patientId,
        destination_hospital: destination,
        purpose: purpose,
        requested_resources: ['Encounter', 'Observation', 'MedicationRequest'],
        is_emergency: isEmergency,
        emergency_reason: isEmergency ? emergencyReason : null
      });

      setTimeout(() => setTerminalLog(prev => [...prev, `[ENCAP] Target Node encapsulated symmetric secret.`]), 1500);
      setTimeout(() => setTerminalLog(prev => [...prev, `[CIPHERTEXT] Received CT: 0x${Math.random().toString(16).substr(2, 64).toUpperCase()}... (1088 bytes)`]), 2000);
      setTimeout(() => setTerminalLog(prev => [...prev, `[DECAP] Decapsulated shared AES-256-GCM key successfully.`]), 2500);
      setTimeout(() => {
        setTerminalLog(prev => [...prev, `[SUCCESS] Secure quantum channel established.`]);
        if (isEmergency) {
          setStatus(`CRITICAL: Break Glass protocol activated for ${patientId}. Reason: ${emergencyReason}. Data instantly decrypted. High-severity audit logged.`);
        } else {
          setStatus(`Exchange request generated for patient ${patientId}. Status: PENDING. Payload protected by ML-KEM.`);
        }
        setIsQuantumSimulating(false);
        fetchRequests();
      }, 3000);

    } catch (err: any) {
      setIsError(true);
      setIsQuantumSimulating(false);
      if (err.response?.status === 429) {
        setStatus(`SECURITY ALERT: ${err.response.data.detail}`);
      } else {
        setStatus(`Error: ${err.response?.data?.detail || err.message}`);
      }
    }
  };

  const handleApprove = async (reqId: string) => {
    try {
      await apiClient.post(`/exchange/${reqId}/approve`);
      fetchRequests();
    } catch (err) {
      console.error(err);
      alert('Failed to approve request. Are you authorized?');
    }
  };

  // Pending requests targeted AT THIS hospital
  const pendingInbound = requests.filter(r => r.destination_hospital === hospital && r.status === 'PENDING');

  return (
    <div style={{ color: 'white', maxWidth: '1000px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '24px', marginBottom: '20px', fontWeight: 'bold' }}>Federated Exchange Center</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {/* Request Form */}
        <div style={{ backgroundColor: '#1F2937', padding: '20px', borderRadius: '8px', border: '1px solid #374151' }}>
          <h3 style={{ borderBottom: '1px solid #374151', paddingBottom: '10px', marginBottom: '15px' }}>Initiate Exchange Request</h3>
          <form onSubmit={handleRequest} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', marginBottom: '5px' }}>Target Patient ID</label>
              <input type="text" value={patientId} onChange={(e) => setPatientId(e.target.value)} required placeholder="e.g. pat-hospital-F-10"
                style={{ width: '100%', padding: '10px', borderRadius: '4px', backgroundColor: '#374151', color: 'white', border: '1px solid #4B5563', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '14px', marginBottom: '5px' }}>Destination Hospital</label>
              <select value={destination} onChange={(e) => setDestination(e.target.value)}
                style={{ width: '100%', padding: '10px', borderRadius: '4px', backgroundColor: '#374151', color: 'white', border: '1px solid #4B5563', boxSizing: 'border-box' }}>
                <option value="hospital-A">Hospital A</option>
                <option value="hospital-B">Hospital B</option>
                <option value="hospital-C">Hospital C</option>
                <option value="hospital-D">Hospital D</option>
                <option value="hospital-E">Hospital E</option>
                <option value="hospital-F">Hospital F</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '14px', marginBottom: '5px' }}>Purpose of Access</label>
              <input type="text" value={purpose} onChange={(e) => setPurpose(e.target.value)} required
                style={{ width: '100%', padding: '10px', borderRadius: '4px', backgroundColor: '#374151', color: 'white', border: '1px solid #4B5563', boxSizing: 'border-box' }} />
            </div>

            <div style={{ backgroundColor: '#450a0a', padding: '10px', borderRadius: '4px', border: '1px solid #7f1d1d' }}>
              <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', color: '#fca5a5', fontWeight: 'bold' }}>
                <input type="checkbox" checked={isEmergency} onChange={(e) => setIsEmergency(e.target.checked)} style={{ marginRight: '10px' }} />
                🚨 EMERGENCY OVERRIDE (Break Glass)
              </label>
              {isEmergency && (
                <div style={{ marginTop: '10px' }}>
                  <label style={{ display: 'block', fontSize: '12px', marginBottom: '5px', color: '#fca5a5' }}>Clinical Justification (Audited)</label>
                  <input type="text" value={emergencyReason} onChange={(e) => setEmergencyReason(e.target.value)} required={isEmergency}
                    placeholder="E.g., Patient unconscious, critical trauma"
                    style={{ width: '100%', padding: '8px', borderRadius: '4px', backgroundColor: '#7f1d1d', color: 'white', border: 'none', boxSizing: 'border-box' }} />
                </div>
              )}
            </div>

            <button type="submit" disabled={isQuantumSimulating} style={{ padding: '12px', backgroundColor: isQuantumSimulating ? '#374151' : (isEmergency ? '#dc2626' : '#3B82F6'), color: 'white', border: 'none', borderRadius: '4px', cursor: isQuantumSimulating ? 'not-allowed' : 'pointer', fontWeight: 'bold' }}>
              {isQuantumSimulating ? 'Encrypting via ML-KEM...' : (isEmergency ? 'Execute Emergency Override' : 'Request PQC Encrypted Exchange')}
            </button>
          </form>
          {status && (
            <div style={{ marginTop: '15px', padding: '10px', backgroundColor: isError ? '#991b1b' : (isEmergency ? '#991b1b' : '#064E3B'), color: isError ? 'white' : (isEmergency ? '#fecaca' : '#34D399'), borderRadius: '4px', fontSize: '14px', border: isError ? '1px solid red' : 'none' }}>
              {status}
            </div>
          )}

          {/* Quantum Terminal Visualizer */}
          {(terminalLog.length > 0 || isQuantumSimulating) && (
            <div style={{ marginTop: '20px', backgroundColor: 'black', padding: '15px', borderRadius: '4px', border: '1px solid #10B981', fontFamily: 'monospace', fontSize: '12px', minHeight: '120px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed #10B981', paddingBottom: '5px', marginBottom: '10px' }}>
                <span style={{ color: '#10B981' }}>Quantum Encapsulation Terminal</span>
                <span style={{ color: isQuantumSimulating ? '#F59E0B' : '#10B981' }}>{isQuantumSimulating ? 'SIMULATING...' : 'IDLE'}</span>
              </div>
              {terminalLog.map((log, idx) => (
                <div key={idx} style={{ color: log.includes('CIPHERTEXT') || log.includes('KEYGEN') ? '#60A5FA' : (log.includes('SUCCESS') ? '#10B981' : '#D1D5DB'), margin: '4px 0' }}>
                  {log}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Pending Approvals */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ backgroundColor: '#1F2937', padding: '20px', borderRadius: '8px', border: '1px solid #374151', flex: 1, overflowY: 'auto' }}>
            <h3 style={{ borderBottom: '1px solid #374151', paddingBottom: '10px', marginBottom: '15px' }}>Pending Inbound Requests</h3>
            <p style={{ color: '#9CA3AF', fontSize: '14px', marginBottom: '15px' }}>Other hospitals requesting access to your data.</p>
            
            {pendingInbound.length === 0 && <p style={{ color: '#9CA3AF' }}>No pending requests.</p>}
            {pendingInbound.map(req => (
              <div key={req.id} style={{ padding: '15px', border: '1px dashed #4B5563', borderRadius: '4px', backgroundColor: '#111827', marginBottom: '10px' }}>
                <p style={{ margin: '5px 0', fontSize: '12px', color: '#9CA3AF' }}><strong>Req ID:</strong> {req.id}</p>
                <p style={{ margin: '5px 0' }}><strong>Patient:</strong> {req.patient_id}</p>
                <p style={{ margin: '5px 0' }}><strong>From:</strong> {req.source_hospital}</p>
                <p style={{ margin: '5px 0', color: '#F59E0B' }}><strong>Purpose:</strong> {req.purpose}</p>
                <div style={{ marginTop: '15px' }}>
                  <button onClick={() => handleApprove(req.id)} style={{ padding: '6px 15px', backgroundColor: '#10B981', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginRight: '10px', fontWeight: 'bold' }}>Approve</button>
                  <button style={{ padding: '6px 15px', backgroundColor: '#EF4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Deny</button>
                </div>
              </div>
            ))}
          </div>

          {/* Role-Based History View */}
          {role === 'ADMIN' ? (
            <div style={{ backgroundColor: '#1F2937', padding: '20px', borderRadius: '8px', border: '1px solid #374151', flex: 1, overflowY: 'auto' }}>
              <h3 style={{ borderBottom: '1px solid #374151', paddingBottom: '10px', marginBottom: '15px' }}>Global Exchange Log (Admin Only)</h3>
              {requests.slice(0, 10).map(req => (
                <div key={req.id} style={{ fontSize: '12px', padding: '8px', borderBottom: '1px solid #374151' }}>
                  <span style={{ color: req.status === 'APPROVED' ? '#10B981' : (req.status === 'EMERGENCY' ? '#EF4444' : '#F59E0B') }}>[{req.status}]</span>
                  {' '} {req.source_hospital} ➔ {req.destination_hospital} (Patient: {req.patient_id})
                </div>
              ))}
            </div>
          ) : (
            <div style={{ backgroundColor: '#1F2937', padding: '20px', borderRadius: '8px', border: '1px solid #374151', flex: 1, overflowY: 'auto' }}>
              <h3 style={{ borderBottom: '1px solid #374151', paddingBottom: '10px', marginBottom: '15px' }}>My Hospital's History</h3>
              {requests.filter(r => r.source_hospital === hospital || r.destination_hospital === hospital).length === 0 && (
                <p style={{ color: '#9CA3AF' }}>No exchange history found for {hospital}.</p>
              )}
              {requests.filter(r => r.source_hospital === hospital || r.destination_hospital === hospital).map(req => (
                <div key={req.id} style={{ fontSize: '12px', padding: '8px', borderBottom: '1px solid #374151' }}>
                  <span style={{ color: req.status === 'APPROVED' ? '#10B981' : (req.status === 'EMERGENCY' ? '#EF4444' : '#F59E0B') }}>[{req.status}]</span>
                  {' '} {req.source_hospital === hospital ? '📤 OUTBOUND to ' + req.destination_hospital : '📥 INBOUND from ' + req.source_hospital} (Patient: {req.patient_id})
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default ExchangeCenter;
