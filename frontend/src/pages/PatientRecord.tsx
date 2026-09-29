import React, { useState, useEffect } from 'react';
import apiClient from '../api/client';

const PatientRecord = () => {
  const [search, setSearch] = useState('');
  const [patients, setPatients] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  
  // AI Summary State
  const [summarizingId, setSummarizingId] = useState<string | null>(null);
  const [summaries, setSummaries] = useState<Record<string, string>>({});
  
  const hospital = localStorage.getItem('hospital_id') || '';
  const role = localStorage.getItem('role') || '';

  useEffect(() => {
    if (role === 'DOCTOR') {
      setLoading(true);
      apiClient.get(`/patients/?hospital_id=${hospital}&limit=20`)
        .then(res => setPatients(res.data.patients || []))
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [hospital, role]);

  const handleSummarize = async (patientId: string) => {
    setSummarizingId(patientId);
    try {
      const res = await apiClient.post(`/patients/${patientId}/summarize?hospital_id=${hospital}`);
      setSummaries(prev => ({ ...prev, [patientId]: res.data.summary }));
    } catch (err) {
      console.error(err);
      setSummaries(prev => ({ ...prev, [patientId]: "Failed to generate AI summary." }));
    } finally {
      setSummarizingId(null);
    }
  };

  const filteredPatients = patients.filter(p => p.id.includes(search) || p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={{ color: 'white', maxWidth: '1000px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '24px', marginBottom: '20px', fontWeight: 'bold' }}>Patient Records (EHR)</h2>
      
      <div style={{ backgroundColor: '#1F2937', padding: '20px', borderRadius: '8px', border: '1px solid #374151', marginBottom: '20px' }}>
        <div style={{ display: 'flex', gap: '15px' }}>
          <input 
            type="text" 
            placeholder="Search by Patient ID or Name..." 
            value={search} 
            onChange={(e) => setSearch(e.target.value)}
            style={{ flex: 1, padding: '12px', borderRadius: '4px', backgroundColor: '#374151', color: 'white', border: '1px solid #4B5563', boxSizing: 'border-box' }}
          />
        </div>
      </div>

      {loading ? (
        <p>Loading records...</p>
      ) : (
        <div style={{ display: 'grid', gap: '20px' }}>
          {filteredPatients.map(patient => (
            <div key={patient.id} style={{ backgroundColor: '#1F2937', padding: '25px', borderRadius: '8px', border: '1px solid #374151', animation: 'fadeIn 0.5s ease-in-out' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #374151', paddingBottom: '15px', marginBottom: '15px' }}>
                <div>
                  <h3 style={{ fontSize: '22px', margin: '0 0 5px 0' }}>{patient.name}</h3>
                  <p style={{ margin: 0, color: '#9CA3AF' }}>ID: {patient.id} &nbsp;|&nbsp; DOB: {patient.birthDate} &nbsp;|&nbsp; Gender: {patient.gender}</p>
                </div>
                <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'flex-end' }}>
                  <span style={{ backgroundColor: '#064E3B', color: '#34D399', padding: '6px 12px', borderRadius: '20px', fontSize: '13px', fontWeight: 'bold' }}>
                    🔓 Decrypted via ML-KEM
                  </span>
                  <button 
                    onClick={() => handleSummarize(patient.id)}
                    disabled={summarizingId === patient.id}
                    style={{ padding: '6px 12px', backgroundColor: '#8B5CF6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px' }}
                  >
                    {summarizingId === patient.id ? 'Analyzing...' : '✨ Summarize with AI Agent'}
                  </button>
                </div>
              </div>
              
              {summaries[patient.id] && (
                <div style={{ backgroundColor: '#111827', padding: '15px', borderRadius: '6px', borderLeft: '4px solid #8B5CF6', marginTop: '15px' }}>
                  <p style={{ margin: 0, whiteSpace: 'pre-line', color: '#D8B4FE', fontSize: '14px', lineHeight: '1.5' }}>
                    {summaries[patient.id]}
                  </p>
                </div>
              )}
            </div>
          ))}
          {filteredPatients.length === 0 && <p style={{ color: '#9CA3AF' }}>No patients found.</p>}
        </div>
      )}
    </div>
  );
};

export default PatientRecord;
