import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../api/client';

const Login = () => {
  const [username, setUsername] = useState('doctor_a');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const formData = new URLSearchParams();
      formData.append('username', username);
      formData.append('password', password);
      
      const response = await apiClient.post('/token', formData, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      });
      
      localStorage.setItem('token', response.data.access_token);
      localStorage.setItem('role', response.data.role);
      localStorage.setItem('hospital_id', response.data.hospital_id || '');
      
      console.log('Login successful');
      navigate('/');
    } catch (err: any) {
      console.error(err);
      setError('Invalid username or password');
    }
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
        
        {error && <div style={{ color: '#EF4444', marginBottom: '15px', textAlign: 'center', backgroundColor: '#450a0a', padding: '10px', borderRadius: '4px' }}>{error}</div>}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
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

          <div style={{ fontSize: '12px', color: '#9CA3AF', marginTop: '10px' }}>
            Hint: Use <strong>doctor_a</strong>, <strong>doctor_b</strong>, or <strong>admin</strong> (password: password123)
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
