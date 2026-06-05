import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom'
import { FloatingNavbar } from '@/components/FloatingNavbar'
import { BottomNav } from '@/components/BottomNav'
import { AppCommandMenu } from '@/components/AppCommandMenu'
import Dashboard from '@/pages/Dashboard'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import OrgSignup from '@/pages/OrgSignup'
import CustomerUpload from '@/pages/CustomerUpload'
import CustomerTable from '@/pages/CustomerTable'
import TeamManagement from '@/pages/TeamManagement'
import Billing from '@/pages/Billing'
import WorkflowBuilder from '@/pages/WorkflowBuilder'
import ApiKeys from '@/pages/ApiKeys'
import CustomerProfile from '@/pages/CustomerProfile'
import AICopilot from '@/pages/AICopilot'
import Analytics from '@/pages/Analytics'
import ExecutiveDashboard from '@/pages/ExecutiveDashboard'
import Integrations from '@/pages/Integrations'
import CampaignBuilder from '@/pages/CampaignBuilder'
import AuditLogs from '@/pages/AuditLogs'
import WhiteLabelSettings from '@/pages/WhiteLabelSettings'
import { useState } from 'react'

const Layout = () => {
  const [cmdkOpen, setCmdkOpen] = useState(false)

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground relative pb-24 md:pb-0 pt-24 md:pt-28">
      <FloatingNavbar onOpenCmdk={() => setCmdkOpen(true)} />
      <BottomNav />
      <AppCommandMenu open={cmdkOpen} setOpen={setCmdkOpen} />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Outlet />
      </main>
    </div>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/org-setup" element={<OrgSignup />} />
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/exec" element={<ExecutiveDashboard />} />
          <Route path="/copilot" element={<AICopilot />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/profile" element={<CustomerProfile />} />
          <Route path="/integrations" element={<Integrations />} />
          <Route path="/upload" element={<CustomerUpload />} />
          <Route path="/customers" element={<CustomerTable />} />
          <Route path="/team" element={<TeamManagement />} />
          <Route path="/billing" element={<Billing />} />
          <Route path="/workflows" element={<WorkflowBuilder />} />
          <Route path="/api-keys" element={<ApiKeys />} />
          <Route path="/campaigns" element={<CampaignBuilder />} />
          <Route path="/audit-logs" element={<AuditLogs />} />
          <Route path="/white-label" element={<WhiteLabelSettings />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
