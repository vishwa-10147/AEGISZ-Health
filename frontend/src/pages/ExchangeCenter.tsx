import React from 'react';

export function ExchangeCenter() {
  return (
    <div>
      <h2 style={{ color: '#f8fafc', marginTop: 0, fontSize: '1.875rem' }}>Exchange Center</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
        <div style={{ background: '#1e293b', padding: '1.5rem', borderRadius: '8px', border: '1px solid #334155' }}>
          <h3 style={{ margin: '0 0 1.5rem 0', color: '#f8fafc' }}>New Request</h3>
          <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <input placeholder="Source Hospital ID" style={{ padding: '0.75rem', borderRadius: '4px', background: '#0f172a', color: 'white', border: '1px solid #334155', outline: 'none' }} />
            <input placeholder="Target Hospital ID" style={{ padding: '0.75rem', borderRadius: '4px', background: '#0f172a', color: 'white', border: '1px solid #334155', outline: 'none' }} />
            <input placeholder="Patient ID" style={{ padding: '0.75rem', borderRadius: '4px', background: '#0f172a', color: 'white', border: '1px solid #334155', outline: 'none' }} />
            <input placeholder="Purpose of Use" style={{ padding: '0.75rem', borderRadius: '4px', background: '#0f172a', color: 'white', border: '1px solid #334155', outline: 'none' }} />
            <select style={{ padding: '0.75rem', borderRadius: '4px', background: '#0f172a', color: 'white', border: '1px solid #334155', outline: 'none' }}>
              <option>All Resources</option>
              <option>Encounters Only</option>
            </select>
            <button type="button" style={{ padding: '0.875rem', borderRadius: '4px', background: '#0ea5e9', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 'bold', marginTop: '0.5rem' }}>Initiate PQC Exchange</button>
          </form>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div style={{ background: '#1e293b', padding: '1.5rem', borderRadius: '8px', border: '1px solid #334155' }}>
            <h3 style={{ margin: '0 0 1.5rem 0', color: '#f8fafc' }}>Active Exchange Pipeline</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '2.5rem 0', position: 'relative' }}>
              <div style={{ position: 'absolute', top: '50%', left: '0', right: '0', height: '2px', background: '#334155', zIndex: 0 }}></div>
              {['Request', 'Auth', 'PQC Wrap', 'Transfer', 'Verify'].map((step, i) => (
                <div key={step} style={{ background: i < 3 ? '#10b981' : i === 3 ? '#f59e0b' : '#334155', color: 'white', padding: '0.5rem 1rem', borderRadius: '999px', zIndex: 1, fontSize: '0.875rem', fontWeight: 'bold', border: '2px solid #1e293b' }}>
                  {step}
                </div>
              ))}
            </div>
            <div style={{ padding: '1rem', background: '#0f172a', borderRadius: '4px', color: '#cbd5e1', border: '1px solid #334155' }}>
              <strong>Current Status:</strong> ML-KEM Encapsulation Complete. Awaiting Transfer.
            </div>
          </div>
          
          <div style={{ background: '#1e293b', padding: '1.5rem', borderRadius: '8px', border: '1px solid #334155' }}>
            <h3 style={{ margin: '0 0 1rem 0', color: '#f8fafc' }}>Active Exchanges List</h3>
            <div style={{ padding: '1rem', background: '#0f172a', borderRadius: '4px', color: '#cbd5e1', border: '1px solid #334155' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <strong>REQ-2026-0927-01</strong>
                  <div style={{ fontSize: '0.875rem', color: '#94a3b8', marginTop: '0.25rem' }}>Patient: 12345 | To: HospA</div>
                </div>
                <span style={{ padding: '0.25rem 0.75rem', background: '#b45309', color: 'white', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 'bold' }}>TRANSFERRING</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
