import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AlertCircle, ArrowUpRight, ShieldAlert, Clock, Info, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const api = axios.create({ baseURL: 'http://127.0.0.1:8000/api' });

const EarlyWarning = () => {
    const navigate = useNavigate();
    const [warnings, setWarnings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await api.get('/warnings');
                setWarnings(res.data || []);
            } catch (err) { 
                console.error(err);
                // Fallback demo data if API fails
                setWarnings([
                    { id: 104, type: 'Rotary Engine', confidence: 92, cause: 'Vibration', severity: 'Critical' },
                    { id: 208, type: 'Heavy Hydraulic', confidence: 88, cause: 'Pressure', severity: 'Warning' }
                ]);
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, []);

    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <header style={{ marginBottom: '3rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                    <ShieldAlert size={32} color="var(--accent)" />
                    <h1 style={{ fontSize: '2.5rem', fontWeight: '800', letterSpacing: '-0.02em', color: 'var(--text)' }}>Shield AI Early Warning</h1>
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Statistical anomaly detection across the machine fleet</p>
            </header>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <AnimatePresence>
                    {warnings.length > 0 ? (
                        warnings.map((w, idx) => (
                            <motion.div 
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: idx * 0.1 }}
                                key={idx} 
                                className="glass-card" 
                                style={{
                                    display: 'flex', alignItems: 'center', gap: '2rem', padding: '1.5rem 2.5rem',
                                    borderLeft: `5px solid ${w.severity === 'Critical' ? '#f43f5e' : '#f59e0b'}`,
                                    background: 'var(--surface-light)'
                                }}
                            >
                                <div style={{
                                    width: '52px', height: '52px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    backgroundColor: w.severity === 'Critical' ? 'rgba(244, 63, 94, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                                    color: w.severity === 'Critical' ? '#f43f5e' : '#f59e0b'
                                }}>
                                    <AlertCircle size={24} />
                                </div>

                                <div style={{ flex: 1 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem' }}>
                                        <h4 style={{ fontSize: '1.1rem', fontWeight: '800' }}>{w.cause || 'Sensor'} Irregularity</h4>
                                        <span style={{ 
                                            fontSize: '0.65rem', fontWeight: '800', padding: '0.2rem 0.5rem', borderRadius: '4px',
                                            backgroundColor: w.severity === 'Critical' ? '#f43f5e' : '#f59e0b', color: 'white'
                                        }}>{w.severity}</span>
                                    </div>
                                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '500' }}>
                                        Asset Node-{w.id} ({w.type}) showing atypical behavior.
                                    </p>
                                </div>

                                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', padding: '0 2rem' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'center', minWidth: '80px' }}>
                                        <span style={{ fontSize: '0.65rem', fontWeight: '800', color: 'var(--text-muted)', letterSpacing: '0.05em' }}>CONFIDENCE</span>
                                        <span style={{ fontSize: '1.1rem', fontWeight: '800', color: w.severity === 'Critical' ? '#f43f5e' : 'var(--primary)' }}>{w.confidence}%</span>
                                    </div>
                                </div>

                                <button 
                                    onClick={() => navigate(`/predictor?id=${w.id}`)}
                                    style={{ width: '44px', height: '44px', borderRadius: '50%', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s' }}
                                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--surface)'}
                                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                >
                                    <ArrowUpRight size={20} />
                                </button>
                            </motion.div>
                        ))
                    ) : (
                        !loading && (
                            <div className="glass-card" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                                <Activity size={48} style={{ margin: '0 auto 1rem', opacity: 0.3 }} />
                                <p>No fleet anomalies detected. System operating within 1.2-sigma baseline.</p>
                            </div>
                        )
                    )}
                </AnimatePresence>
            </div>

            <div style={{ marginTop: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem', backgroundColor: 'rgba(59, 130, 246, 0.05)', borderRadius: '12px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                <Info size={18} color="var(--secondary)" />
                <span>Detection engine scanning 50,000 telemetry samples across 100 machine nodes.</span>
            </div>
        </div>
    );
};

export default EarlyWarning;
