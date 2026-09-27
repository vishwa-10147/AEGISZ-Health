import React from 'react';

export function SecurityCenter() {
  return (
    <div>
      <h2 style={{ color: '#f8fafc', marginTop: 0, fontSize: '1.875rem' }}>Security Center</h2>
      
      <div style={{ background: '#991b1b', color: 'white', padding: '1rem 1.5rem', borderRadius: '8px', marginBottom: '2rem', fontWeight: 'bold', display: 'inline-block', border: '1px solid #ef4444' }}>
        WARNING: NEVER DISPLAY PRIVATE KEYS IN UI
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <div style={{ background: '#1e293b', padding: '1.5rem', borderRadius: '8px', border: '1px solid #334155' }}>
          <h3 style={{ margin: '0 0 1.5rem 0', color: '#f8fafc', borderBottom: '1px solid #334155', paddingBottom: '0.75rem' }}>PQC Status</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#94a3b8' }}>Key Encapsulation (KEM)</span>
              <span style={{ color: '#10b981', fontWeight: 'bold', background: '#064e3b', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.875rem' }}>ML-KEM (Kyber768) ACTIVE</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#94a3b8' }}>Digital Signatures (DSA)</span>
              <span style={{ color: '#10b981', fontWeight: 'bold', background: '#064e3b', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.875rem' }}>ML-DSA (Dilithium3) ACTIVE</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#94a3b8' }}>Hybrid Mode</span>
              <span style={{ color: '#38bdf8', fontWeight: 'bold', background: '#0c4a6e', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.875rem' }}>ENABLED (X25519)</span>
            </div>
          </div>
        </div>

        <div style={{ background: '#1e293b', padding: '1.5rem', borderRadius: '8px', border: '1px solid #334155' }}>
          <h3 style={{ margin: '0 0 1.5rem 0', color: '#f8fafc', borderBottom: '1px solid #334155', paddingBottom: '0.75rem' }}>Secure Execution</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#94a3b8' }}>Enclave Mode</span>
              <span style={{ color: '#f59e0b', fontWeight: 'bold', background: '#78350f', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.875rem' }}>LOCAL DEVELOPMENT / SIMULATED</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#94a3b8' }}>Attestation Status</span>
              <span style={{ color: '#10b981', fontWeight: 'bold', background: '#064e3b', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.875rem' }}>VERIFIED (Mock)</span>
            </div>
          </div>
        </div>
        
        <div style={{ background: '#1e293b', padding: '1.5rem', borderRadius: '8px', border: '1px solid #334155', gridColumn: 'span 2' }}>
          <h3 style={{ margin: '0 0 1rem 0', color: '#f8fafc' }}>Recent Signature Verifications</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', color: '#cbd5e1' }}>
            <thead>
              <tr style={{ textAlign: 'left', borderBottom: '1px solid #334155' }}>
                <th style={{ padding: '0.75rem' }}>Resource ID</th>
                <th style={{ padding: '0.75rem' }}>Algorithm</th>
                <th style={{ padding: '0.75rem' }}>Timestamp</th>
                <th style={{ padding: '0.75rem' }}>Result</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #334155' }}>
                <td style={{ padding: '0.75rem' }}>ENC-9921</td>
                <td style={{ padding: '0.75rem' }}>ML-DSA</td>
                <td style={{ padding: '0.75rem' }}>2026-09-27 10:14:02</td>
                <td style={{ padding: '0.75rem', color: '#10b981', fontWeight: 'bold' }}>SUCCESS</td>
              </tr>
              <tr>
                <td style={{ padding: '0.75rem' }}>OBS-4412</td>
                <td style={{ padding: '0.75rem' }}>ML-DSA</td>
                <td style={{ padding: '0.75rem' }}>2026-09-27 10:14:05</td>
                <td style={{ padding: '0.75rem', color: '#10b981', fontWeight: 'bold' }}>SUCCESS</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
