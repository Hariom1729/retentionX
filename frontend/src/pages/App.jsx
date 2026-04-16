import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, BarChart3, BrainCircuit, 
  ShieldAlert, Radio, Brain, CalendarRange, 
  BellRing, Settings, Activity, Search, RefreshCw
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Page Imports
import Dashboard from './pages/Dashboard';
import Inventory from './pages/Inventory';
import Predictor from './pages/Predictor';
import RiskClassification from './pages/RiskClassification';
import EarlyWarning from './pages/EarlyWarning';
import SmartMaintenance from './pages/SmartMaintenance';
import MaintenanceScheduler from './pages/MaintenanceScheduler';
import Alerts from './pages/Alerts';
import SettingsPage from './pages/Settings';

const App = () => {
  const location = useLocation();

  const navItems = [
    { to: "/", icon: <LayoutDashboard size={20} />, label: "Dashboard" },
    { to: "/predictor", icon: <BrainCircuit size={20} />, label: "AI Predictor" },
    { to: "/inventory", icon: <BarChart3 size={20} />, label: "Fleet Inventory" },
    { to: "/smart", icon: <Brain size={20} />, label: "Smart Maint." },
    { to: "/warning", icon: <Radio size={20} />, label: "Early Warning" },
    { to: "/risk", icon: <ShieldAlert size={20} />, label: "Risk Levels" },
    { to: "/schedule", icon: <CalendarRange size={20} />, label: "Scheduler" }
  ];

  return (
    <div style={layoutContainer}>
      {/* PURE INDUSTRIAL SIDEBAR */}
      <nav style={sidebarStyle}>
        <div style={logoContainer}>
          <div style={logoIcon}><Activity size={22} color="#fff" /></div>
          <div>
            <span style={logoText}>EcoRetain</span>
            <p style={{ fontSize: '0.6rem', fontWeight: '800', opacity: 0.6, letterSpacing: '0.1em' }}>AI INDUSTRIAL</p>
          </div>
        </div>

        <div style={navGroup}>
          {navItems.map((item) => (
            <NavLink 
              key={item.to}
              to={item.to} 
              icon={item.icon} 
              label={item.label} 
              active={location.pathname === item.to} 
            />
          ))}
        </div>

        <div style={{ marginTop: 'auto', paddingTop: '1.5rem', borderTop: '1px solid #f1f5f9' }}>
           <button style={syncBtn}>
              <RefreshCw size={16} />
              <span>SYNC NOW</span>
           </button>
        </div>
      </nav>

      {/* MAIN VIEWPORT */}
      <main style={mainContent}>
        <header style={topHeader}>
           <div style={searchBox}>
              <Search size={18} color="#94a3b8" />
              <input type="text" placeholder="Global asset search..." style={topSearch} />
           </div>
           {/* Metadata removed as requested */}
        </header>

        <div style={pageWrapper}>
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <Routes location={location}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/inventory" element={<Inventory />} />
                <Route path="/predictor" element={<Predictor />} />
                <Route path="/risk" element={<RiskClassification />} />
                <Route path="/warning" element={<EarlyWarning />} />
                <Route path="/smart" element={<SmartMaintenance />} />
                <Route path="/schedule" element={<MaintenanceScheduler />} />
                <Route path="/alerts" element={<Alerts />} />
                <Route path="/settings" element={<SettingsPage />} />
              </Routes>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

const NavLink = ({ to, icon, label, active }) => (
  <Link to={to} style={{ ...navLinkStyle, backgroundColor: active ? 'rgba(16, 185, 129, 0.1)' : 'transparent', color: active ? '#10b981' : '#64748b' }}>
    <div style={navIcon}>{icon}</div>
    <span style={{ flex: 1, fontWeight: active ? '900' : '700' }}>{label}</span>
    {active && <ChevronRight size={14} style={{ opacity: 0.5 }} />}
  </Link>
);

const ChevronRight = ({ size, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <path d="m9 18 6-6-6-6" />
  </svg>
);

const layoutContainer = { display: 'flex', minHeight: '100vh', backgroundColor: '#f8fafc' };
const sidebarStyle = { width: '260px', background: '#fff', padding: '2.5rem 1.25rem', display: 'flex', flexDirection: 'column', position: 'sticky', top: 0, height: '100vh', borderRight: '1px solid #f1f5f9', zIndex: 100 };
const logoContainer = { display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '3rem', paddingLeft: '0.5rem' };
const logoIcon = { width: '40px', height: '40px', background: '#10b981', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 16px rgba(16, 185, 129, 0.2)' };
const logoText = { color: '#0f172a', fontSize: '1.25rem', fontWeight: '900', letterSpacing: '-0.02em', display: 'block' };

const navGroup = { display: 'flex', flexDirection: 'column', gap: '0.4rem' };
const navLinkStyle = { display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.85rem 1rem', borderRadius: '10px', textDecoration: 'none', fontSize: '0.85rem', transition: 'all 0.2s' };
const navIcon = { display: 'flex', alignItems: 'center', justifyContent: 'center' };

const syncBtn = { border: 'none', background: 'none', display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#64748b', fontSize: '0.75rem', fontWeight: '900', cursor: 'pointer', padding: '1rem' };

const mainContent = { flex: 1, padding: '0 3.5rem' };
const topHeader = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '100px' };
const searchBox = { display: 'flex', alignItems: 'center', gap: '1rem', padding: '0 1.25rem', background: 'none', width: '300px', height: '46px' };
const topSearch = { border: 'none', background: 'none', fontSize: '0.85rem', fontWeight: '700', outline: 'none', width: '100%', color: '#94a3b8' };

const pageWrapper = { maxWidth: '1400px', margin: '0 auto' };

export default App;
