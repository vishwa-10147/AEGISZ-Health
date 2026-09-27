import React from 'react';
import { Link } from 'react-router-dom';

export function Dashboard() {
  return (
    <div>
      <h2 style={{ color: '#f8fafc', marginTop: 0, fontSize: '1.875rem' }}>Doctor Dashboard</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
        <div style={{ background: '#1e293b', padding: '1.5rem', borderRadius: '8px', border: '1px solid #334155' }}>
          <h3 style={{ margin: '0 0 1rem 0', color: '#94a3b8', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Connection Status</h3>
          <div style={{ color: '#10b981', fontSize: '1.25rem', fontWeight: 'bold' }}>General Hospital - Connected</div>
        </div>
        <div style={{ background: '#1e293b', padding: '1.5rem', borderRadius: '8px', border: '1px solid #334155' }}>
          <h3 style={{ margin: '0 0 1rem 0', color: '#94a3b8', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Pending Exchanges</h3>
          <div style={{ color: '#f59e0b', fontSize: '1.25rem', fontWeight: 'bold' }}>3 Requests</div>
        </div>
        <div style={{ background: '#1e293b', padding: '1.5rem', borderRadius: '8px', border: '1px solid #334155' }}>
          <h3 style={{ margin: '0 0 1rem 0', color: '#94a3b8', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Audit Alerts</h3>
          <div style={{ color: '#38bdf8', fontSize: '1.25rem', fontWeight: 'bold' }}>0 Anomalies</div>
        </div>
      </div>

      <div style={{ background: '#1e293b', borderRadius: '8px', border: '1px solid #334155', overflow: 'hidden' }}>
        <div style={{ padding: '1.5rem', borderBottom: '1px solid #334155' }}>
          <h3 style={{ margin: 0, color: '#f8fafc' }}>Recent Exchanges</h3>
        </div>
        <div>
          <table style={{ width: '100%', borderCollapse: 'collapse', color: '#cbd5e1' }}>
            <thead>
              <tr style={{ textAlign: 'left', borderBottom: '1px solid #334155', background: '#0f172a' }}>
                <th style={{ padding: '1rem 1.5rem' }}>Patient</th>
                <th style={{ padding: '1rem 1.5rem' }}>Source</th>
                <th style={{ padding: '1rem 1.5rem' }}>Date</th>
                <th style={{ padding: '1rem 1.5rem' }}>Status</th>
                <th style={{ padding: '1rem 1.5rem' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '1rem 1.5rem' }}>John Doe</td>
                <td style={{ padding: '1rem 1.5rem' }}>City Medical Center</td>
                <td style={{ padding: '1rem 1.5rem' }}>2026-09-27</td>
                <td style={{ padding: '1rem 1.5rem' }}><span style={{ padding: '0.25rem 0.75rem', background: '#047857', color: 'white', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 'bold' }}>COMPLETED</span></td>
                <td style={{ padding: '1rem 1.5rem' }}><Link to="/patients/1" style={{ color: '#38bdf8', textDecoration: 'none' }}>View Record</Link></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
