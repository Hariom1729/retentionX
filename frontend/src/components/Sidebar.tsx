import { Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, Users, LogOut, Network } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Sidebar() {
  const location = useLocation()

  const links = [
    { to: '/', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/exec', label: 'Executive Dashboard', icon: LayoutDashboard },
    { to: '/copilot', label: 'AI Copilot', icon: Network },
    { to: '/analytics', label: 'Analytics', icon: Users },
    { to: '/profile', label: 'Customer Profile', icon: Users },
    { to: '/customers', label: 'All Customers', icon: Users },
    { to: '/integrations', label: 'Integrations', icon: Network },
    { to: '/workflows', label: 'Workflows', icon: Network },
  ]

  return (
    <aside className="w-64 glass border-r border-border h-full flex flex-col p-4 z-10">
      <div className="flex items-center gap-2 px-2 py-4 mb-6">
        <div className="w-8 h-8 rounded bg-primary flex items-center justify-center font-bold text-primary-foreground">
          RX
        </div>
        <span className="text-xl font-bold tracking-tight">RetentionX</span>
      </div>

      <nav className="flex flex-col gap-2 flex-1">
        {links.map((link) => {
          const Icon = link.icon
          const isActive = location.pathname === link.to
          return (
            <Link
              key={link.to}
              to={link.to}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                isActive 
                  ? "bg-primary/20 text-primary font-medium" 
                  : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
              )}
            >
              <Icon size={18} />
              {link.label}
            </Link>
          )
        })}
      </nav>

      <div className="mt-auto">
        <Link
          to="/login"
          className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
        >
          <LogOut size={18} />
          Logout
        </Link>
      </div>
    </aside>
  )
}
