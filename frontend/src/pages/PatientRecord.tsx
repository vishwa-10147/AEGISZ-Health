import React from 'react';
import { useParams } from 'react-router-dom';

export function PatientRecord() {
  const { id } = useParams();

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ color: '#f8fafc', marginTop: 0, marginBottom: '0.5rem', fontSize: '1.875rem' }}>John Doe (ID: {id})</h2>
          <div style={{ color: '#94a3b8', fontSize: '0.875rem' }}>DOB: 1980-05-15 | Gender: Male</div>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <span style={{ padding: '0.5rem 0.75rem', background: '#059669', color: 'white', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold' }}>VERIFIED PQC SIG</span>
          <span style={{ padding: '0.5rem 0.75rem', background: '#0284c7', color: 'white', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold' }}>PROVENANCE OK</span>
        </div>
      </div>

      <div style={{ background: '#1e293b', borderRadius: '8px', border: '1px solid #334155', padding: '1.5rem' }}>
        <div style={{ display: 'flex', gap: '1.5rem', borderBottom: '1px solid #334155', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
          <button style={{ background: 'transparent', border: 'none', color: '#38bdf8', borderBottom: '2px solid #38bdf8', padding: '0.5rem 0', cursor: 'pointer', fontWeight: 'bold' }}>Encounters</button>
          <button style={{ background: 'transparent', border: 'none', color: '#94a3b8', padding: '0.5rem 0', cursor: 'pointer', fontWeight: 'bold' }}>Observations</button>
          <button style={{ background: 'transparent', border: 'none', color: '#94a3b8', padding: '0.5rem 0', cursor: 'pointer', fontWeight: 'bold' }}>Medications</button>
          <button style={{ background: 'transparent', border: 'none', color: '#94a3b8', padding: '0.5rem 0', cursor: 'pointer', fontWeight: 'bold' }}>Diagnostics</button>
          <button style={{ background: 'transparent', border: 'none', color: '#94a3b8', padding: '0.5rem 0', cursor: 'pointer', fontWeight: 'bold' }}>Documents</button>
        </div>
        <div style={{ color: '#cbd5e1' }}>
          <div style={{ padding: '1.5rem', background: '#0f172a', borderRadius: '4px', marginBottom: '1rem', border: '1px solid #334155' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: '#f8fafc', fontSize: '1.125rem' }}>Encounter - General Checkup</h4>
            <div style={{ fontSize: '0.875rem', color: '#94a3b8', marginBottom: '1rem' }}>Date: 2026-09-20 | Provider: Dr. Smith, City Medical Center</div>
            <p style={{ margin: 0, lineHeight: '1.5' }}>Patient presents with mild hypertension. Recommended lifestyle changes including dietary modifications and increased exercise.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
