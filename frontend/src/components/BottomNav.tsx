import { Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, Users, Network, Shield } from 'lucide-react'
import { cn } from '@/lib/utils'

export function BottomNav() {
  const location = useLocation()

  const links = [
    { to: '/', label: 'Home', icon: LayoutDashboard },
    { to: '/customers', label: 'Users', icon: Users },
    { to: '/workflows', label: 'Flows', icon: Network },
    { to: '/team', label: 'Team', icon: Shield },
  ]

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 md:hidden w-[90%] max-w-sm">
      <div className="glass px-6 py-4 rounded-[2rem] flex items-center justify-between shadow-2xl shadow-black/50">
        {links.map((link) => {
          const Icon = link.icon
          const isActive = location.pathname === link.to
          return (
            <Link
              key={link.to}
              to={link.to}
              className={cn(
                "flex flex-col items-center gap-1 transition-all",
                isActive 
                  ? "text-primary scale-110" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <div className={cn("p-2 rounded-full", isActive && "bg-primary/20 shadow-[0_0_10px_rgba(124,58,237,0.3)]")}>
                <Icon size={20} />
              </div>
              <span className="text-[10px] font-medium">{link.label}</span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
