import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const api = axios.create({ baseURL: 'http://localhost:8000/api' });

const RiskClassification = () => {
    const [data, setData] = useState([
        { name: 'High Risk', value: 8, color: '#f43f5e' },
        { name: 'Medium Risk', value: 15, color: '#f59e0b' },
        { name: 'Safe Zone', value: 77, color: '#10b981' },
    ]);

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await api.get('/risk/summary');
                setData(res.data);
            } catch (err) { console.error(err); }
        };
        fetch();
    }, []);

    return (
        <div style={{ maxWidth: '1000px' }}>
            <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Risk Level Classification</h1>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem' }}>Segmentation of fleet assets by failure probability tiers</p>

            <div className="glass-card" style={{ padding: '2rem', height: '400px', marginBottom: '2rem' }}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} />
                        <YAxis axisLine={false} tickLine={false} />
                        <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0' }} />
                        <Bar dataKey="value" radius={[10, 10, 0, 0]} label={{ position: 'top', fill: '#94a3b8', fontSize: 12 }}>
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
                {data.length > 0 ? data.map(tier => (
                    <div key={tier.name} className="glass-card" style={{ padding: '1.5rem', textAlign: 'center' }}>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>{tier.name}</div>
                        <div style={{ fontSize: '2rem', fontWeight: '800', color: tier.color }}>{tier.value}</div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>ASSET UNITS</div>
                    </div>
                )) : (
                    <div style={{ gridColumn: 'span 3', textAlign: 'center', opacity: 0.5 }}>Syncing fleet risk data...</div>
                )}
            </div>
        </div>
    );
};

export default RiskClassification;
