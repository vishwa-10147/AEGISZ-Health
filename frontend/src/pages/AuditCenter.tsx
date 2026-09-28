import React, { useEffect, useState } from 'react';
import apiClient from '../api/client';

const AuditCenter = () => {
  const [events, setEvents] = useState([]);
  const [verification, setVerification] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eventsRes, verifyRes] = await Promise.all([
          apiClient.get('/audit/events'),
          apiClient.get('/audit/verify')
        ]);
        setEvents(eventsRes.data);
        setVerification(verifyRes.data);
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, []);

  return (
    <div style={{ padding: '30px', color: 'white', maxWidth: '1200px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '24px', marginBottom: '20px', fontWeight: 'bold' }}>Tamper-Evident Audit Center</h2>
      
      {verification && (
        <div style={{ 
          backgroundColor: verification.status === 'VALID' ? '#064E3B' : '#7F1D1D', 
          padding: '15px', borderRadius: '8px', marginBottom: '20px', border: '1px solid #374151'
        }}>
          <h3 style={{ margin: '0 0 5px 0' }}>Chain Status: {verification.status === 'VALID' ? '✅ INTACT' : '🔴 TAMPER DETECTED'}</h3>
          <p style={{ margin: 0 }}>{verification.message} (Events verified: {verification.events_checked})</p>
        </div>
      )}

      <div style={{ backgroundColor: '#1F2937', borderRadius: '8px', overflow: 'hidden', border: '1px solid #374151' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead style={{ backgroundColor: '#111827', borderBottom: '1px solid #374151' }}>
            <tr>
              <th style={{ padding: '12px 15px' }}>Timestamp</th>
              <th style={{ padding: '12px 15px' }}>Actor</th>
              <th style={{ padding: '12px 15px' }}>Action</th>
              <th style={{ padding: '12px 15px' }}>Decision</th>
              <th style={{ padding: '12px 15px' }}>Severity</th>
            </tr>
          </thead>
          <tbody>
            {events.map((e: any) => (
              <tr key={e.id} style={{ borderBottom: '1px solid #374151' }}>
                <td style={{ padding: '12px 15px', color: '#9CA3AF' }}>{new Date(e.timestamp).toLocaleString()}</td>
                <td style={{ padding: '12px 15px' }}>{e.actor_id} <span style={{fontSize:'12px', color: '#6B7280'}}>({e.hospital_id})</span></td>
                <td style={{ padding: '12px 15px' }}>{e.action}</td>
                <td style={{ padding: '12px 15px' }}>
                  <span style={{ color: e.decision === 'ALLOW' ? '#10B981' : '#EF4444' }}>{e.decision}</span>
                </td>
                <td style={{ padding: '12px 15px' }}>
                  <span style={{ 
                    padding: '3px 8px', borderRadius: '12px', fontSize: '12px',
                    backgroundColor: e.severity === 'INFO' ? '#1E3A8A' : e.severity === 'HIGH' ? '#991B1B' : '#374151'
                  }}>
                    {e.severity}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {events.length === 0 && <p style={{ padding: '20px', textAlign: 'center', color: '#9CA3AF' }}>No audit events found.</p>}
      </div>
    </div>
  );
};

export default AuditCenter;
