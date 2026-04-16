import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ShieldAlert, Zap, Thermometer, Settings, Activity, Gauge, Box, LayoutGrid } from 'lucide-react';
import { motion } from 'framer-motion';

const api = axios.create({ baseURL: 'http://127.0.0.1:8000/api' });

const SmartMaintenance = () => {
    const [categories, setCategories] = useState({
        'Rotation Stress': [],
        'Vibration Faults': [],
        'Voltage Swings': [],
        'Pressure Overload': []
    });

    useEffect(() => {
        const fetchAndSort = async () => {
            try {
                const res = await api.get('/maintenance/causes');
                const formatted = {};
                for (const [cause, ids] of Object.entries(res.data)) {
                    formatted[cause] = ids.map(id => ({ id }));
                }
                setCategories(formatted);
            } catch (err) { console.error(err); }
        };
        fetchAndSort();
    }, []);

    const totalAffected = Object.values(categories).reduce((acc, curr) => acc + curr.length, 0);

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <header style={{ marginBottom: '3rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem' }}>
                    <div style={iconBox}><LayoutGrid size={24} color="var(--primary)" /></div>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: '900', letterSpacing: '-0.04em' }}>Smart Allocation</h1>
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', fontWeight: '600' }}>Expert resource deployment based on {totalAffected} failure signatures.</p>
            </header>

            {/* Global Distribution Summary */}
            <div className="glass-card" style={distributionSection}>
               <h3 style={{ fontSize: '0.8rem', fontWeight: '800', color: 'var(--text-muted)', marginBottom: '1.5rem', textTransform: 'uppercase' }}>Fleet Impact Distribution</h3>
               <div style={distributionTrack}>
                  {Object.entries(categories).map(([name, items], idx) => (
                      <div 
                        key={name} 
                        style={{ 
                            width: `${(items.length / totalAffected) * 100}%`, 
                            backgroundColor: getColor(idx), 
                            height: '100%',
                            transition: 'width 1s ease'
                        }} 
                      />
                  ))}
               </div>
               <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
                  {Object.entries(categories).map(([name, items], idx) => (
                      <div key={name} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', fontWeight: '700' }}>
                         <div style={{ width: '8px', height: '8px', borderRadius: '2px', backgroundColor: getColor(idx) }} />
                         <span>{name}: {items.length}</span>
                      </div>
                  ))}
               </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
                {Object.entries(categories).map(([name, items], idx) => (
                    <motion.div 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: idx * 0.1 }}
                        key={name} 
                        className="glass-card" 
                        style={{ padding: '2rem' }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{ ...iconCircle, color: getColor(idx), backgroundColor: `${getColor(idx)}15` }}>{getIcon(name)}</div>
                                <h3 style={{ fontSize: '1.2rem', fontWeight: '800' }}>{name}</h3>
                            </div>
                            <div style={countBadge}>{items.length} Assets</div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            {items.length > 0 ? items.map(m => (
                                <div key={m.id} style={itemRow}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        <Box size={16} color="var(--text-muted)" />
                                        <span style={{ fontWeight: '700' }}>Asset Node-{m.id}</span>
                                    </div>
                                    <span style={{ ...actionTag, color: getColor(idx), backgroundColor: `${getColor(idx)}15` }}>Level 2 Expert Required</span>
                                </div>
                            )) : (
                                <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>No active failures detected.</div>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

const getIcon = (name) => {
    if (name.includes('Rotation')) return <Settings size={20} />;
    if (name.includes('Vibration')) return <Activity size={20} />;
    if (name.includes('Voltage')) return <Zap size={20} />;
    return <Gauge size={20} />;
}

const getColor = (idx) => {
    const colors = ['#10b981', '#3b82f6', '#f59e0b', '#f43f5e'];
    return colors[idx % colors.length];
}

const iconBox = { width: '48px', height: '48px', borderRadius: '14px', backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' };

const distributionSection = { padding: '2rem', marginBottom: '2rem' };
const distributionTrack = { height: '12px', width: '100%', backgroundColor: 'rgba(0,0,0,0.03)', borderRadius: '6px', display: 'flex', overflow: 'hidden' };

const iconCircle = { width: '44px', height: '44px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' };
const countBadge = { fontSize: '0.7rem', fontWeight: '900', color: 'var(--text-muted)', padding: '0.3rem 0.6rem', border: '1px solid var(--border)', borderRadius: '6px' };

const itemRow = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', backgroundColor: 'rgba(0,0,0,0.015)', borderRadius: '10px', fontSize: '0.85rem' };

const actionTag = { fontSize: '0.65rem', fontWeight: '900', padding: '0.25rem 0.6rem', borderRadius: '4px' };

export default SmartMaintenance;
