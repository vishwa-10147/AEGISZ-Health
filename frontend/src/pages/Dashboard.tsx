import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const role = localStorage.getItem('role') || 'Unknown';
  const hospital = localStorage.getItem('hospital_id') || 'Global';

  return (
    <div style={{ padding: '30px', color: 'white', maxWidth: '1000px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '24px', marginBottom: '20px', fontWeight: 'bold' }}>Doctor Dashboard</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginTop: '20px' }}>
        <div style={{ backgroundColor: '#1F2937', padding: '20px', borderRadius: '8px', border: '1px solid #374151' }}>
          <h3 style={{ borderBottom: '1px solid #374151', paddingBottom: '10px', marginBottom: '15px' }}>Identity Profile</h3>
          <p style={{ margin: '5px 0' }}><strong>Role:</strong> {role}</p>
          <p style={{ margin: '5px 0' }}><strong>Location:</strong> {hospital}</p>
          <p style={{ color: '#10B981', marginTop: '15px', fontWeight: 'bold' }}>🟢 Verified Session</p>
        </div>
        
        <div style={{ backgroundColor: '#1F2937', padding: '20px', borderRadius: '8px', border: '1px solid #374151' }}>
          <h3 style={{ borderBottom: '1px solid #374151', paddingBottom: '10px', marginBottom: '15px' }}>Federated Exchange</h3>
          <p style={{ margin: '5px 0' }}>Pending Incoming: <strong>0</strong></p>
          <p style={{ margin: '5px 0' }}>Active Outgoing: <strong>0</strong></p>
          <Link to="/exchange" style={{ display: 'inline-block', marginTop: '15px', color: '#60A5FA', textDecoration: 'none' }}>
            Go to Exchange Center →
          </Link>
        </div>

        <div style={{ backgroundColor: '#1F2937', padding: '20px', borderRadius: '8px', border: '1px solid #374151' }}>
          <h3 style={{ borderBottom: '1px solid #374151', paddingBottom: '10px', marginBottom: '15px' }}>Security Metrics</h3>
          <p style={{ margin: '5px 0' }}>Quantum-Safe Mode: <span style={{ color: '#F59E0B' }}>Preparing Phase 5</span></p>
          <p style={{ margin: '5px 0' }}>Audit Engine: <span style={{ color: '#10B981' }}>Active</span></p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
