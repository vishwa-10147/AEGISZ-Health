import React, { useState } from 'react';

const ExchangeCenter = () => {
  const [patientId, setPatientId] = useState('');
  const [destination, setDestination] = useState('hospital-C');
  const [purpose, setPurpose] = useState('Treatment');
  const [isEmergency, setIsEmergency] = useState(false);
  const [emergencyReason, setEmergencyReason] = useState('');
  const [status, setStatus] = useState('');

  const handleRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEmergency) {
      setStatus(`CRITICAL: Break Glass protocol activated for ${patientId}. Reason: ${emergencyReason}. Data instantly decrypted. High-severity audit logged.`);
    } else {
      setStatus(`Exchange request generated for patient ${patientId}. Status: PENDING. Payload will be protected by ML-KEM + ML-DSA.`);
    }
  };

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
              <input type="text" value={patientId} onChange={(e) => setPatientId(e.target.value)} required
                style={{ width: '100%', padding: '10px', borderRadius: '4px', backgroundColor: '#374151', color: 'white', border: '1px solid #4B5563', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '14px', marginBottom: '5px' }}>Destination Hospital</label>
              <select value={destination} onChange={(e) => setDestination(e.target.value)}
                style={{ width: '100%', padding: '10px', borderRadius: '4px', backgroundColor: '#374151', color: 'white', border: '1px solid #4B5563', boxSizing: 'border-box' }}>
                <option value="hospital-A">Metro General (Hospital A)</option>
                <option value="hospital-B">City Medical (Hospital B)</option>
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

            <button type="submit" style={{ padding: '12px', backgroundColor: isEmergency ? '#dc2626' : '#3B82F6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
              {isEmergency ? 'Execute Emergency Override' : 'Request PQC Encrypted Exchange'}
            </button>
          </form>
          {status && <div style={{ marginTop: '15px', padding: '10px', backgroundColor: isEmergency ? '#991b1b' : '#064E3B', color: isEmergency ? '#fecaca' : '#34D399', borderRadius: '4px', fontSize: '14px' }}>{status}</div>}
        </div>

        {/* Pending Approvals */}
        <div style={{ backgroundColor: '#1F2937', padding: '20px', borderRadius: '8px', border: '1px solid #374151' }}>
          <h3 style={{ borderBottom: '1px solid #374151', paddingBottom: '10px', marginBottom: '15px' }}>Pending Inbound Requests</h3>
          <p style={{ color: '#9CA3AF', fontSize: '14px', marginBottom: '15px' }}>Other hospitals requesting access to your data.</p>
          
          <div style={{ padding: '15px', border: '1px dashed #4B5563', borderRadius: '4px', backgroundColor: '#111827' }}>
            <p style={{ margin: '5px 0' }}><strong>Req ID:</strong> req-8f3a9b</p>
            <p style={{ margin: '5px 0' }}><strong>Patient:</strong> patient-A-001</p>
            <p style={{ margin: '5px 0' }}><strong>From:</strong> hospital-B</p>
            <div style={{ marginTop: '15px' }}>
              <button style={{ padding: '6px 15px', backgroundColor: '#10B981', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginRight: '10px', fontWeight: 'bold' }}>Approve</button>
              <button style={{ padding: '6px 15px', backgroundColor: '#EF4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Deny</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExchangeCenter;
