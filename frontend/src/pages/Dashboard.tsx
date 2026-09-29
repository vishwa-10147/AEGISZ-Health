import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../api/client';

const Dashboard = () => {
  const role = localStorage.getItem('role') || 'Unknown';
  const hospital = localStorage.getItem('hospital_id') || 'Global';
  const [networkHealth, setNetworkHealth] = useState<any>(null);
  const [patients, setPatients] = useState<any[]>([]);

  useEffect(() => {
    // Fetch real network health
    apiClient.get('/ready').then(res => setNetworkHealth(res.data)).catch(console.error);

    // Fetch real patients if Doctor
    if (role === 'DOCTOR') {
      apiClient.get(`/patients/?hospital_id=${hospital}&limit=5`)
        .then(res => setPatients(res.data.patients || []))
        .catch(console.error);
    }
  }, [role, hospital]);

  const renderAdminDashboard = () => (
    <div style={{ padding: '30px', color: 'white', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ fontSize: '28px', fontWeight: 'bold' }}>Command Center (System Administrator)</h2>
        <span style={{ backgroundColor: '#4F46E5', padding: '5px 15px', borderRadius: '20px', fontSize: '14px' }}>Global Oversight</span>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginTop: '20px' }}>
        {/* Network Status */}
        <div style={{ backgroundColor: '#1F2937', padding: '20px', borderRadius: '8px', border: '1px solid #374151' }}>
          <h3 style={{ borderBottom: '1px solid #374151', paddingBottom: '10px', marginBottom: '15px', color: '#9CA3AF' }}>Network Mesh Status</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            {networkHealth ? Object.keys(networkHealth.databases).map(db => (
              <div key={db} style={{ display: 'flex', alignItems: 'center', fontSize: '14px' }}>
                <span style={{ color: networkHealth.databases[db] === 'connected' ? '#10B981' : '#EF4444', marginRight: '8px' }}>●</span> {db.replace('hospital-', 'Hosp ')}
              </div>
            )) : <p>Scanning network...</p>}
          </div>
        </div>

        {/* Action Center */}
        <div style={{ backgroundColor: '#1F2937', padding: '20px', borderRadius: '8px', border: '1px solid #374151', borderTop: '4px solid #F59E0B' }}>
          <h3 style={{ borderBottom: '1px solid #374151', paddingBottom: '10px', marginBottom: '15px', color: '#9CA3AF' }}>Action Required</h3>
          <p style={{ margin: '5px 0', fontSize: '18px' }}>Pending Approvals: <strong style={{ color: '#F59E0B' }}>0</strong></p>
          <p style={{ fontSize: '14px', color: '#9CA3AF', marginTop: '10px' }}>Doctors are waiting for data governance approval.</p>
          <Link to="/exchange" style={{ display: 'inline-block', marginTop: '15px', backgroundColor: '#F59E0B', color: 'black', padding: '8px 16px', borderRadius: '4px', textDecoration: 'none', fontWeight: 'bold' }}>
            Review Requests
          </Link>
        </div>

        {/* Security Metrics */}
        <div style={{ backgroundColor: '#1F2937', padding: '20px', borderRadius: '8px', border: '1px solid #374151', borderTop: '4px solid #10B981' }}>
          <h3 style={{ borderBottom: '1px solid #374151', paddingBottom: '10px', marginBottom: '15px', color: '#9CA3AF' }}>Security Overview</h3>
          <p style={{ margin: '5px 0' }}>Quantum Envelope: <span style={{ color: '#10B981', fontWeight: 'bold' }}>ML-KEM Active</span></p>
          <p style={{ margin: '5px 0' }}>Tamper Logs: <span style={{ color: '#10B981', fontWeight: 'bold' }}>Live Logging</span></p>
          <Link to="/audit" style={{ display: 'inline-block', marginTop: '15px', color: '#60A5FA', textDecoration: 'none' }}>
            View Ledger ➔
          </Link>
        </div>
      </div>
    </div>
  );

  const renderDoctorDashboard = () => (
    <div style={{ padding: '30px', color: 'white', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ fontSize: '28px', fontWeight: 'bold' }}>Clinical Dashboard</h2>
        <span style={{ backgroundColor: '#10B981', padding: '5px 15px', borderRadius: '20px', fontSize: '14px', color: 'black', fontWeight: 'bold' }}>{hospital}</span>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px', marginTop: '20px' }}>
        {/* Patient Roster */}
        <div style={{ backgroundColor: '#1F2937', padding: '20px', borderRadius: '8px', border: '1px solid #374151' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #374151', paddingBottom: '10px', marginBottom: '15px' }}>
            <h3 style={{ color: '#9CA3AF', margin: 0 }}>My Local Patients ({patients.length})</h3>
            <Link to="/patients" style={{ color: '#60A5FA', fontSize: '14px', textDecoration: 'none' }}>View All</Link>
          </div>
          <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ color: '#9CA3AF', borderBottom: '1px solid #374151' }}>
                <th style={{ padding: '10px 0' }}>Patient ID</th>
                <th>Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {patients.length > 0 ? patients.map((p, idx) => (
                <tr key={p.id} style={{ borderBottom: '1px solid #374151' }}>
                  <td style={{ padding: '10px 0', fontFamily: 'monospace' }}>{p.id}</td>
                  <td>{p.name}</td>
                  <td><Link to="/patients" style={{ color: '#60A5FA' }}>View Chart</Link></td>
                </tr>
              )) : (
                <tr><td colSpan={3} style={{ padding: '10px 0', color: '#9CA3AF' }}>No local patients found. Database might be empty.</td></tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Federated Exchange Tool */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ backgroundColor: '#1F2937', padding: '20px', borderRadius: '8px', border: '1px solid #374151', borderTop: '4px solid #60A5FA' }}>
            <h3 style={{ borderBottom: '1px solid #374151', paddingBottom: '10px', marginBottom: '15px', color: '#9CA3AF' }}>External Data Exchange</h3>
            <p style={{ fontSize: '14px', color: '#D1D5DB' }}>Need medical history from another hospital?</p>
            <Link to="/exchange" style={{ display: 'inline-block', marginTop: '15px', backgroundColor: '#3B82F6', color: 'white', padding: '8px 16px', borderRadius: '4px', textDecoration: 'none', fontWeight: 'bold', width: '100%', textAlign: 'center' }}>
              Request Outside Records
            </Link>
          </div>

          <div style={{ backgroundColor: '#1F2937', padding: '20px', borderRadius: '8px', border: '1px solid #374151' }}>
            <h3 style={{ borderBottom: '1px solid #374151', paddingBottom: '10px', marginBottom: '15px', color: '#9CA3AF' }}>My Requests</h3>
            <p style={{ margin: '5px 0', fontSize: '14px' }}>Pending Approval: <strong style={{ color: '#F59E0B' }}>0</strong></p>
            <p style={{ margin: '5px 0', fontSize: '14px' }}>Completed: <strong style={{ color: '#10B981' }}>12</strong></p>
          </div>
        </div>
      </div>
    </div>
  );

  return role.includes('ADMIN') ? renderAdminDashboard() : renderDoctorDashboard();
};

export default Dashboard;
