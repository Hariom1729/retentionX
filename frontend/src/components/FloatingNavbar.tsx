import { Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, Users, LogOut, Network, Search } from 'lucide-react'
import { cn } from '@/lib/utils'

export function FloatingNavbar({ onOpenCmdk }: { onOpenCmdk: () => void }) {
  const location = useLocation()

  const links = [
    { to: '/', label: 'Home', icon: LayoutDashboard },
    { to: '/exec', label: 'Exec', icon: LayoutDashboard },
    { to: '/copilot', label: 'Copilot', icon: Network },
    { to: '/analytics', label: 'Analytics', icon: Users },
    { to: '/profile', label: 'Profile', icon: Users },
    { to: '/integrations', label: 'Apps', icon: Network },
    { to: '/customers', label: 'Customers', icon: Users },
  ]

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 hidden md:block">
      <div className="glass px-6 py-3 rounded-full flex items-center gap-6">
        <div className="flex items-center gap-2 mr-4">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center font-bold text-primary-foreground shadow-[0_0_15px_rgba(124,58,237,0.5)]">
            RX
          </div>
        </div>

        <nav className="flex items-center gap-2">
          {links.map((link) => {
            const Icon = link.icon
            const isActive = location.pathname === link.to
            return (
              <Link
                key={link.to}
                to={link.to}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium transition-all duration-200",
                  isActive 
                    ? "bg-white/10 text-primary" 
                    : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                )}
              >
                <Icon size={16} />
                {link.label}
              </Link>
            )
          })}
        </nav>

        <div className="w-[1px] h-6 bg-white/10 mx-2" />
        
        <button 
          onClick={onOpenCmdk}
          className="flex items-center gap-2 px-3 py-2 rounded-full text-sm text-muted-foreground hover:bg-white/5 transition-colors border border-transparent hover:border-white/10"
        >
          <Search size={16} />
          <span>Search...</span>
          <kbd className="ml-2 px-2 py-0.5 text-xs bg-white/10 rounded-md">⌘K</kbd>
        </button>

        <Link
          to="/login"
          className="p-2 rounded-full text-muted-foreground hover:bg-destructive/20 hover:text-destructive transition-colors ml-2"
          title="Logout"
        >
          <LogOut size={18} />
        </Link>
      </div>
    </div>
  )
}
