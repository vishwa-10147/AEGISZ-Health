import React, { useState, useEffect } from 'react';
import apiClient from '../api/client';

const PatientRecord = () => {
  const [search, setSearch] = useState('');
  const [patients, setPatients] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
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
                <div style={{ textAlign: 'right' }}>
                  <span style={{ backgroundColor: '#064E3B', color: '#34D399', padding: '6px 12px', borderRadius: '20px', fontSize: '13px', fontWeight: 'bold' }}>
                    🔓 Decrypted via ML-KEM
                  </span>
                </div>
              </div>
            </div>
          ))}
          {filteredPatients.length === 0 && <p style={{ color: '#9CA3AF' }}>No patients found.</p>}
        </div>
      )}
    </div>
  );
};

export default PatientRecord;
