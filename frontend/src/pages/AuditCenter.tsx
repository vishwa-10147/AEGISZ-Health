import { useState, useEffect } from 'react';
import apiClient from '../api/client';

const AuditCenter = () => {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch real audit events
  const fetchLogs = () => {
    apiClient.get('/audit/events')
      .then(res => setLogs(res.data || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchLogs();
    // Auto-refresh every 5 seconds to show realtime updates
    const interval = setInterval(fetchLogs, 5000);
    return () => clearInterval(interval);
  }, []);

  const [simulating, setSimulating] = useState(false);
  const [packetPosition, setPacketPosition] = useState(0);

  const triggerSimulation = () => {
    setSimulating(true);
    setPacketPosition(1); // Move to control
    setTimeout(() => setPacketPosition(2), 1500); // Move to Hosp A
    setTimeout(() => {
      setSimulating(false);
      setPacketPosition(0);
      fetchLogs(); // refresh logs after simulation ends
    }, 3000);
  };

  return (
    <div style={{ color: 'white', maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ fontSize: '28px', fontWeight: 'bold', margin: 0 }}>Global Security Ledger (Live)</h2>
        <button onClick={fetchLogs} style={{ padding: '8px 15px', backgroundColor: '#374151', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Refresh Ledger
        </button>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '30px' }}>
        
        {/* Network Map Animation */}
        <div style={{ backgroundColor: '#111827', padding: '20px', borderRadius: '8px', border: '1px solid #374151', height: '400px', position: 'relative' }}>
          <h3 style={{ color: '#9CA3AF', marginBottom: '20px' }}>Federated Mesh Map</h3>
          
          <div style={{ position: 'relative', width: '100%', height: '300px' }}>
            {/* SVG Lines */}
            <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
              <line x1="20%" y1="20%" x2="50%" y2="50%" stroke="#374151" strokeWidth="2" strokeDasharray="5,5" />
              <line x1="80%" y1="20%" x2="50%" y2="50%" stroke="#374151" strokeWidth="2" strokeDasharray="5,5" />
              <line x1="20%" y1="80%" x2="50%" y2="50%" stroke="#374151" strokeWidth="2" strokeDasharray="5,5" />
              <line x1="80%" y1="80%" x2="50%" y2="50%" stroke={simulating ? '#3B82F6' : '#374151'} strokeWidth="2" strokeDasharray="5,5" />
            </svg>

            {/* Nodes */}
            <div style={{ position: 'absolute', top: '20%', left: '20%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
              <div style={{ width: '40px', height: '40px', backgroundColor: '#374151', borderRadius: '50%', margin: '0 auto' }}></div>
              <p style={{ fontSize: '12px', marginTop: '5px' }}>Hosp C</p>
            </div>
            
            <div style={{ position: 'absolute', top: '20%', left: '80%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
              <div style={{ width: '40px', height: '40px', backgroundColor: '#374151', borderRadius: '50%', margin: '0 auto' }}></div>
              <p style={{ fontSize: '12px', marginTop: '5px' }}>Hosp D</p>
            </div>

            <div style={{ position: 'absolute', top: '80%', left: '20%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
              <div style={{ width: '40px', height: '40px', backgroundColor: '#3B82F6', borderRadius: '50%', margin: '0 auto', boxShadow: '0 0 15px #3B82F6' }}></div>
              <p style={{ fontSize: '12px', marginTop: '5px' }}>Hosp A (Requester)</p>
            </div>

            <div style={{ position: 'absolute', top: '80%', left: '80%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
              <div style={{ width: '40px', height: '40px', backgroundColor: '#10B981', borderRadius: '50%', margin: '0 auto' }}></div>
              <p style={{ fontSize: '12px', marginTop: '5px' }}>Hosp F (Sender)</p>
            </div>

            {/* Control Node */}
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
              <div style={{ width: '60px', height: '60px', backgroundColor: '#4F46E5', borderRadius: '10px', margin: '0 auto', border: '2px solid #818CF8' }}></div>
              <p style={{ fontSize: '12px', marginTop: '5px', fontWeight: 'bold' }}>Control Ledger</p>
            </div>

            {/* Animated Packet */}
            {simulating && (
              <div style={{
                position: 'absolute',
                width: '15px', height: '15px',
                backgroundColor: '#FCD34D',
                borderRadius: '50%',
                boxShadow: '0 0 10px #FCD34D',
                top: packetPosition === 1 ? '50%' : (packetPosition === 2 ? '80%' : '80%'),
                left: packetPosition === 1 ? '50%' : (packetPosition === 2 ? '20%' : '80%'),
                transition: 'all 1.5s ease-in-out',
                transform: 'translate(-50%, -50%)'
              }}></div>
            )}
          </div>
          
          <button onClick={triggerSimulation} disabled={simulating} style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', padding: '10px 20px', backgroundColor: simulating ? '#374151' : '#F59E0B', color: 'black', fontWeight: 'bold', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            {simulating ? 'Processing...' : 'Simulate Quantum Transfer'}
          </button>
        </div>

        {/* Audit Log Table */}
        <div style={{ backgroundColor: '#1F2937', padding: '20px', borderRadius: '8px', border: '1px solid #374151', height: '400px', overflowY: 'auto' }}>
          <h3 style={{ color: '#9CA3AF', marginBottom: '20px' }}>Tamper-Evident Hash Chain</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {loading && <p style={{ color: '#9CA3AF' }}>Loading live ledger events...</p>}
            {!loading && logs.length === 0 && <p style={{ color: '#9CA3AF' }}>No events in ledger yet.</p>}
            {logs.map((log) => {
              const isCritical = log.severity === 'CRITICAL';
              const isHigh = log.severity === 'HIGH';
              const isWarning = log.severity === 'WARNING';
              const bg = isCritical ? '#450a0a' : isWarning ? '#422006' : '#111827';
              const border = isCritical ? '#ef4444' : isWarning ? '#f59e0b' : '#10b981';
              const textCol = isCritical ? '#fca5a5' : isWarning ? '#fcd34d' : 'white';
              
              return (
                <div key={log.id} style={{ padding: '10px', backgroundColor: bg, borderLeft: `4px solid ${border}`, borderRadius: '4px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#9CA3AF' }}>
                    <span>{new Date(log.timestamp).toLocaleTimeString()}</span>
                    <span>{log.hospital_id}</span>
                  </div>
                  <div style={{ fontWeight: 'bold', color: textCol, margin: '5px 0' }}>{log.action}</div>
                  <div style={{ fontSize: '12px', fontFamily: 'monospace', color: '#6B7280', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    SHA256: {log.hash}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default AuditCenter;
