import { useEffect } from 'react'
import { Command } from 'cmdk'
import { useNavigate } from 'react-router-dom'
import { LayoutDashboard, Users, Upload, Network, Shield, CreditCard } from 'lucide-react'

export function AppCommandMenu({ open, setOpen }: { open: boolean, setOpen: (open: boolean) => void }) {
  const navigate = useNavigate()

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen(true)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [setOpen])

  const runCommand = (command: () => void) => {
    setOpen(false)
    command()
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] bg-black/60 backdrop-blur-sm px-4">
      <div className="fixed inset-0" onClick={() => setOpen(false)} />
      <Command 
        className="relative w-full max-w-lg glass-card overflow-hidden shadow-2xl flex flex-col"
        onKeyDown={(e) => {
          if (e.key === 'Escape') setOpen(false)
        }}
      >
        <Command.Input 
          autoFocus
          placeholder="Type a command or search..." 
          className="w-full bg-transparent px-4 py-4 text-foreground outline-none border-b border-white/10 placeholder:text-muted-foreground"
        />
        <Command.List className="max-h-[300px] overflow-y-auto p-2">
          <Command.Empty className="py-6 text-center text-sm text-muted-foreground">No results found.</Command.Empty>

          <Command.Group heading="Navigation" className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
            <Command.Item 
              onSelect={() => runCommand(() => navigate('/'))}
              className="flex items-center gap-2 px-2 py-3 mt-1 rounded-lg text-sm text-foreground hover:bg-white/10 cursor-pointer aria-selected:bg-white/10"
            >
              <LayoutDashboard size={16} className="text-primary" /> Dashboard
            </Command.Item>
            <Command.Item 
              onSelect={() => runCommand(() => navigate('/customers'))}
              className="flex items-center gap-2 px-2 py-3 rounded-lg text-sm text-foreground hover:bg-white/10 cursor-pointer aria-selected:bg-white/10"
            >
              <Users size={16} className="text-accent" /> Customers
            </Command.Item>
            <Command.Item 
              onSelect={() => runCommand(() => navigate('/upload'))}
              className="flex items-center gap-2 px-2 py-3 rounded-lg text-sm text-foreground hover:bg-white/10 cursor-pointer aria-selected:bg-white/10"
            >
              <Upload size={16} className="text-primary" /> Upload Data
            </Command.Item>
            <Command.Item 
              onSelect={() => runCommand(() => navigate('/workflows'))}
              className="flex items-center gap-2 px-2 py-3 rounded-lg text-sm text-foreground hover:bg-white/10 cursor-pointer aria-selected:bg-white/10"
            >
              <Network size={16} className="text-accent" /> Workflows
            </Command.Item>
            <Command.Item 
              onSelect={() => runCommand(() => navigate('/team'))}
              className="flex items-center gap-2 px-2 py-3 rounded-lg text-sm text-foreground hover:bg-white/10 cursor-pointer aria-selected:bg-white/10"
            >
              <Shield size={16} className="text-primary" /> Team Management
            </Command.Item>
            <Command.Item 
              onSelect={() => runCommand(() => navigate('/billing'))}
              className="flex items-center gap-2 px-2 py-3 rounded-lg text-sm text-foreground hover:bg-white/10 cursor-pointer aria-selected:bg-white/10"
            >
              <CreditCard size={16} className="text-accent" /> Billing
            </Command.Item>
          </Command.Group>
        </Command.List>
      </Command>
    </div>
  )
}
