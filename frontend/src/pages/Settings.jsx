import React from 'react';
import { Settings as SettingsIcon, Bell, Shield, User, Database, Code } from 'lucide-react';

const Settings = () => {
  const sections = [
    { title: 'User Profile', icon: <User size={20} />, text: 'Manage account and branding' },
    { title: 'Notifications', icon: <Bell size={20} />, text: 'Set alert thresholds and channels' },
    { title: 'System Security', icon: <Shield size={20} />, text: 'Control access and API keys' },
    { title: 'Data Source', icon: <Database size={20} />, text: 'Configure dataset paths and CSV sync' },
    { title: 'Model Engine', icon: <Code size={20} />, text: 'ML model hyper-parameters and versions' },
  ];

  return (
    <div style={{ maxWidth: '800px' }}>
      <header style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '2.25rem', fontWeight: 'bold' }}>Control Panel Settings</h1>
        <p style={{ color: 'var(--text-muted)' }}>Configure core engine and interface preferences</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
        {sections.map(s => (
          <div key={s.title} className="glass-card" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: 'var(--surface-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
              {s.icon}
            </div>
            <div>
              <h4 style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>{s.title}</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{s.text}</p>
            </div>
            <div style={{ marginLeft: 'auto', padding: '0.5rem', borderRadius: '0.5rem', backgroundColor: 'var(--surface-light)' }}>
              <SettingsIcon size={16} />
            </div>
          </div>
        ))}
      </div>

      <div className="glass-card" style={{ marginTop: '2.5rem', padding: '2rem', border: '1px dashed var(--primary)' }}>
        <h3 style={{ marginBottom: '1rem' }}>Global Theme Override</h3>
        <p style={{ marginBottom: '2rem', color: 'var(--text-muted)' }}>Current Mode: Light (Emerald Theme)</p>
        <button style={{ padding: '0.75rem 1.5rem', borderRadius: '0.75rem', border: 'none', background: 'var(--primary)', color: 'white', fontWeight: '600', cursor: 'pointer' }}>Apply Dark Mode</button>
      </div>

      <div style={{ marginTop: '3rem' }}>
        <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>External Integrations</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
          {['Slack', 'Microsoft Teams', 'PagerDuty'].map(app => (
            <div key={app} className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '1rem' }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'var(--surface-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Bell size={24} color="var(--primary)" />
              </div>
              <div>
                <h4 style={{ fontWeight: '600' }}>{app}</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Send Risk Alert Webhooks</p>
              </div>
              <button style={{ marginTop: 'auto', padding: '0.5rem 1rem', borderRadius: '2rem', border: '1px solid var(--border)', background: 'var(--background)', color: 'var(--text)', cursor: 'pointer' }}>
                Connect Hub
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Settings;
