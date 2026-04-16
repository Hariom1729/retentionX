import React from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  BarChart3,
  BrainCircuit,
  ShieldAlert,
  Radio,
  Brain,
  CalendarRange,
  Bell,
  Settings,
  Activity,
  Search,
  RefreshCw,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Page Imports
import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import Predictor from "./pages/Predictor";
import RiskClassification from "./pages/RiskClassification";
import EarlyWarning from "./pages/EarlyWarning";
import SmartMaintenance from "./pages/SmartMaintenance";
import MaintenanceScheduler from "./pages/MaintenanceScheduler";
import Alerts from "./pages/Alerts";
import SettingsPage from "./pages/Settings";
import LandingPage from "./pages/LandingPage";

const App = () => {
  const location = useLocation();

  const navItems = [
    {
      to: "/dashboard",
      icon: <LayoutDashboard size={20} />,
      label: "Dashboard",
    },
    {
      to: "/inventory",
      icon: <BarChart3 size={20} />,
      label: "Fleet Inventory",
    },
    { to: "/smart", icon: <Brain size={20} />, label: "Smart Maint." },
    { to: "/warning", icon: <Radio size={20} />, label: "Early Warning" },
    { to: "/risk", icon: <ShieldAlert size={20} />, label: "Risk Levels" },
    { to: "/schedule", icon: <CalendarRange size={20} />, label: "Scheduler" },
  ];

  const isLanding = location.pathname === "/";

  return (
    <div style={layoutContainer}>
      {!isLanding && (
        <aside style={sidebarStyle} className="sidebar-shadow">
          <div style={logoContainer}>
            <div style={logoIcon}>
              <Activity color="#fff" size={24} />
            </div>
            <div>
              <h1 style={logoText}>EcoRetain</h1>
              <span
                style={{
                  fontSize: "0.6rem",
                  color: "#94a3b8",
                  fontWeight: "900",
                  letterSpacing: "0.1em",
                }}
              >
                AI INDUSTRIAL
              </span>
            </div>
          </div>

          <nav style={navGroup}>
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                icon={item.icon}
                label={item.label}
                active={location.pathname === item.to}
              />
            ))}
          </nav>
        </aside>
      )}

      <main style={mainContent}>
        {!isLanding && (
          <header style={{ ...topHeader, padding: "0 2.5rem" }}>
            <div style={searchBox}>
              <Search size={18} color="#94a3b8" />
              <input
                type="text"
                placeholder="Search Neural Nodes..."
                style={topSearch}
              />
            </div>
            <div
              style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}
            >
              <Bell size={20} color="#64748b" />
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "12px",
                  background: "#f1f5f9",
                  border: "1px solid #e2e8f0",
                }}
              />
            </div>
          </header>
        )}

        <div style={isLanding ? { width: "100%" } : pageWrapper}>
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <Routes location={location}>
                <Route path="/" element={<LandingPage />} />
                <Route path="/dashboard" element={<Dashboard />} />
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

        {/* FLOATING AI COMMAND BUTTON */}
        <Link
          to="/predictor"
          className="floating-ai-btn"
          style={{
            position: "fixed",
            bottom: "2.5rem",
            right: "2.5rem",
            background: "#0f172a",
            color: "#10b981",
            padding: "1rem 1.6rem",
            borderRadius: "100px",
            textDecoration: "none",
            display: location.pathname === "/predictor" ? "none" : "flex",
            alignItems: "center",
            gap: "0.75rem",
            boxShadow: "0 10px 40px rgba(16, 185, 129, 0.4)",
            border: "1px solid #10b981",
            zIndex: 9999,
            overflow: "hidden",
          }}
        >
          <BrainCircuit size={24} />
          <span
            style={{
              fontWeight: "900",
              fontSize: "0.8rem",
              letterSpacing: "0.05em",
            }}
          >
            AI SCAN
          </span>

          <style>{`
            .floating-ai-btn {
              position: fixed; bottom: 2.5rem; right: 2.5rem;
              background: #0f172a; color: #10b981;
              padding: 1.1rem 1.8rem; border-radius: 100px;
              text-decoration: none; align-items: center; gap: 0.8rem;
              box-shadow: 0 10px 40px rgba(16, 185, 129, 0.4);
              border: 1px solid #10b981; z-index: 9999;
              transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
              animation: ai-agent-idle 4s infinite ease-in-out;
              perspective: 1000px; overflow: hidden;
              display: flex;
            }
            .floating-ai-btn:hover {
              transform: scale(1.15) translateY(-15px) rotateX(10deg) rotateY(-10deg);
              background: #10b981 !important; color: #fff !important;
              box-shadow: 0 0 50px rgba(16, 185, 129, 0.8), 0 30px 60px rgba(0,0,0,0.3) !important;
            }
            .floating-ai-btn::before {
              content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 100%;
              background: #10b981; opacity: 0; border-radius: 100px; z-index: -1;
            }
            .floating-ai-btn:hover::before { animation: agent-ping 1.5s infinite ease-out; }
            .floating-ai-btn::after {
              content: ''; position: absolute; top: 0; left: -100%; width: 100%; height: 100%;
              background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
              transition: 0.6s;
            }
            .floating-ai-btn:hover::after { left: 100%; }

            @keyframes ai-agent-idle {
              0%, 100% { transform: translateY(0); box-shadow: 0 10px 40px rgba(16, 185, 129, 0.4); }
              50% { transform: translateY(-8px); box-shadow: 0 15px 50px rgba(16, 185, 129, 0.6); }
            }
            @keyframes agent-ping {
              0% { transform: scale(1); opacity: 0.4; }
              100% { transform: scale(1.6); opacity: 0; }
            }
          `}</style>
        </Link>
      </main>
    </div>
  );
};

