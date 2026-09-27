import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Login } from './pages/Login';
import { PatientRecord } from './pages/PatientRecord';
import { ExchangeCenter } from './pages/ExchangeCenter';
import { SecurityCenter } from './pages/SecurityCenter';
import { AuditCenter } from './pages/AuditCenter';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="patients/:id" element={<PatientRecord />} />
          <Route path="exchange" element={<ExchangeCenter />} />
          <Route path="security" element={<SecurityCenter />} />
          <Route path="audit" element={<AuditCenter />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
