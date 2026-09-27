import React from 'react';

export function AuditCenter() {
  return (
    <div>
      <h2 style={{ color: '#f8fafc', marginTop: 0, fontSize: '1.875rem' }}>Audit Center</h2>
      
      <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem' }}>
        <div style={{ background: '#1e293b', padding: '1.5rem', borderRadius: '8px', border: '1px solid #334155', flex: 1 }}>
          <h3 style={{ margin: '0 0 1rem 0', color: '#94a3b8', fontSize: '0.875rem', textTransform: 'uppercase' }}>Audit Chain Verification</h3>
          <div style={{ color: '#10b981', fontSize: '1.5rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '2rem' }}>✓</span> VALID (No Tampering Detected)
          </div>
        </div>
        <div style={{ background: '#1e293b', padding: '1.5rem', borderRadius: '8px', border: '1px solid #334155', flex: 1 }}>
          <h3 style={{ margin: '0 0 1rem 0', color: '#94a3b8', fontSize: '0.875rem', textTransform: 'uppercase' }}>AI Anomaly Detection</h3>
          <div style={{ color: '#38bdf8', fontSize: '1.5rem', fontWeight: 'bold' }}>0 Active Anomalies</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
        <div style={{ background: '#1e293b', borderRadius: '8px', border: '1px solid #334155', overflow: 'hidden' }}>
          <div style={{ padding: '1.5rem', borderBottom: '1px solid #334155', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ margin: 0, color: '#f8fafc' }}>Event Log</h3>
            <select style={{ background: '#0f172a', color: 'white', border: '1px solid #334155', borderRadius: '4px', padding: '0.5rem', outline: 'none' }}>
              <option>All Severities</option>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', color: '#cbd5e1' }}>
            <thead>
              <tr style={{ textAlign: 'left', borderBottom: '1px solid #334155', background: '#0f172a' }}>
                <th style={{ padding: '1rem 1.5rem' }}>Time</th>
                <th style={{ padding: '1rem 1.5rem' }}>Action</th>
                <th style={{ padding: '1rem 1.5rem' }}>Actor</th>
                <th style={{ padding: '1rem 1.5rem' }}>Severity</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #334155' }}>
                <td style={{ padding: '1rem 1.5rem' }}>2026-09-27 10:00:00</td>
                <td style={{ padding: '1rem 1.5rem' }}>Exchange Initiated</td>
                <td style={{ padding: '1rem 1.5rem' }}>Dr. Smith</td>
                <td style={{ padding: '1rem 1.5rem' }}><span style={{ color: '#10b981', fontWeight: 'bold' }}>INFO</span></td>
              </tr>
              <tr style={{ borderBottom: '1px solid #334155' }}>
                <td style={{ padding: '1rem 1.5rem' }}>2026-09-27 09:15:22</td>
                <td style={{ padding: '1rem 1.5rem' }}>Failed Auth Attempt</td>
                <td style={{ padding: '1rem 1.5rem' }}>Unknown (192.168.1.10)</td>
                <td style={{ padding: '1rem 1.5rem' }}><span style={{ color: '#f59e0b', fontWeight: 'bold' }}>WARN</span></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style={{ background: '#1e293b', padding: '1.5rem', borderRadius: '8px', border: '1px solid #334155' }}>
          <h3 style={{ margin: '0 0 1.5rem 0', color: '#f8fafc' }}>AI Explanations</h3>
          <div style={{ padding: '1.25rem', background: '#0f172a', borderRadius: '4px', color: '#cbd5e1', fontSize: '0.875rem', border: '1px solid #334155' }}>
            <strong style={{ color: '#f8fafc', display: 'block', marginBottom: '0.75rem' }}>Analysis of Failed Auth (09:15:22):</strong>
            <p style={{ margin: '0 0 1rem 0', lineHeight: '1.5' }}>This appears to be a routine typo event. The user successfully logged in 12 seconds later from the same IP address.</p>
            <p style={{ margin: 0, lineHeight: '1.5' }}>No lateral movement or brute force patterns detected.</p>
            <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #334155', display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#94a3b8' }}>Risk Level:</span>
              <span style={{ color: '#10b981', fontWeight: 'bold' }}>LOW</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
