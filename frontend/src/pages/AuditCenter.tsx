import { useState, useEffect } from 'react';

const AuditCenter = () => {
  const [logs, setLogs] = useState([
    { id: '1', time: '18:22:45', action: 'EXCHANGE_APPROVED', hospital: 'hospital-F', hash: '8f3a9b...' },
    { id: '2', time: '18:24:12', action: 'ANOMALY_DETECTED', hospital: 'hospital-C', hash: 'e2c41f...', critical: true },
    { id: '3', time: '18:25:33', action: 'BREAK_GLASS_OVERRIDE', hospital: 'hospital-A', hash: 'da3eeb...', critical: true },
  ]);

  const [simulating, setSimulating] = useState(false);
  const [packetPosition, setPacketPosition] = useState(0);

  const triggerSimulation = () => {
    setSimulating(true);
    setPacketPosition(1); // Move to control
    setTimeout(() => setPacketPosition(2), 1500); // Move to Hosp A
    setTimeout(() => {
      setSimulating(false);
      setPacketPosition(0);
      setLogs(prev => [{ id: Date.now().toString(), time: new Date().toLocaleTimeString(), action: 'QUANTUM_PAYLOAD_DELIVERED', hospital: 'hospital-A', hash: 'c9f201...' }, ...prev]);
    }, 3000);
  };

  return (
    <div style={{ color: 'white', maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <h2 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '20px' }}>Global Security Ledger (Live)</h2>
      
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
            {logs.map((log) => (
              <div key={log.id} style={{ padding: '10px', backgroundColor: log.critical ? '#450a0a' : '#111827', borderLeft: `4px solid ${log.critical ? '#ef4444' : '#10b981'}`, borderRadius: '4px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#9CA3AF' }}>
                  <span>{log.time}</span>
                  <span>{log.hospital}</span>
                </div>
                <div style={{ fontWeight: 'bold', color: log.critical ? '#fca5a5' : 'white', margin: '5px 0' }}>{log.action}</div>
                <div style={{ fontSize: '12px', fontFamily: 'monospace', color: '#6B7280' }}>SHA256: {log.hash}</div>
              </div>
            ))}
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default AuditCenter;
