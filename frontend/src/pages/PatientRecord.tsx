import React, { useState } from 'react';

const PatientRecord = () => {
  const [search, setSearch] = useState('');
  const [patient, setPatient] = useState<any>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate fetching decrypted FHIR data
    setPatient({
      id: search || 'patient-A-001',
      name: 'John Smith',
      dob: '1980-01-01',
      resources: [
        { id: 'obs-1', type: 'Observation', detail: 'Blood Pressure: 120/80 mmHg' },
        { id: 'med-1', type: 'MedicationRequest', detail: 'Lisinopril 10mg daily' }
      ]
    });
  };

  return (
    <div style={{ color: 'white', maxWidth: '1000px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '24px', marginBottom: '20px', fontWeight: 'bold' }}>Patient Records (EHR)</h2>
      
      <div style={{ backgroundColor: '#1F2937', padding: '20px', borderRadius: '8px', border: '1px solid #374151', marginBottom: '20px' }}>
        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '15px' }}>
          <input 
            type="text" 
            placeholder="Search by Patient ID..." 
            value={search} 
            onChange={(e) => setSearch(e.target.value)}
            style={{ flex: 1, padding: '12px', borderRadius: '4px', backgroundColor: '#374151', color: 'white', border: '1px solid #4B5563', boxSizing: 'border-box' }}
          />
          <button type="submit" style={{ padding: '12px 25px', backgroundColor: '#10B981', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
            Lookup FHIR Record
          </button>
        </form>
      </div>

      {patient && (
        <div style={{ backgroundColor: '#1F2937', padding: '25px', borderRadius: '8px', border: '1px solid #374151', animation: 'fadeIn 0.5s ease-in-out' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #374151', paddingBottom: '20px', marginBottom: '20px' }}>
            <div>
              <h3 style={{ fontSize: '22px', margin: '0 0 5px 0' }}>{patient.name}</h3>
              <p style={{ margin: 0, color: '#9CA3AF' }}>ID: {patient.id} &nbsp;|&nbsp; DOB: {patient.dob}</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ backgroundColor: '#064E3B', color: '#34D399', padding: '6px 12px', borderRadius: '20px', fontSize: '13px', fontWeight: 'bold' }}>
                🛡️ Decrypted via ML-KEM
              </span>
            </div>
          </div>

          <h4 style={{ marginBottom: '15px', color: '#E5E7EB', fontSize: '18px' }}>Clinical Resources</h4>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {patient.resources.map((r: any) => (
              <div key={r.id} style={{ backgroundColor: '#111827', padding: '15px', borderRadius: '6px', borderLeft: '4px solid #3B82F6' }}>
                <strong style={{ color: '#60A5FA', marginRight: '10px' }}>[{r.type}]</strong> 
                <span>{r.detail}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientRecord;
