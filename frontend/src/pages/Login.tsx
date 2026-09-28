import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [hospital, setHospital] = useState('hospital-A');
  const [role, setRole] = useState('DOCTOR');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login for now
    console.log('Logging in...', { hospital, role, username });
    localStorage.setItem('token', 'simulated_jwt_token');
    navigate('/');
  };

  return (
    <div style={{
      backgroundColor: '#111827', minHeight: '100vh', display: 'flex', 
      alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif'
    }}>
      <div style={{ 
        backgroundColor: '#1F2937', padding: '40px', borderRadius: '8px', 
        width: '100%', maxWidth: '400px', border: '1px solid #374151', color: 'white'
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#10B981' }}>
          AEGISZ-Health
        </h2>
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>Hospital</label>
            <select 
              value={hospital} 
              onChange={(e) => setHospital(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '4px', backgroundColor: '#374151', color: 'white', border: 'none' }}
            >
              <option value="hospital-A">Metro General Hospital (A)</option>
              <option value="hospital-B">City Medical Center (B)</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>Role</label>
            <select 
              value={role} 
              onChange={(e) => setRole(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '4px', backgroundColor: '#374151', color: 'white', border: 'none' }}
            >
              <option value="DOCTOR">Doctor</option>
              <option value="HOSPITAL_ADMIN">Hospital Admin</option>
              <option value="AUDITOR">Auditor</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>Username</label>
            <input 
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{ width: '100%', padding: '10px', borderRadius: '4px', backgroundColor: '#374151', color: 'white', border: 'none', boxSizing: 'border-box' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: '100%', padding: '10px', borderRadius: '4px', backgroundColor: '#374151', color: 'white', border: 'none', boxSizing: 'border-box' }}
            />
          </div>

          <button 
            type="submit" 
            style={{ 
              marginTop: '10px', padding: '12px', backgroundColor: '#10B981', 
              color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' 
            }}
          >
            Secure Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
