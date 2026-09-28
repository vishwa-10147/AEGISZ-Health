import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import SecurityCenter from './pages/SecurityCenter';
import AuditCenter from './pages/AuditCenter';
import ExchangeCenter from './pages/ExchangeCenter';
import PatientRecord from './pages/PatientRecord';

const NavLink = ({ to, children }: { to: string, children: React.ReactNode }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <Link to={to} style={{
      display: 'block', padding: '10px 15px', color: isActive ? '#10B981' : '#D1D5DB',
      textDecoration: 'none', backgroundColor: isActive ? '#374151' : 'transparent',
      borderRadius: '6px', marginBottom: '5px'
    }}>
      {children}
    </Link>
  );
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };
  
  return (
    <div style={{ display: 'flex', backgroundColor: '#111827', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <aside style={{ width: '250px', backgroundColor: '#1F2937', padding: '20px', borderRight: '1px solid #374151', position: 'relative' }}>
        <h1 style={{ color: '#10B981', fontSize: '20px', marginBottom: '30px' }}>AEGISZ-Health</h1>
        <nav>
          <NavLink to="/">Dashboard</NavLink>
          <NavLink to="/patients">Patient Records</NavLink>
          <NavLink to="/exchange">Exchange Center</NavLink>
          <NavLink to="/security">Security Center</NavLink>
          <NavLink to="/audit">Audit Ledger</NavLink>
        </nav>
        <button onClick={handleLogout} style={{
          position: 'absolute', bottom: '20px', padding: '10px 15px',
          backgroundColor: 'transparent', color: '#EF4444', border: '1px solid #EF4444',
          borderRadius: '6px', cursor: 'pointer', width: 'calc(100% - 40px)'
        }}>Logout</button>
      </aside>
      <main style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
        {children}
      </main>
    </div>
  );
};

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem('token');
  if (!token) return <Navigate to="/login" replace />;
  return <Layout>{children}</Layout>;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/patients" element={<ProtectedRoute><PatientRecord /></ProtectedRoute>} />
        <Route path="/exchange" element={<ProtectedRoute><ExchangeCenter /></ProtectedRoute>} />
        <Route path="/security" element={<ProtectedRoute><SecurityCenter /></ProtectedRoute>} />
        <Route path="/audit" element={<ProtectedRoute><AuditCenter /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
