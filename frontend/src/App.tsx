import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';

// Placeholder components for other pages
const Dashboard = () => <div style={{ color: 'white', padding: '20px' }}><h2>Dashboard (WIP)</h2></div>;
const PatientRecord = () => <div style={{ color: 'white', padding: '20px' }}><h2>Patient Record (WIP)</h2></div>;
const ExchangeCenter = () => <div style={{ color: 'white', padding: '20px' }}><h2>Exchange Center (WIP)</h2></div>;
const SecurityCenter = () => <div style={{ color: 'white', padding: '20px' }}><h2>Security Center (WIP)</h2></div>;
const AuditCenter = () => <div style={{ color: 'white', padding: '20px' }}><h2>Audit Center (WIP)</h2></div>;

// Very simple Layout wrapper
const Layout = ({ children }: { children: React.ReactNode }) => (
  <div style={{ backgroundColor: '#111827', minHeight: '100vh', fontFamily: 'sans-serif' }}>
    <header style={{ backgroundColor: '#1F2937', padding: '15px 20px', color: 'white', borderBottom: '1px solid #374151' }}>
      <h1>AEGISZ-Health Portal</h1>
    </header>
    <main>
      {children}
    </main>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        {/* Protected routes wrapped in Layout */}
        <Route path="/" element={<Layout><Dashboard /></Layout>} />
        <Route path="/patients/:id" element={<Layout><PatientRecord /></Layout>} />
        <Route path="/exchange" element={<Layout><ExchangeCenter /></Layout>} />
        <Route path="/security" element={<Layout><SecurityCenter /></Layout>} />
        <Route path="/audit" element={<Layout><AuditCenter /></Layout>} />
        
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
