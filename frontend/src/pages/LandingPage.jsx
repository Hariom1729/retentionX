import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Zap, Shield, Cpu, Activity, 
  ArrowRight, BarChart3, Radio, Network 
} from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div style={container}>
      {/* RADIANT BACKGROUND ELEMENTS */}
      <div style={blob1} />
      <div style={blob2} />

      <main style={heroSection}>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={heroContent}
        >
          <div style={tag}>
             <Zap size={14} color="#10b981" /> 
             <span>NEXT-GEN INDUSTRIAL INTELLIGENCE</span>
          </div>
          <h1 style={title}>EcoRetain <span style={gradientText}>AI</span></h1>
          <h2 style={subtitle}>Predictive Mission Control & Strategic ROI Engine</h2>
          <p style={description}>
            Transforming industrial maintenance from reactive costs to predictive savings. 
            Real-time neural monitoring, automated field dispatch, and multi-asset intelligence 
            designed for the Industry 4.0 factory floor.
          </p>

          <Link 
            to="/dashboard"
            style={ctaBtn}
            className="cta-glow"
          >
            ENTER MISSION CONTROL <ArrowRight size={20} />
          </Link>
        </motion.div>

        {/* FEATURES GRID */}
        <div style={featuresGrid}>
          <FeatureCard 
            icon={<Network color="#10b981" />} 
            title="Neural Fleet Monitoring" 
            desc="Continuous 100-node heatmap analysis for real-time anomaly detection." 
          />
          <FeatureCard 
            icon={<Shield color="#6366f1" />} 
            title="Strategic ROI Insight" 
            desc="Automated carbon reduction tracking and maintenance cost optimization." 
          />
          <FeatureCard 
            icon={<Cpu color="#f59e0b" />} 
            title="Closed-Loop Dispatch" 
            desc="AI-generated repair missions with direct technician scheduling." 
          />
        </div>
      </main>

      {/* FOOTER STRIP */}
      <footer style={footer}>
         <div style={{ display: 'flex', gap: '2rem', opacity: 0.5 }}>
            <span>VERSION 4.2.0</span>
            <span>NEURAL KERNEL: ACTIVE</span>
            <span>ENCRYPTED SATELLITE LINK</span>
         </div>
      </footer>

      <style>{`
        .cta-glow:hover {
          transform: scale(1.05) translateY(-5px);
          box-shadow: 0 15px 50px rgba(16, 185, 129, 0.4);
        }
        @keyframes float {
          0% { transform: translate(0, 0); }
          50% { transform: translate(-20px, 20px); }
          100% { transform: translate(0, 0); }
        }
      `}</style>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }) => (
  <motion.div 
    whileHover={{ y: -10 }}
    style={fCard}
  >
    <div style={fIconBox}>{icon}</div>
    <h3 style={fTitle}>{title}</h3>
    <p style={fDesc}>{desc}</p>
  </motion.div>
);

// STYLES
const container = { 
  minHeight: '100vh', width: '100%', background: '#f8fafc', 
  color: '#0f172a', display: 'flex', flexDirection: 'column', 
  alignItems: 'center', justifyContent: 'center',
  padding: '6rem 0', fontFamily: "'Outfit', sans-serif",
  position: 'relative', zIndex: 20000
};

const blob1 = { 
  position: 'absolute', top: '-10%', left: '-10%', width: '50vw', height: '50vw',
  background: 'radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 70%)',
  animation: 'float 20s infinite alternate', zIndex: -1
};

const blob2 = { 
  position: 'absolute', bottom: '-10%', right: '-10%', width: '50vw', height: '50vw',
  background: 'radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%)',
  animation: 'float 15s infinite alternate-reverse', zIndex: -1
};

const heroSection = { 
  maxWidth: '1200px', width: '90%', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' 
};

const heroContent = { marginBottom: '5rem' };

const tag = { 
  display: 'inline-flex', alignItems: 'center', gap: '0.75rem', padding: '0.6rem 1.2rem',
  background: '#fff', borderRadius: '100px', border: '1px solid #e2e8f0',
  fontSize: '0.75rem', fontWeight: '900', color: '#10b981', marginBottom: '2rem', letterSpacing: '0.1em',
  boxShadow: '0 4px 10px rgba(0,0,0,0.03)'
};

const title = { fontSize: '6rem', fontWeight: '1000', letterSpacing: '-0.05em', marginBottom: '1rem', color: '#0f172a' };
const gradientText = { background: 'linear-gradient(135deg, #10b981 0%, #4f46e5 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' };
const subtitle = { fontSize: '1.5rem', color: '#475569', fontWeight: '700', marginBottom: '2.5rem' };
const description = { maxWidth: '700px', margin: '0 auto 3.5rem', fontSize: '1.1rem', color: '#64748b', lineHeight: '1.8', fontWeight: '500' };

const ctaBtn = { 
  padding: '1.25rem 3rem', background: '#10b981', color: '#fff', border: 'none', borderRadius: '100px',
  fontSize: '1rem', fontWeight: '1000', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '1rem',
  transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)', boxShadow: '0 10px 30px rgba(16, 185, 129, 0.3)'
};

const featuresGrid = { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', width: '100%' };
const fCard = { background: '#fff', padding: '2.5rem', borderRadius: '40px', border: '1px solid #f1f5f9', textAlign: 'left', boxShadow: '0 20px 40px rgba(0,0,0,0.03)' };
const fIconBox = { width: '50px', height: '50px', borderRadius: '18px', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', border: '1px solid #f1f5f9' };
const fTitle = { fontSize: '1.25rem', fontWeight: '900', marginBottom: '0.75rem', color: '#1e293b' };
const fDesc = { fontSize: '0.9rem', color: '#64748b', lineHeight: '1.6', fontWeight: '600' };

const footer = { position: 'absolute', bottom: '2rem', fontSize: '0.6rem', fontWeight: '900', color: '#94a3b8', letterSpacing: '0.2em' };

export default LandingPage;
