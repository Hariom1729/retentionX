import React from 'react';
import axios from 'axios';
import { AlertTriangle, ShieldAlert, Info } from 'lucide-react';

const api = axios.create({ baseURL: 'http://127.0.0.1:8000/api' });

const Alerts = () => {
  const [alerts, setAlerts] = React.useState([]);

  React.useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const res = await api.get('/alerts');
        setAlerts(res.data);
      } catch (err) {
        console.error("Error fetching alerts:", err);
      }
    };
    fetchAlerts();
  }, []);

  return (
    <div style={{ maxWidth: '800px' }}>
      <h1 style={{ marginBottom: '2rem' }}>System Alerts</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {alerts.map(a => (
          <div key={a.id} className="glass-card" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <div style={{ 
              padding: '0.75rem', 
              borderRadius: '0.5rem', 
              backgroundColor: a.type === 'Critical' ? '#fee2e2' : a.type === 'Warning' ? '#fef3c7' : '#dcfce7' 
            }}>
              {a.type === 'Critical' ? <ShieldAlert color="#dc2626" /> : a.type === 'Warning' ? <AlertTriangle color="#d97706" /> : <Info color="#16a34a" />}
            </div>
            <div style={{ flex: 1 }}>
              <h4 style={{ fontSize: '1rem' }}>{a.msg}</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{a.machine} • {a.time}</p>
            </div>
            <button style={{ padding: '0.5rem 1rem', border: '1px solid var(--border)', borderRadius: '0.5rem', background: 'none' }}>Acknowledge</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Alerts;
