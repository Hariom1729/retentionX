import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import { 
  Zap, Shield, Cpu, Gauge,
  Package, CheckCircle, Brain, RefreshCw
} from 'lucide-react';

const api = axios.create({ baseURL: 'http://127.0.0.1:8000/api' });

const Predictor = () => {
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState({ volt: 170.0, rotate: 450.0, pressure: 100.0, vibration: 40.0 });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [showMission, setShowMission] = useState(false);
  const [dispatching, setDispatching] = useState(false);

  useEffect(() => {
    const id = searchParams.get('id');
    if (id) {
       const fetchAndPredict = async () => {
          setLoading(true);
          try {
             const telRes = await api.get(`/telemetry/${id}`).catch(() => ({ data: [] }));
             if (telRes.data && telRes.data.length > 0) {
                const latest = telRes.data[telRes.data.length - 1];
                const cleanData = { volt: latest.volt, rotate: latest.rotate, pressure: latest.pressure, vibration: latest.vibration };
                setFormData(cleanData);
                const predRes = await api.post('/predict', cleanData);
                setResult(predRes.data);
             }
          } catch (e) { console.error(e); }
          finally { setLoading(false); }
       };
       fetchAndPredict();
    }
  }, [searchParams]);

  const handlePredict = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    setResult(null);
    setShowMission(false);
    try {
      await new Promise(r => setTimeout(r, 1000));
      const res = await api.post('/predict', formData);
      setResult(res.data);
    } catch (err) { console.error(err); } finally { setLoading(false); }
  };

  return (
    <div style={{ width: '100%' }}>
      <header style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '900', letterSpacing: '-0.04em' }}>AI Neural Predictor</h1>
        <p style={{ color: '#64748b', fontWeight: '700' }}>Predictive Maintenance Mission Control</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '2rem' }}>
        
        {/* LEFT PANEL */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {!showMission && (
            <div style={whiteCard}>
              <div style={cardHeader}>
                <div style={iconBox}><Gauge size={20} color="#10b981" /></div>
                <h3 style={{ fontWeight: '900' }}>Machine Telemetry</h3>
              </div>
              <form onSubmit={handlePredict} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {Object.keys(formData).map(key => (
                  <div key={key}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.7rem', fontWeight: '800' }}>
                      <label>{key.toUpperCase()}</label>
                      <span style={{ color: '#10b981' }}>{formData[key]}</span>
                    </div>
                    <input type="range" min={key === 'rotate' ? 200 : 0} max={key === 'rotate' ? 800 : 250} step="0.1" style={{ width: '100%' }} value={formData[key]} onChange={(e) => setFormData({...formData, [key]: parseFloat(e.target.value)})} />
                  </div>
                ))}
                <button type="submit" style={greenBtn} disabled={loading}>{loading ? 'SCANNING...' : 'START NEURAL SCAN'}</button>
              </form>
            </div>
          )}

          {loading && (
            <div style={{ ...whiteCard, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '400px' }}>
              <div className="cyber-pulse">
                <RefreshCw size={48} className="spin-icon" color="#10b981" />
              </div>
              <h3 style={{ fontWeight: '1000', marginTop: '2.56rem', color: '#10b981', letterSpacing: '0.1em' }}>NEURAL SCANNING...</h3>
              <p style={{ color: '#64748b', fontSize: '0.75rem', fontWeight: '700' }}>AI INFERENCE ENGINE ACTIVE</p>
              
              <style>{`
                @keyframes cyber-glow {
                  0% { box-shadow: 0 0 0px #10b981; transform: scale(1); }
                  50% { box-shadow: 0 0 30px #10b98155; transform: scale(1.05); }
                  100% { box-shadow: 0 0 0px #10b981; transform: scale(1); }
                }
                @keyframes fast-spin {
                  from { transform: rotate(0deg); }
                  to { transform: rotate(360deg); }
                }
                .cyber-pulse {
                  width: 100px; height: 100px; border-radius: 50%; 
                  display: flex; alignItems: center; justifyContent: center;
                  background: #f0fdf4; border: 2px solid #10b981;
                  animation: cyber-glow 1.5s infinite ease-in-out;
                }
                .spin-icon { animation: fast-spin 1.2s infinite linear; }
              `}</style>
            </div>
          )}

          {result && !loading && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={adviceCard(result.status)}>
                <Shield size={22} color={result.status === 'DANGER' ? '#f43f5e' : '#10b981'} />
                <p style={{ fontWeight: '700', fontSize: '0.9rem' }}>{result.expert_advice}</p>
              </div>
              <button 
                onClick={() => setShowMission(true)}
                style={{ ...greenBtn, background: '#0f172a' }}
              >
                <Cpu size={18} /> GENERATE REPAIR MISSION
              </button>
            </div>
          )}

          {showMission && (
            <div style={{ ...whiteCard, border: '2px solid #0f172a' }}>
              <div style={{ ...cardHeader, background: '#f8fafc', padding: '1rem 2rem', borderBottom: '1px solid #e2e8f0', marginLeft: '-2rem', marginRight: '-2rem', marginTop: '-2rem', marginBottom: '2rem' }}>
                 <span style={{ background: '#0f172a', color: '#fff', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.6rem', fontWeight: '900' }}>MISSION ACTIVE</span>
                 <button onClick={() => setShowMission(false)} style={{ marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}>CLOSE</button>
              </div>
              
              <h2 style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: '900', marginBottom: '1.5rem', letterSpacing: '0.1em' }}>DIGITAL WORK ORDER</h2>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
                 <div><label style={woLabel}>ASSET NODE</label><p style={woVal}>{searchParams.get('id') || 'STANDBY-NODE'}</p></div>
                 <div><label style={woLabel}>PART REQUIRED</label><p style={woVal}>{result?.inventory_status?.part_name || 'Standard Kit'}</p></div>
              </div>

              <div style={{ marginBottom: '2rem' }}>
                 <p style={woLabel}>STEP-BY-STEP REPAIR</p>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', fontWeight: '700', marginTop: '0.5rem' }}>
                    <CheckCircle size={14} color="#10b981" /> <span>Inspect internal housing</span>
                 </div>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', fontWeight: '700', marginTop: '0.5rem' }}>
                    <CheckCircle size={14} color="#10b981" /> <span>Test {result?.explanations?.[0]?.name || 'System'} Sync</span>
                 </div>
              </div>

              <div style={{ borderTop: '1px dashed #e2e8f0', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                 <div><p style={woLabel}>ESTIMATED SAVINGS</p><p style={{ fontWeight: '900', color: '#10b981' }}>{result?.impact_metrics?.savings_usd || '$8,500'}</p></div>
                 <button 
                    style={dispatching ? { ...greenBtn, opacity: 0.5 } : greenBtn} 
                    onClick={async () => { 
                       setDispatching(true); 
                       try {
                          await api.post('/dispatch', {
                             id: searchParams.get('id') || 'UNASSIGNED',
                             task: `Repair: ${result?.inventory_status?.part_name || 'Standard Unit'} Replacement`,
                             date: new Date().toLocaleString(),
                             part: result?.inventory_status?.part_name || 'Generic Kit',
                             advice: result?.expert_advice || 'Inspect and calibrate.',
                             savings: result?.impact_metrics?.savings_usd || '$4,500'
                          });
                          setTimeout(() => { setShowMission(false); setDispatching(false); }, 1000); 
                       } catch (e) {
                          console.error(e);
                          setDispatching(false);
                       }
                    }}
                 >
                    {dispatching ? 'DISPATCHING...' : 'CONFIRM DISPATCH'}
                 </button>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT PANEL */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div style={{ ...whiteCard, minHeight: '380px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
            {loading ? (
              <p style={{ fontWeight: '900', color: '#10b981' }}>ANALYZING...</p>
            ) : result ? (
              <>
                <span style={{ fontSize: '0.7rem', fontWeight: '900', color: '#94a3b8' }}>FAILURE PROBABILITY</span>
                <h3 style={{ fontSize: '4.5rem', fontWeight: '1000', color: (result?.failure_probability || 0) > 0.4 ? '#f43f5e' : '#10b981' }}>
                  {((result?.failure_probability || 0) * 100).toFixed(1)}%
                </h3>
                <div style={{ padding: '0.5rem 1.5rem', borderRadius: '50px', background: (result?.failure_probability || 0) > 0.4 ? '#fef2f2' : '#f0fdf4', color: (result?.failure_probability || 0) > 0.4 ? '#f43f5e' : '#10b981', fontWeight: '900', fontSize: '0.7rem' }}>
                  {result?.status || 'STABLE'}
                </div>
              </>
            ) : (
              <Brain size={48} color="#e2e8f0" />
            )}
          </div>

          {result && !loading && (
            <div style={whiteCard}>
              <h4 style={{ fontSize: '0.7rem', fontWeight: '900', marginBottom: '1.5rem', color: '#94a3b8' }}>AI EXPLANATIONS</h4>
              {result.explanations?.map(exp => (
                <div key={exp.name} style={{ marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', fontWeight: '900', marginBottom: '0.3rem' }}><span>{exp.name}</span><span>{exp.val}%</span></div>
                  <div style={{ height: '6px', background: '#f1f5f9', borderRadius: '10px' }}><div style={{ height: '100%', background: '#10b981', borderRadius: '10px', width: `${exp.val}%` }} /></div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const whiteCard = { padding: '2rem', background: '#fff', borderRadius: '1.5rem', border: '1px solid #f1f5f9', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' };
const cardHeader = { display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' };
const iconBox = { width: '40px', height: '40px', background: '#f0fdf4', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' };
const greenBtn = { padding: '1rem', background: '#10b981', color: '#fff', border: 'none', borderRadius: '0.75rem', fontWeight: '900', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center' };
const adviceCard = (status) => ({ display: 'flex', gap: '1rem', padding: '1.5rem', borderRadius: '1.25rem', background: status === 'DANGER' ? '#fef2f2' : '#f0fdf4', border: `1px solid ${status === 'DANGER' ? '#fee2e2' : '#dcfce7'}` });
const woLabel = { fontSize: '0.6rem', color: '#94a3b8', fontWeight: '800' };
const woVal = { fontSize: '1rem', fontWeight: '900', marginTop: '0.2rem' };

export default Predictor;
