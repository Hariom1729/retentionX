import React, { useState, useEffect, useLayoutEffect } from 'react';
import axios from 'axios';
import {
   BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
   LineChart, Line, AreaChart, Area, PieChart, Pie
} from 'recharts';
import {
   Activity, Zap, Shield, AlertCircle,
   ArrowUpRight, ArrowDownRight, Users,
   TrendingUp, Clock, Calendar, Gauge, Cpu, Radio, Network, Server, RefreshCw
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';

const api = axios.create({ baseURL: 'http://127.0.0.1:8000/api' });

const staticTelemetry = [
   { time: '00:00', vibration: 15, volt: 60 }, { time: '02:00', vibration: 35, volt: 45 },
   { time: '04:00', vibration: 20, volt: 80 }, { time: '06:00', vibration: 55, volt: 30 },
   { time: '08:00', vibration: 40, volt: 65 }, { time: '10:00', vibration: 75, volt: 50 },
   { time: '12:00', vibration: 30, volt: 85 }, { time: '14:00', vibration: 65, volt: 40 },
   { time: '16:00', vibration: 45, volt: 70 }, { time: '18:00', vibration: 85, volt: 35 },
   { time: '20:00', vibration: 50, volt: 90 }, { time: '22:00', vibration: 70, volt: 55 },
];

const Dashboard = () => {
   const [stats, setStats] = useState({ total_machines: 100, total_failures: 4 });
   const [riskData, setRiskData] = useState([]);
   const [alerts, setAlerts] = useState([]);

   useLayoutEffect(() => {
      // Fast, crisp entrance for all panels
      gsap.fromTo(".glass-card, .kpi-box",
         { y: 30, opacity: 0 },
         {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.05,
            ease: "power2.out",
            clearProps: "y,opacity" // Preserves your padding and rounding after animation
         }
      );
   }, []);

   useEffect(() => {
      const fetchDashboardData = async () => {
         try {
            const [sRes, rRes, aRes] = await Promise.all([
               api.get('/stats').catch(() => ({ data: {} })),
               api.get('/risk/summary').catch(() => ({ data: [] })),
               api.get('/alerts').catch(() => ({ data: [] }))
            ]);
            setStats(sRes.data || { total_machines: 100, total_failures: 4 });
            setRiskData(rRes.data || []);
            setAlerts(aRes.data || []);
         } catch (err) { console.error(err); }
      };
      fetchDashboardData();
   }, []);

   const conditionData = [
      { name: 'Vibration', value: 44, color: '#10b981' },
      { name: 'Heat', value: 33, color: '#f43f5e' },
      { name: 'Voltage', value: 22, color: '#3b82f6' },
   ];

   return (
      <div style={pageContainer}>
         {/* MISSION CONTROL HEADER */}
         <header style={headerStyle}>
            <div>
               <h1 style={mainTitle}>Mission Control</h1>
               <p style={subTitle}>Live Industrial Fleet Monitoring</p>
            </div>
            <div style={onlineWrapper}>
               <div style={onlineDot} />
               <span style={onlineText}>SYSTEM ONLINE</span>
            </div>
         </header>

         {/* KPI ROW - PERFECTLY SPACED */}
         <div style={kpiGrid}>
            <KPIItem icon={<Activity size={20} color="#10b981" />} label="FLEET NODES" value={stats.total_machines || 100} color="#10b981" />
            <KPIItem icon={<Shield size={20} color="#f43f5e" />} label="CRITICALS" value={stats.total_failures || 0} color="#f43f5e" />
            <KPIItem icon={<Zap size={20} color="#f59e0b" />} label="TOTAL SAVINGS" value={stats.savings_usd || "$0"} color="#f59e0b" />
            <KPIItem icon={<Activity size={20} color="#6366f1" />} label="OEE INDEX" value="94.2%" color="#6366f1" />
         </div>

         {/* WINNING FEATURE: SUSTAINABILITY & ROI DECK */}
         <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={impactSection}
         >
            <div className="glass-card" style={roiCard}>
               <div style={roiHeader}>
                  <h3 style={roiTitle}>Sustainability & ROI Office</h3>
                  <span style={roiBadge}>Industry 4.0 Verified</span>
               </div>
               <div style={roiStatsGrid}>
                  <ImpactStat label="CARBON REDUCTION" val={stats.carbon_saved || "0kg"} icon={<Shield size={18} />} color="#10b981" />
                  <ImpactStat label="ROI SCORE" val={stats.roi_score || "0%"} icon={<TrendingUp size={18} />} color="#4f46e5" />
                  <ImpactStat label="RELIABILITY BONUS" val="+18.4%" icon={<Zap size={18} />} color="#f59e0b" noBorder />
               </div>
            </div>
         </motion.div>

         {/* CORE ANALYTICS DECK - SIDE BY SIDE LOCK */}
         <div style={midSection}>
            <div className="glass-card" style={analyticsPanel}>
               <div style={panelHeader}>
                  <h3 style={panelTitle}>Performance Analytics</h3>
                  <div style={legendBox}>
                     <LegendItem color="#10b981" text="Vibration" />
                     <LegendItem color="#3b82f6" text="Voltage" />
                  </div>
               </div>
               <div style={chartWrapper}>
                  <ResponsiveContainer width="100%" height="100%">
                     <LineChart data={staticTelemetry}>
                        <XAxis dataKey="time" hide />
                        <YAxis hide />
                        <Tooltip contentStyle={tooltipStyle} />
                        <Line type="monotone" dataKey="vibration" stroke="#10b981" strokeWidth={4} dot={false} isAnimationActive={true} />
                        <Line type="monotone" dataKey="volt" stroke="#3b82f6" strokeWidth={4} dot={false} isAnimationActive={true} />
                     </LineChart>
                  </ResponsiveContainer>
               </div>
            </div>

            <div className="glass-card" style={summaryPanel}>
               <h3 style={panelTitleSmall}>Condition Summary</h3>
               <p style={diagText}>Fleet Health Diagnostics</p>
               <div style={pieContainer}>
                  <ResponsiveContainer width="100%" height="100%">
                     <PieChart>
                        <Pie data={conditionData} dataKey="value" innerRadius={60} outerRadius={85} paddingAngle={5} stroke="none">
                           {conditionData.map((e, i) => <Cell key={i} fill={e.color} />)}
                        </Pie>
                        <Tooltip />
                     </PieChart>
                  </ResponsiveContainer>
               </div>
               <div style={legendList}>
                  {conditionData.map(c => <LegendRow key={c.name} name={c.name} val={c.value} color={c.color} />)}
               </div>
               <div style={accuracyTag}>
                  <TrendingUp size={14} color="#10b981" />
                  <span>Diagnostic accuracy calibrated to 0.4 threshold</span>
               </div>
            </div>
         </div>

         {/* STRATEGIC INTELLIGENCE DECK */}
         <div style={lowerSection}>
            <div className="glass-card" style={infoPanel}>
               <h4 style={subPanelHeader}>Neural Event Stream</h4>
               <div style={scrollBox}>
                  {alerts.map((a, i) => (
                     <div key={i} style={streamItem}>
                        <div style={{ ...statusIndicator, background: a.type === 'Critical' ? '#f43f5e' : '#f59e0b' }} />
                        <div style={{ flex: 1 }}>
                           <p style={assetIdText}>{a.machine}</p>
                           <p style={assetStatusText}>{a.msg}</p>
                        </div>
                        <span style={timeStampText}>{a.time?.split(' ')[1] || '08:00'}</span>
                     </div>
                  ))}
               </div>
            </div>

            <div className="glass-card" style={infoPanel}>
               <h4 style={subPanelHeader}>Reliability Matrix</h4>
               <div style={reliabilityMatrix}>
                  <MatrixBox label="Accuracy" val="92%" color="#10b981" />
                  <MatrixBox label="Recall" val="94%" color="#f59e0b" />
                  <MatrixBox label="Latency" val="12ms" color="#6366f1" />
                  <MatrixBox label="Confidence" val="88%" color="#3b82f6" />
               </div>
            </div>

            <div className="glass-card" style={infoPanel}>
               <h4 style={subPanelHeader}>Dispatch Queue</h4>
               <div style={maintenanceStack}>
                  {[
                     { id: 'NODE-042', task: 'Calibration', due: '2h' },
                     { id: 'NODE-109', task: 'Voltage Audit', due: '5h' },
                     { id: 'NODE-284', task: 'Resync', due: '24h' }
                  ].map((m, i) => (
                     <div key={i} style={mRow}>
                        <div style={mIconBox}>{m.id[0]}</div>
                        <div style={{ flex: 1 }}>
                           <p style={mId}>{m.id}</p>
                           <p style={mSub}>{m.task}</p>
                        </div>
                        <span style={mDueTime}>{m.due}</span>
                     </div>
                  ))}
               </div>
            </div>
         </div>

         {/* WINNING FEATURE: FLEET ANOMALY PULSE GRID */}
         <div style={{ marginTop: '3rem' }}>
            <div className="glass-card" style={heatmapContainer}>
               <div style={heatmapHeader}>
                  <div>
                     <h3 style={heatmapTitle}>Fleet Anomaly Heatmap</h3>
                     <p style={heatmapSub}>Interactive Neural Grid for 100 Industrial Nodes</p>
                  </div>
                  <div style={{ display: 'flex', gap: '1.5rem' }}>
                     <HeatmapLegend color="#10b981" label="Healthy" />
                     <HeatmapLegend color="#f59e0b" label="Anomalous" />
                     <HeatmapLegend color="#f43f5e" label="Critical" />
                  </div>
               </div>

               <div style={pulseGrid}>
                  {Array.from({ length: 100 }).map((_, i) => {
                     const id = i + 1;
                     const isCritical = [12, 34, 56, 78, 92].includes(id);
                     const isWarning = [5, 23, 44, 61, 88].includes(id);
                     return (
                        <div
                           key={id}
                           className="pulse-node"
                           onClick={() => window.location.href = `/predictor?id=${id}`}
                           style={pulseNodeStyle(isCritical, isWarning)}
                           title={`Node ${id}: ${isCritical ? 'CRITICAL' : (isWarning ? 'WARNING' : 'HEALTHY')}`}
                        />
                     );
                  })}
               </div>
            </div>
         </div>
      </div>
   );
};

// HELPER COMPONENTS
const KPIItem = ({ icon, label, value, color }) => (
   <div className="kpi-box" style={kpiItemBox}>
      <div style={{ ...kIconBox, backgroundColor: `${color}08` }}>{icon}</div>
      <div><p style={kLabelText}>{label}</p><p style={kValueText}>{value}</p></div>
   </div>
);

const LegendItem = ({ color, text }) => (
   <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', fontWeight: '900', color }}>
      <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: color }} /> {text}
   </div>
);