const NavLink = ({ to, icon, label, active }) => (
  <Link
    to={to}
    style={{
      ...navLinkStyle,
      backgroundColor: active ? "rgba(16, 185, 129, 0.1)" : "transparent",
      color: active ? "#10b981" : "#64748b",
    }}
  >
    <div style={navIcon}>{icon}</div>
    <span style={{ flex: 1, fontWeight: active ? "900" : "700" }}>{label}</span>
    {active && <ChevronRight size={14} style={{ opacity: 0.5 }} />}
  </Link>
);

const ChevronRight = ({ size, style }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={style}
  >
    <path d="m9 18 6-6-6-6" />
  </svg>
);

const layoutContainer = {
  display: "flex",
  minHeight: "100vh",
  backgroundColor: "#f8fafc",
};
const sidebarStyle = {
  width: "260px",
  background: "#fff",
  padding: "2.5rem 1.25rem",
  display: "flex",
  flexDirection: "column",
  position: "sticky",
  top: 0,
  height: "100vh",
  borderRight: "1px solid #f1f5f9",
  zIndex: 100,
};
const logoContainer = {
  display: "flex",
  alignItems: "center",
  gap: "0.75rem",
  marginBottom: "3rem",
  paddingLeft: "0.5rem",
};
const logoIcon = {
  width: "40px",
  height: "40px",
  background: "#10b981",
  borderRadius: "16px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "0 8px 16px rgba(16, 185, 129, 0.2)",
};
const logoText = {
  color: "#0f172a",
  fontSize: "1.25rem",
  fontWeight: "900",
  letterSpacing: "-0.02em",
  display: "block",
};

const navGroup = { display: "flex", flexDirection: "column", gap: "0.4rem" };
const navLinkStyle = {
  display: "flex",
  alignItems: "center",
  gap: "1rem",
  padding: "0.85rem 1rem",
  borderRadius: "16px",
  textDecoration: "none",
  fontSize: "0.85rem",
  transition: "all 0.2s",
};
const navIcon = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const syncBtn = {
  border: "none",
  background: "none",
  display: "flex",
  alignItems: "center",
  gap: "0.75rem",
  color: "#64748b",
  fontSize: "0.75rem",
  fontWeight: "900",
  cursor: "pointer",
  padding: "1rem",
};

const mainContent = { flex: 1, minHeight: "100vh", overflowY: "auto" };
const topHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  height: "60px",
};
const searchBox = {
  display: "flex",
  alignItems: "center",
  gap: "1rem",
  padding: "0 1.25rem",
  background: "none",
  width: "300px",
  height: "46px",
};
const topSearch = {
  border: "none",
  background: "none",
  fontSize: "0.85rem",
  fontWeight: "700",
  outline: "none",
  width: "100%",
  color: "#94a3b8",
};

const pageWrapper = {
  width: "100%",
  maxWidth: "1600px",
  margin: "0",
  padding: "1.5rem 2rem 5rem",
};

export default App;
