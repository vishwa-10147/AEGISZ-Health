import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';

export function Layout() {
  const navigate = useNavigate();
  return (
    <div style={{ display: 'flex', height: '100vh', flexDirection: 'column' }}>
      <header style={{ padding: '1rem', background: '#1e293b', borderBottom: '1px solid #334155', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ margin: 0, fontSize: '1.5rem', color: '#38bdf8' }}>AEGISZ-Health</h1>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <span style={{ padding: '0.25rem 0.5rem', background: '#059669', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold' }}>PQC ACTIVE</span>
          <span style={{ padding: '0.25rem 0.5rem', background: '#0284c7', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold' }}>SECURE ENCLAVE</span>
          <button onClick={() => navigate('/login')} style={{ background: 'transparent', color: '#94a3b8', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>Logout</button>
        </div>
      </header>
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <nav style={{ width: '250px', background: '#0f172a', padding: '1rem', borderRight: '1px solid #334155', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Link to="/" style={{ color: '#cbd5e1', textDecoration: 'none', padding: '0.5rem', borderRadius: '4px', display: 'block' }}>Dashboard</Link>
          <Link to="/exchange" style={{ color: '#cbd5e1', textDecoration: 'none', padding: '0.5rem', borderRadius: '4px', display: 'block' }}>Exchange Center</Link>
          <Link to="/security" style={{ color: '#cbd5e1', textDecoration: 'none', padding: '0.5rem', borderRadius: '4px', display: 'block' }}>Security Center</Link>
          <Link to="/audit" style={{ color: '#cbd5e1', textDecoration: 'none', padding: '0.5rem', borderRadius: '4px', display: 'block' }}>Audit Center</Link>
        </nav>
        <main style={{ flex: 1, padding: '2rem', overflowY: 'auto', background: '#020617' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