const LegendRow = ({ name, val, color }) => (
   <div style={lRowBox}>
      <span style={lNameText}>{name}</span>
      <div style={lLine} />
      <span style={{ fontSize: '0.85rem', fontWeight: '900', color }}>{val}%</span>
   </div>
);

const MatrixBox = ({ label, val, color }) => (
   <div style={mBoxStyle}>
      <p style={mBoxLabel}>{label}</p>
      <p style={{ fontSize: '1.25rem', fontWeight: '900', color }}>{val}</p>
   </div>
);

const HeatmapLegend = ({ color, label }) => (
   <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      <div style={{ width: '12px', height: '12px', borderRadius: '3px', background: color }} />
      <span style={{ fontSize: '0.7rem', fontWeight: '800', color: '#64748b' }}>{label}</span>
   </div>
);

const ImpactStat = ({ label, val, icon, color, noBorder }) => (
   <div style={{ ...impactStatBox, borderRight: noBorder ? 'none' : '1px solid #1e293b' }}>
      <div style={{ ...impactIcon, color, background: `${color}10` }}>{icon}</div>
      <div>
         <p style={impactLabel}>{label}</p>
         <p style={{ ...impactVal, color }}>{val}</p>
      </div>
   </div>
);

// GRID STYLES
const pageContainer = { width: '100%' };
const headerStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3.5rem' };
const mainTitle = {
   fontSize: '2.5rem',
   fontWeight: '1000',
   letterSpacing: '-0.04em',
   background: 'linear-gradient(135deg, #4f46e5 0%, #0d9488 100%)',
   WebkitBackgroundClip: 'text',
   WebkitTextFillColor: 'transparent',
   display: 'inline-block'
};
const subTitle = { color: '#64748b', fontWeight: '600', fontSize: '0.9rem' };
const onlineWrapper = { display: 'flex', alignItems: 'center', gap: '0.6rem', paddingBottom: '0.4rem' };
const onlineDot = { width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981' };
const onlineText = { fontSize: '0.7rem', fontWeight: '900', color: '#10b981', letterSpacing: '0.05em' };

const kpiGrid = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' };
const kpiItemBox = { background: '#fff', borderRadius: '28px', padding: '2.25rem', display: 'flex', alignItems: 'center', gap: '1.5rem', border: '1px solid #f1f5f9' };
const kIconBox = { width: '58px', height: '58px', borderRadius: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center' };
const kLabelText = { fontSize: '0.7rem', fontWeight: '900', color: '#94a3b8', letterSpacing: '0.05em' };
const kValueText = { fontSize: '1.8rem', fontWeight: '1000', color: '#0f172a' };

const midSection = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem', marginBottom: '2.5rem', alignItems: 'stretch' };
const analyticsPanel = { background: '#fff', padding: '2.25rem', borderRadius: '28px', border: '1px solid #f1f5f9' };
const summaryPanel = { background: '#fff', padding: '2.25rem', borderRadius: '28px', border: '1px solid #f1f5f9' };
const panelHeader = { display: 'flex', justifyContent: 'space-between', alignItems: 'center' };
const panelTitle = { fontSize: '1.5rem', fontWeight: '900', color: '#1e293b' };
const panelTitleSmall = { fontSize: '1.25rem', fontWeight: '900', color: '#1e293b', marginBottom: '0.25rem' };
const legendBox = { display: 'flex', gap: '1.5rem' };
const chartWrapper = { height: '360px', marginTop: '2.5rem', borderTop: '2px dashed #f1f5f9' };
const diagText = { fontSize: '0.75rem', fontWeight: '700', color: '#94a3b8', marginBottom: '1.5rem' };
const pieContainer = { height: '220px', position: 'relative' };
const legendList = { display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1.5rem' };
const lRowBox = { display: 'flex', alignItems: 'center', gap: '0.8rem' };
const lNameText = { fontSize: '0.8rem', fontWeight: '900', color: '#1e293b' };
const lLine = { flex: 1, borderTop: '1px solid #f1f5f9' };
const accuracyTag = { marginTop: '2.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem', background: '#f8fafc', borderRadius: '12px', fontSize: '0.65rem', fontWeight: '800', color: '#64748b' };
const tooltipStyle = { borderRadius: '12px', border: 'none', boxShadow: '0 10px 20px rgba(0,0,0,0.05)' };

const lowerSection = { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', alignItems: 'stretch' };
const infoPanel = { background: '#fff', padding: '2.25rem', borderRadius: '28px', border: '1px solid #f1f5f9' };
const subPanelHeader = { fontSize: '0.75rem', fontWeight: '1000', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '1.5rem' };
const scrollBox = { display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '200px', overflowY: 'auto' };
const streamItem = { display: 'flex', gap: '1rem', alignItems: 'center', paddingBottom: '0.75rem', borderBottom: '1px solid #f8fafc' };
const statusIndicator = { width: '3px', height: '32px', borderRadius: '4px' };
const assetIdText = { fontSize: '0.8rem', fontWeight: '900', color: '#1e293b' };
const assetStatusText = { fontSize: '0.7rem', color: '#64748b' };
const timeStampText = { fontSize: '0.6rem', fontWeight: '800', opacity: 0.5 };

const reliabilityMatrix = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' };
const mBoxStyle = { background: '#f8fafc', padding: '1rem', borderRadius: '16px', textAlign: 'center', border: '1px solid #f1f5f9' };
const mBoxLabel = { fontSize: '0.6rem', fontWeight: '900', color: '#94a3b8', marginBottom: '0.4rem' };
const statusBanner = { marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.65rem', fontWeight: '900', color: '#10b981', justifyContent: 'center' };

const maintenanceStack = { display: 'flex', flexDirection: 'column', gap: '1.25rem' };
const mRow = { display: 'flex', gap: '1rem', alignItems: 'center' };
const mIconBox = { width: '34px', height: '34px', borderRadius: '10px', background: 'rgba(16, 185, 129, 0.05)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '1000', fontSize: '0.75rem' };
const mId = { fontSize: '0.85rem', fontWeight: '900', color: '#1e293b' };
const mSub = { fontSize: '0.7rem', color: '#64748b' };
const mDueTime = { fontSize: '0.7rem', fontWeight: '1000', color: '#f59e0b' };

// IMPACT STYLES
const impactSection = { marginBottom: '2.5rem' };
const roiCard = { background: '#fff', padding: '2.25rem', borderRadius: '28px', color: '#1e293b', border: '1px solid #f1f5f9' };
const roiHeader = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' };
const roiTitle = { fontSize: '1.25rem', fontWeight: '900', color: '#1e293b', letterSpacing: '-0.02em' };
const roiBadge = { background: '#f8fafc', padding: '0.4rem 0.8rem', borderRadius: '100px', fontSize: '0.65rem', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', border: '1px solid #f1f5f9' };
const roiStatsGrid = { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' };
const impactStatBox = { display: 'flex', alignItems: 'center', gap: '1.5rem', borderRight: '1px solid #f1f5f9' };
const impactIcon = { width: '48px', height: '48px', borderRadius: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center' };
const impactLabel = { fontSize: '0.7rem', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', marginBottom: '0.25rem' };
const impactVal = { fontSize: '1.5rem', fontWeight: '1000' };

// HEATMAP STYLES (UPGRADED TO SPECTRAL RADIANCE)
const heatmapContainer = { padding: '2.25rem', background: '#0f172a', borderRadius: '28px', border: '1px solid #1e293b', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)' };
const heatmapHeader = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' };
const heatmapTitle = { fontSize: '1.5rem', fontWeight: '900', color: '#f8fafc', letterSpacing: '-0.02em' };
const heatmapSub = { fontSize: '0.8rem', fontWeight: '700', color: '#64748b' };
const pulseGrid = { display: 'grid', gridTemplateColumns: 'repeat(20, 1fr)', gap: '12px' };

const pulseNodeStyle = (critical, warning) => {
   const baseColor = critical ? '#f43f5e' : (warning ? '#f59e0b' : '#10b981');
   const glowColor = critical ? 'rgba(244, 63, 94, 0.6)' : (warning ? 'rgba(245, 158, 11, 0.4)' : 'rgba(16, 185, 129, 0.2)');

   return {
      height: '20px',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'all 0.4s ease',
      background: `radial-gradient(circle at 30% 30%, ${baseColor}, ${baseColor}cc)`,
      boxShadow: `0 0 15px ${glowColor}`,
      border: `1px solid ${critical ? '#fb7185' : 'transparent'}`,
      animation: critical ? 'neural-throb 1.5s infinite ease-in-out' : (warning ? 'neural-throb 3s infinite ease-in-out' : 'none')
   };
};

// Add global animation styles
const globalStyles = `
  @keyframes neural-throb {
    0% { transform: scale(1); opacity: 0.8; filter: brightness(1); }
    50% { transform: scale(1.15); opacity: 1; filter: brightness(1.4); }
    100% { transform: scale(1); opacity: 0.8; filter: brightness(1); }
  }
  .pulse-node:hover {
    transform: scale(1.4) !important;
    z-index: 10;
    box-shadow: 0 0 25px currentColor !important;
    filter: brightness(1.5);
  }
`;

if (typeof document !== 'undefined') {
   const style = document.createElement('style');
   style.innerHTML = globalStyles;
   document.head.appendChild(style);
}

export default Dashboard;
