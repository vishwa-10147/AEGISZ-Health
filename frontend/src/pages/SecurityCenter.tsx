import React, { useEffect, useState } from 'react';
import apiClient from '../api/client';

const SecurityCenter = () => {
  const [quote, setQuote] = useState<any>(null);

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const res = await apiClient.get('/attestation/quote');
        setQuote(res.data);
      } catch (e) {
        console.error(e);
      }
    };
    fetchQuote();
  }, []);

  return (
    <div style={{ padding: '30px', color: 'white', maxWidth: '1000px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '24px', marginBottom: '20px', fontWeight: 'bold' }}>Hardware Security Center</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div style={{ backgroundColor: '#1F2937', padding: '20px', borderRadius: '8px', border: '1px solid #374151' }}>
          <h3 style={{ borderBottom: '1px solid #374151', paddingBottom: '10px', marginBottom: '15px' }}>Confidential Computing</h3>
          <p style={{ margin: '5px 0' }}>Status: <span style={{ color: '#10B981', fontWeight: 'bold' }}>ACTIVE</span></p>
          <p style={{ margin: '5px 0' }}>Mode: Simulated Secure Enclave</p>
          <p style={{ margin: '5px 0' }}>Target Environment: IBM LinuxONE Secure Execution</p>
        </div>

        <div style={{ backgroundColor: '#1F2937', padding: '20px', borderRadius: '8px', border: '1px solid #374151' }}>
          <h3 style={{ borderBottom: '1px solid #374151', paddingBottom: '10px', marginBottom: '15px' }}>Hardware Attestation Quote</h3>
          {quote ? (
            <div>
              <p style={{ margin: '5px 0' }}><strong>Quote ID:</strong> <span style={{fontFamily: 'monospace'}}>{quote.quote.quote_id}</span></p>
              <p style={{ margin: '5px 0' }}><strong>Measurement:</strong> <br/><span style={{fontFamily: 'monospace', fontSize: '11px', color: '#9CA3AF'}}>{quote.quote.measurement}</span></p>
              <p style={{ margin: '5px 0', marginTop: '10px' }}><strong>Hardware Signature:</strong> <br/><span style={{fontFamily: 'monospace', fontSize: '11px', color: '#60A5FA'}}>{quote.signature.substring(0, 48)}...</span></p>
              
              <button style={{ 
                marginTop: '15px', padding: '8px 12px', backgroundColor: '#374151', 
                color: 'white', border: '1px solid #4B5563', borderRadius: '4px', cursor: 'pointer' 
              }}>
                Verify Hardware Signature
              </button>
            </div>
          ) : (
            <p>Loading hardware quote...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SecurityCenter;
