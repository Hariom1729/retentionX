import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Activity, 
  Settings, 
  AlertTriangle, 
  Box, 
  Zap,
  ChevronRight,
  RefreshCw,
  CheckCircle
} from 'lucide-react';
import axios from 'axios';

const api = axios.create({ baseURL: 'http://127.0.0.1:8000/api' });

const Sidebar = () => {
  const [syncing, setSyncing] = React.useState(false);
  
  const handleSync = async () => {
    setSyncing(true);
    try {
      await api.get('/sync');
      window.location.reload();
    } catch (e) {
      console.error(e);
      alert(`Sync Error: ${e.response?.data?.detail || e.message}`);
    }
    setSyncing(false);
  };

  const menuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={18} />, path: '/' },
    { name: 'AI Predictor', icon: <Zap size={18} />, path: '/predictor' },
    { name: 'Fleet Inventory', icon: <Box size={18} />, path: '/inventory' },
    { name: 'Smart Maint.', icon: <Settings size={18} />, path: '/maintenance' },
    { name: 'Early Warning', icon: <AlertTriangle size={18} />, path: '/warning' },
    { name: 'Risk Levels', icon: <Activity size={18} />, path: '/risk' },
    { name: 'Scheduler', icon: <Zap size={18} />, path: '/scheduler' },
  ];

  return (
    <aside style={sidebarStyle}>
      <div style={logoStyle}>
        <div style={logoSquare}>
          <Activity color="white" size={20} />
        </div>
        <div>
           <h2 style={{ fontSize: '1.25rem', fontWeight: '800', lineHeight: 1 }}>EcoRetain</h2>
           <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: '700', letterSpacing: '0.1em' }}>AI INDUSTRIAL</span>
        </div>
      </div>
      
      <nav style={navStyle}>
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            style={({ isActive }) => ({
              ...linkStyle,
              backgroundColor: isActive ? 'var(--primary-glow)' : 'transparent',
              color: isActive ? 'var(--primary)' : 'var(--text-muted)',
              borderLeft: isActive ? '4px solid var(--primary)' : '4px solid transparent',
              paddingLeft: isActive ? 'calc(1.5rem - 4px)' : '1.5rem'
            })}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
              {item.icon}
              <span style={{ fontWeight: '600' }}>{item.name}</span>
            </div>
            <ChevronRight size={14} style={{ opacity: 0.3 }} />
          </NavLink>
        ))}
      </nav>

      <div style={syncFooter}>
         <button 
           onClick={handleSync} 
           disabled={syncing}
           style={{
             ...syncBtn,
             backgroundColor: syncing ? 'var(--primary-glow)' : 'var(--surface-light)',
             color: syncing ? 'var(--primary)' : 'var(--text-muted)'
           }}
         >
           {syncing ? <RefreshCw size={16} className="animate-spin" /> : <RefreshCw size={16} />}
           <span>{syncing ? 'SYNCING...' : 'SYNC NOW'}</span>
         </button>
      </div>
    </aside>
  );
};

const sidebarStyle = {
  width: '280px',
  backgroundColor: 'var(--surface-light)',
  borderRight: '1px solid var(--border)',
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  position: 'sticky',
  top: 0,
  zIndex: 100
};

const logoStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  padding: '2rem 1.75rem',
  marginBottom: '1rem'
};

const logoSquare = {
  width: '36px',
  height: '36px',
  backgroundColor: 'var(--primary)',
  borderRadius: '10px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0 8px 16px -4px var(--primary-glow)'
};

const navStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.25rem',
  flex: 1
};

const linkStyle = {
  display: 'flex',
  alignItems: 'center',
  padding: '0.8rem 1.5rem',
  textDecoration: 'none',
  fontSize: '0.9rem',
  transition: 'all 0.2s ease',
};

const syncFooter = {
  marginTop: 'auto',
  padding: '1.5rem',
  borderTop: '1px solid var(--border)',
};

const syncBtn = {
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.75rem',
  padding: '0.75rem',
  border: '1px solid var(--border)',
  borderRadius: '10px',
  fontSize: '0.75rem',
  fontWeight: '800',
  cursor: 'pointer',
  transition: 'all 0.2s',
  boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)'
};

export default Sidebar;
