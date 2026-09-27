import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export function Login() {
  const [hospital, setHospital] = useState('');
  const [role, setRole] = useState('Doctor');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login(username, password);
    navigate('/');
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#020617' }}>
      <form onSubmit={handleLogin} style={{ background: '#1e293b', padding: '2.5rem', borderRadius: '8px', width: '400px', display: 'flex', flexDirection: 'column', gap: '1.25rem', border: '1px solid #334155', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}>
        <h2 style={{ textAlign: 'center', color: '#38bdf8', margin: '0 0 1rem 0', fontSize: '1.875rem' }}>AEGISZ-Health</h2>
        
        <select value={hospital} onChange={e => setHospital(e.target.value)} style={{ padding: '0.75rem', borderRadius: '4px', background: '#0f172a', color: 'white', border: '1px solid #334155', outline: 'none' }} required>
          <option value="">Select Hospital...</option>
          <option value="HospA">General Hospital</option>
          <option value="HospB">City Medical Center</option>
        </select>
        
        <select value={role} onChange={e => setRole(e.target.value)} style={{ padding: '0.75rem', borderRadius: '4px', background: '#0f172a', color: 'white', border: '1px solid #334155', outline: 'none' }}>
          <option value="Doctor">Doctor</option>
          <option value="Admin">Admin</option>
          <option value="Auditor">Auditor</option>
        </select>
        
        <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} style={{ padding: '0.75rem', borderRadius: '4px', background: '#0f172a', color: 'white', border: '1px solid #334155', outline: 'none' }} required />
        
        <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} style={{ padding: '0.75rem', borderRadius: '4px', background: '#0f172a', color: 'white', border: '1px solid #334155', outline: 'none' }} required />
        
        <button type="submit" style={{ padding: '0.875rem', borderRadius: '4px', background: '#0284c7', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem', marginTop: '0.5rem' }}>Secure Login</button>
      </form>
    </div>
  );
}
