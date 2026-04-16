import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { 
  Box, Search, Filter, BoxSelect, Tag, Calendar, 
  X, Info, Activity, Zap, Cpu, Gauge, Clock, ArrowRight,
  ChevronLeft, ChevronRight, AlertTriangle, Radio, Globe, Shield, Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';

const api = axios.create({ baseURL: 'http://127.0.0.1:8000/api' });

const statusColor = (s) => {
  if (s === 'Danger') return '#f43f5e';
  if (s === 'Warning') return '#f59e0b';
  return '#10b981';
};

const Inventory = () => {
  const navigate = useNavigate();
  const [machines, setMachines] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedMachine, setSelectedMachine] = useState(null);
  const [telemetry, setTelemetry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const pageSize = 100;

  useEffect(() => {
    const fetchMachines = async () => {
      setLoading(true);
      try {
        const res = await api.get('/machines').catch(() => ({ data: [] }));
        setMachines(Array.isArray(res.data) ? res.data : []);
      } catch (err) { console.error(err); }
      finally { setTimeout(() => setLoading(false), 800); }
    };
    fetchMachines();
  }, []);

  const handleInspect = async (m) => {
    setSelectedMachine(m);
    try {
      const res = await api.get(`/telemetry/${m.id}`);
      setTelemetry(res.data.slice(-4)); 
    } catch (err) { console.error(err); }
  };

  useLayoutEffect(() => {
    if (!loading && machines.length > 0) {
      gsap.fromTo(".inventory-row", 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.05, duration: 0.6, ease: "power2.out" }
      );
    }
  }, [loading, page, statusFilter]);

  const filteredBase = (machines || []).filter(m => {
    const matchesSearch = (m.name || '').toLowerCase().includes(searchTerm.toLowerCase()) || (m.type || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || m.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const paginatedList = filteredBase.slice(page * pageSize, (page + 1) * pageSize);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', paddingBottom: '5rem' }}>
      <header style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '900', letterSpacing: '-0.05em' }}>Fleet Audit</h1>
          <p style={{ color: '#64748b', fontWeight: '700' }}>Active Nodes: <span style={{ color: '#10b981' }}>{filteredBase.length}</span></p>
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <div style={filterGroup}>
             {['All', 'Warning', 'Danger'].map(f => (
                <button key={f} onClick={() => { setStatusFilter(f); setPage(0); }} style={{ ...filterTab, backgroundColor: statusFilter === f ? '#10b981' : 'transparent', color: statusFilter === f ? 'white' : '#64748b' }}>{f}</button>
             ))}
          </div>
          <div style={searchContainer}>
            <Search size={18} color="#94a3b8" />
            <input type="text" placeholder="Search ID/Model..." style={searchInput} value={searchTerm} onChange={(e) => { setSearchTerm(e.target.value); setPage(0); }} />
          </div>
        </div>
      </header>

      {loading ? (
        <div style={{ height: '50vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <Activity size={48} color="#10b981" className="animate-pulse" />
          <p style={{ fontWeight: '900', color: '#10b981', letterSpacing: '0.1em', marginTop: '1.5rem' }}>SYNCHRONIZING FLEET CLUSTER...</p>
        </div>
      ) : machines.length === 0 ? (
        <div style={{ padding: '5rem', textAlign: 'center', background: '#fff', borderRadius: '32px', border: '1px dashed #e2e8f0' }}>
            <Box size={48} color="#cbd5e1" style={{ marginBottom: '1.5rem' }} />
            <p style={{ fontSize: '1.1rem', fontWeight: '800', color: '#64748b' }}>No Industrial Nodes Detected</p>
            <button onClick={() => window.location.reload()} style={{ marginTop: '1.5rem', padding: '0.75rem 1.5rem', borderRadius: '12px', background: '#10b981', color: '#fff', border: 'none', fontWeight: '900' }}>Retry Sync</button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div style={listHeader}>
             <div style={{ flex: 1.5 }}>Asset ID</div>
             <div style={{ flex: 2 }}>Model</div>
             <div style={{ flex: 1.5 }}>Status</div>
             <div style={{ flex: 2 }}>Last Signal</div>
             <div style={{ width: '120px' }}>Management</div>
          </div>
          {paginatedList.map((m, i) => (
            <div key={`${m.id}-${i}`} className="inventory-row glass-card" style={rowStyle} onClick={() => handleInspect(m)}>
              <div style={{ flex: 1.5, display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                 <div style={nodeIcon}>{m.status === 'Danger' ? <AlertTriangle size={16} color="#f43f5e" /> : <Cpu size={16} color="#10b981" />}</div>
                 <span style={{ fontWeight: '900', fontSize: '0.85rem' }}>{m.name}</span>
              </div>
              <div style={{ flex: 2, fontSize: '0.85rem', fontWeight: '800', opacity: 0.7 }}>{m.type}</div>
              <div style={{ flex: 1.5, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                 <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: statusColor(m.status) }} />
                 <span style={{ fontSize: '0.75rem', fontWeight: '900', color: statusColor(m.status) }}>{m.status.toUpperCase()}</span>
              </div>
              <div style={{ flex: 2, fontSize: '0.8rem', fontWeight: '700', color: '#64748b' }}>{m.lastMaint}</div>
              <div style={{ width: '120px' }}><button style={inspectBtn}>Inspect <ArrowRight size={14} /></button></div>
            </div>
          ))}
        </div>
      )}

      {/* MODAL WITH FULL RESTORED FEATURES */}
      <AnimatePresence>
        {selectedMachine && (
          <div style={modalOverlay} onClick={() => setSelectedMachine(null)}>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="glass-card" style={modalContent} onClick={(e) => e.stopPropagation()}>
               <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
                  <div style={{ display: 'flex', gap: '1.25rem' }}>
                     <div style={modalIcon}><Info size={24} color="#10b981" /></div>
                     <div>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: '900' }}>Diagnostic: Node-{selectedMachine.id}</h2>
                        <p style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: '800' }}>Active Monitoring & Historic Metadata</p>
                     </div>
                  </div>
                  <button onClick={() => setSelectedMachine(null)} style={closeBtn}><X size={24} /></button>
               </div>
               
               <div style={metaGrid}>
                  <div style={metaItem}><span style={metaLabel}>ASSET TYPE</span><span style={metaValue}>{selectedMachine.type}</span></div>
                  <div style={metaItem}><span style={metaLabel}>DEPLOYMENT AGE</span><span style={metaValue}>{selectedMachine.age} Years</span></div>
                  <div style={metaItem}><span style={metaLabel}>SYNC STATUS</span><span style={{ ...metaValue, color: '#3b82f6' }}>REAL-TIME ACTIVE</span></div>
                  <div style={metaItem}><span style={metaLabel}>NETWORK ADDR</span><span style={metaValue}>192.168.1.{selectedMachine.id}</span></div>
               </div>

               <h4 style={snapshotTitle}>Live Signal Snapshots</h4>
               <div style={snapshotGrid}>
                  {telemetry ? telemetry.map((t, i) => (
                    <div key={i} style={snapCard}>
                       <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                          <Radio size={12} color="#10b981" />
                          <span style={{ fontSize: '0.6rem', fontWeight: '900' }}>T-{i}</span>
                       </div>
                       <div style={{ fontSize: '1.1rem', fontWeight: '900' }}>{t.vibration?.toFixed(2) || '0.00'}</div>
                       <div style={{ fontSize: '0.55rem', fontWeight: '800', color: '#64748b' }}>mm/s VIB</div>
                    </div>
                  )) : <div style={{ gridColumn: 'span 4', textAlign: 'center', padding: '1rem' }}><Loader2 className="animate-spin" size={20} /></div>}
               </div>

               <div style={{ display: 'flex', gap: '1rem', marginTop: '2.5rem' }}>
                  <button onClick={() => navigate(`/predictor?id=${selectedMachine.id}`)} style={launchBtn}>
                    LAUNCH NEURAL ENGINE <Zap size={18} fill="white" />
                  </button>
                  <button style={reportBtn}>EXPORT PDF</button>
               </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

// INDUSTRIAL PREMIUM STYLES
const filterGroup = { display: 'flex', gap: '4px', padding: '6px', borderRadius: '16px', background: '#fff', border: '1px solid #f1f5f9' };
const filterTab = { padding: '0.6rem 1.25rem', borderRadius: '12px', border: 'none', fontSize: '0.75rem', fontWeight: '900', cursor: 'pointer', transition: 'all 0.2s' };
const searchContainer = { display: 'flex', alignItems: 'center', padding: '0 1.25rem', background: '#fff', borderRadius: '16px', border: '1px solid #f1f5f9', width: '250px' };
const searchInput = { border: 'none', background: 'none', padding: '0.8rem 0', outline: 'none', width: '100%', fontSize: '0.8rem', fontWeight: '800' };

const listHeader = { display: 'flex', padding: '0 2rem 1rem', fontSize: '0.65rem', fontWeight: '900', color: '#64748b', letterSpacing: '0.1em' };
const rowStyle = { display: 'flex', alignItems: 'center', padding: '1.5rem 2rem', cursor: 'pointer', marginBottom: '0.5rem', borderRadius: '20px', background: '#fff', border: '1px solid #f1f5f9' };
const nodeIcon = { width: '42px', height: '42px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' };
const inspectBtn = { padding: '0.5rem 1rem', fontSize: '0.7rem', borderRadius: '8px', border: '1px solid #f1f5f9', background: 'none', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' };

const modalOverlay = { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15, 23, 42, 0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, backdropFilter: 'blur(10px)' };
const modalContent = { width: '650px', padding: '3rem', borderRadius: '2.5rem', background: 'white', boxShadow: '0 50px 100px -20px rgba(0,0,0,0.1)' };
const modalIcon = { width: '58px', height: '58px', borderRadius: '18px', backgroundColor: 'rgba(16, 185, 129, 0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' };
const closeBtn = { border: 'none', background: 'none', cursor: 'pointer', color: '#94a3b8' };

const metaGrid = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2.5rem' };
const metaItem = { display: 'flex', flexDirection: 'column', gap: '0.2rem' };
const metaLabel = { fontSize: '0.65rem', fontWeight: '900', color: '#64748b', letterSpacing: '0.05em' };
const metaValue = { fontSize: '1rem', fontWeight: '800' };

const snapshotTitle = { fontSize: '0.75rem', fontWeight: '900', color: '#64748b', marginBottom: '1rem', letterSpacing: '0.1em', textTransform: 'uppercase' };
const snapshotGrid = { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' };
const snapCard = { padding: '1rem', borderRadius: '16px', border: '1px solid #f1f5f9', background: '#f8fafc' };

const launchBtn = { flex: 2, padding: '1.25rem', borderRadius: '1.25rem', border: 'none', background: '#10b981', color: 'white', fontWeight: '900', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.75rem', justifyContent: 'center' };
const reportBtn = { flex: 1, padding: '1.25rem', borderRadius: '1.25rem', border: '1px solid #f1f5f9', background: 'none', fontWeight: '900', cursor: 'pointer' };

export default Inventory;
