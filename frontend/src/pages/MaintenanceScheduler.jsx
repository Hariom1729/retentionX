import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Settings2, Box, X, Shield, Package, TrendingUp, Clock, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const api = axios.create({ baseURL: 'http://127.0.0.1:8000/api' });

const MaintenanceScheduler = () => {
    const [schedule, setSchedule] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedMission, setSelectedMission] = useState(null);

    const getFormattedDate = (dateStr) => {
        const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
        const now = new Date();
        
        try {
            // Check if dateStr exists and is valid
            const d = dateStr ? new Date(dateStr) : now;
            
            // If the date is still invalid (NaN), return today's info
            if (isNaN(d.getTime())) {
                return { 
                  day: now.getDate().toString().padStart(2, '0'), 
                  month: months[now.getMonth()], 
                  time: '09:00 AM' 
                };
            }

            return {
                day: d.getDate().toString().padStart(2, '0'),
                month: months[d.getMonth()],
                time: d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
        } catch (e) {
            return { 
                day: now.getDate().toString().padStart(2, '0'), 
                month: months[now.getMonth()], 
                time: '09:00 AM' 
            };
        }
    };

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await api.get('/schedule');
                if (res.data) {
                    setSchedule(res.data.map((item, idx) => {
                        const dateInfo = getFormattedDate(item.date);
                        return {
                            ...item,
                            day: dateInfo.day,
                            month: dateInfo.month,
                            displayTime: dateInfo.time,
                            taskName: item.task || 'System Calibration',
                            urgency: item.task && item.task.includes('Repair') ? 'LIVE MISSION' : 'PREDICTIVE'
                        };
                    }));
                }
            } catch (err) { 
                console.error(err);
                const td = new Date();
                setSchedule([
                    { id: 101, taskName: 'Sensor Array Calibration', day: td.getDate().toString(), month: 'APR', urgency: 'CRITICAL', displayTime: '08:30 AM' },
                    { id: 102, taskName: 'Motor Bearing Check', day: (td.getDate()+1).toString(), month: 'APR', urgency: 'HIGH', displayTime: '10:15 AM' },
                ]);
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, []);

    return (
        <div style={{ width: '100%' }}>
            <header style={{ marginBottom: '3.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem' }}>
                    <div style={iconBox}><Settings2 size={24} color="#10b981" /></div>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: '900', letterSpacing: '-0.04em' }}>Predictive Scheduler</h1>
                </div>
                <p style={{ color: '#64748b', fontSize: '1.1rem', fontWeight: '500' }}>Live logistics feed for AI-dispatched repairs.</p>
            </header>

            <div style={{ position: 'relative', paddingLeft: '3rem' }}>
                <div style={timelineLine} />
                <AnimatePresence>
                    {schedule.map((item, idx) => (
                        <motion.div key={idx} initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: idx * 0.05 }} style={{ position: 'relative', marginBottom: '2.5rem' }}>
                            <div style={{ ...timelineDot, backgroundColor: item.urgency === 'LIVE MISSION' ? '#4f46e5' : '#10b981' }} />
                            <div className="glass-card" style={schedulerCard}>
                                <div style={dateBox}>
                                    <span style={{ fontSize: '0.65rem', fontWeight: '800', opacity: 0.5 }}>{item.month}</span>
                                    <span style={{ fontSize: '1.5rem', fontWeight: '900', lineHeight: 1 }}>{item.day}</span>
                                    <span style={{ fontSize: '0.6rem', fontWeight: '700' }}>{item.urgency === 'LIVE MISSION' ? 'NOW' : 'AUTO'}</span>
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem' }}>
                                        <h4 style={{ fontSize: '1.1rem', fontWeight: '800' }}>{item.taskName}</h4>
                                        <span style={{ fontSize: '0.6rem', fontWeight: '900', padding: '0.2rem 0.5rem', borderRadius: '4px', background: item.urgency === 'LIVE MISSION' ? '#e0e7ff' : '#f0fdf4', color: item.urgency === 'LIVE MISSION' ? '#4f46e5' : '#10b981' }}>{item.urgency}</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: '#64748b', fontSize: '0.8rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Box size={14} /><span>Asset-{item.id}</span></div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Clock size={14} /><span>{item.displayTime}</span></div>
                                    </div>
                                </div>
                                <button onClick={() => setSelectedMission(item)} style={actionBtn}><ArrowRight size={20} /></button>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            <AnimatePresence>
                {selectedMission && (
                    <div style={modalOverlay}>
                        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} style={modalContent}>
                            <div style={modalHead}>
                                <h3 style={{ fontWeight: '900' }}>Mission Details #{selectedMission.id}</h3>
                                <button onClick={() => setSelectedMission(null)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={20} /></button>
                            </div>
                            <div style={modalBody}>
                                <div style={detailRow}><Shield size={20} color="#10b981" /><div><label style={detailLabel}>INSTRUCTIVE RCA</label><p style={detailVal}>{selectedMission.advice || 'Perform thermal resonance calibration.'}</p></div></div>
                                <div style={detailRow}><Package size={20} color="#4f46e5" /><div><label style={detailLabel}>LOGISTICS</label><p style={detailVal}>{selectedMission.part || 'Standard Unit v2'}</p></div></div>
                                <div style={detailRow}><TrendingUp size={20} color="#f59e0b" /><div><label style={detailLabel}>ECONOMICS</label><p style={detailVal}>{selectedMission.savings || '$4,500'} Projected Savings</p></div></div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

const iconBox = { width: '48px', height: '48px', borderRadius: '14px', backgroundColor: '#f0fdf4', display: 'flex', alignItems: 'center', justifyContent: 'center' };
const timelineLine = { position: 'absolute', left: '0', top: '1rem', bottom: '0', width: '2px', background: 'linear-gradient(to bottom, #10b981, #f1f5f9)' };
const timelineDot = { position: 'absolute', left: '-31px', top: '2.2rem', width: '10px', height: '10px', borderRadius: '50%', border: '6px solid #fff', zIndex: 2 };
const schedulerCard = { display: 'flex', alignItems: 'center', gap: '2rem', padding: '1.25rem 2rem', background: '#fff', border: '1px solid #f1f5f9', borderRadius: '1.25rem' };
const dateBox = { display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0.6rem', borderRadius: '10px', backgroundColor: '#f8fafc', minWidth: '80px' };
const actionBtn = { width: '40px', height: '40px', borderRadius: '50%', border: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', cursor: 'pointer', background: 'none' };
const modalOverlay = { position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 };
const modalContent = { width: '420px', background: '#fff', borderRadius: '1.5rem', padding: '2rem', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' };
const modalHead = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' };
const modalBody = { display: 'flex', flexDirection: 'column', gap: '1.5rem' };
const detailRow = { display: 'flex', gap: '1rem', alignItems: 'flex-start' };
const detailLabel = { fontSize: '0.6rem', fontWeight: '900', color: '#94a3b8' };
const detailVal = { fontSize: '0.9rem', fontWeight: '700', lineHeight: 1.4 };

export default MaintenanceScheduler;
