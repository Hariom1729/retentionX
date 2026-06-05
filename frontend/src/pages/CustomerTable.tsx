import { useState, useRef, useCallback } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, SlidersHorizontal, X, User } from 'lucide-react'

// Mock Data
const MOCK_CUSTOMERS = Array.from({ length: 150 }).map((_, i) => {
  const segment = ['Enterprise', 'Mid-Market', 'SMB'][Math.floor(Math.random() * 3)];
  const tags = segment === 'Enterprise' ? ['VIP', 'High Touch'] : segment === 'Mid-Market' ? ['Growing'] : ['Self-serve'];
  return {
    id: `CUS-${1000 + i}`,
    name: `Customer ${i + 1}`,
    email: `contact${i + 1}@company.com`,
    segment,
    tags,
    status: Math.random() > 0.2 ? 'Active' : 'Churned',
    revenue: `$${Math.floor(Math.random() * 10000) + 1000}`
  };
})

export default function CustomerTable() {
  const [search, setSearch] = useState('')
  const [displayedCount, setDisplayedCount] = useState(20)
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null)
  
  const observerRef = useRef<IntersectionObserver | null>(null)
  const loadMoreRef = useCallback((node: any) => {
    if (observerRef.current) observerRef.current.disconnect()
    observerRef.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setDisplayedCount(prev => prev + 20)
      }
    })
    if (node) observerRef.current.observe(node)
  }, [])

  const filtered = MOCK_CUSTOMERS.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase())
  )

  const currentData = filtered.slice(0, displayedCount)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Customer Management</h1>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All Customers</CardTitle>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  type="search" 
                  placeholder="Search customers..." 
                  className="pl-8 w-[250px]"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value)
                    setDisplayedCount(20)
                  }}
                />
              </div>
              <Button variant="outline" size="icon" className="border-border bg-white/5">
                <SlidersHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Segment</TableHead>
                  <TableHead>Tags</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Revenue</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                  {currentData.length > 0 ? currentData.map((customer, idx) => (
                  <TableRow 
                    key={customer.id} 
                    className="cursor-pointer hover:bg-white/5"
                    onClick={() => setSelectedCustomer(customer)}
                    ref={idx === currentData.length - 1 ? loadMoreRef : null}
                  >
                    <TableCell className="font-medium">{customer.id}</TableCell>
                    <TableCell>{customer.name}</TableCell>
                    <TableCell className="text-muted-foreground">{customer.email}</TableCell>
                    <TableCell>{customer.segment}</TableCell>
                    <TableCell>
                      <div className="flex gap-1 flex-wrap">
                        {customer.tags.map(tag => (
                          <span key={tag} className="px-2 py-0.5 rounded-full text-[10px] uppercase font-bold bg-primary/20 text-primary border border-primary/20">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        customer.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                      }`}>
                        {customer.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">{customer.revenue}</TableCell>
                  </TableRow>
                )) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center h-24 text-muted-foreground">
                      No customers found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </motion.div>

          {displayedCount < filtered.length && (
            <div className="py-4 text-center text-sm text-muted-foreground">
              Scroll for more...
            </div>
          )}
        </CardContent>
      </Card>

      <AnimatePresence>
        {selectedCustomer && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-zinc-950 border-l border-white/10 shadow-2xl z-50 overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Customer Timeline
                </h2>
                <Button variant="ghost" size="icon" onClick={() => setSelectedCustomer(null)}>
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-1">{selectedCustomer.name}</h3>
                <p className="text-muted-foreground mb-4">{selectedCustomer.email}</p>
                <div className="flex gap-2 mb-4">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-white">
                    {selectedCustomer.segment}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    selectedCustomer.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                  }`}>
                    {selectedCustomer.status}
                  </span>
                </div>
              </div>

              <div className="relative border-l border-white/10 ml-3 space-y-8 pb-8">
                {[
                  { title: 'Plan Upgraded', date: 'Oct 24, 2026', desc: 'Upgraded to Enterprise' },
                  { title: 'Feature Usage Spike', date: 'Sep 12, 2026', desc: 'Used Workflow builder 50 times' },
                  { title: 'Support Ticket', date: 'Aug 05, 2026', desc: 'Resolved issue with API Keys' },
                  { title: 'Account Created', date: 'Jan 15, 2026', desc: 'Signed up via Google' },
                ].map((event, i) => (
                  <div key={i} className="relative pl-6">
                    <span className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-primary border-2 border-zinc-950" />
                    <h4 className="text-sm font-bold text-white">{event.title}</h4>
                    <span className="text-xs text-muted-foreground">{event.date}</span>
                    <p className="text-sm text-zinc-400 mt-1">{event.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
