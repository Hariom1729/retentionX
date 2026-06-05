import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { motion } from 'framer-motion'
import { Users, TrendingUp, DollarSign, Activity, FileText, Download } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useSocket } from '@/hooks/useSocket'

const retentionData = [
  { month: 'Jan', rate: 85 },
  { month: 'Feb', rate: 86 },
  { month: 'Mar', rate: 89 },
  { month: 'Apr', rate: 88 },
  { month: 'May', rate: 92 },
  { month: 'Jun', rate: 94 },
]

const initialRevenueData = [
  { month: 'Jan', rev: 4000 },
  { month: 'Feb', rev: 4500 },
  { month: 'Mar', rev: 5200 },
  { month: 'Apr', rev: 5000 },
  { month: 'May', rev: 6100 },
  { month: 'Jun', rev: 6800 },
]

export default function Dashboard() {
  const [retData, setRetData] = useState(retentionData)
  const [revData, setRevData] = useState(initialRevenueData)
  
  const socket = useSocket('http://localhost:3000')

  useEffect(() => {
    if (!socket) return;
    
    socket.on('dashboard_update', (data: any) => {
      if (data.retentionData) setRetData(data.retentionData)
      if (data.revenueData) setRevData(data.revenueData)
    })

    return () => {
      socket.off('dashboard_update')
    }
  }, [socket])
  const kpis = [
    { title: 'Total Customers', value: '1,429', icon: Users, trend: '+4.5%' },
    { title: 'Retention Rate', value: '94%', icon: TrendingUp, trend: '+2.1%' },
    { title: 'Monthly Revenue', value: '$68,000', icon: DollarSign, trend: '+11.4%' },
    { title: 'Active Sessions', value: '892', icon: Activity, trend: '-1.2%' },
  ]

  return (
    <div className="space-y-8 pb-10">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-primary/20 via-background to-accent/20 border border-white/10 p-8 sm:p-12 glass shadow-2xl"
      >
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4 text-white">
            Good morning, Alex.
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Your MRR is up <span className="text-green-400 font-semibold">11.4%</span> this month. You're on track to hit $75k by Q3.
          </p>
          <div className="flex items-center gap-4">
            <button className="px-6 py-3 rounded-full bg-primary text-white font-medium hover:bg-primary/90 transition-all hover:shadow-[0_0_20px_rgba(124,58,237,0.5)]">
              View Report
            </button>
            <button className="px-6 py-3 rounded-full bg-white/10 text-white font-medium hover:bg-white/20 transition-all border border-white/10">
              Manage Segments
            </button>
            <div className="flex space-x-2 ml-4">
              <button className="px-4 py-3 rounded-full bg-white/5 text-white font-medium hover:bg-white/10 transition-all border border-white/10 flex items-center">
                <FileText className="w-4 h-4 mr-2" />
                PDF
              </button>
              <button className="px-4 py-3 rounded-full bg-white/5 text-white font-medium hover:bg-white/10 transition-all border border-white/10 flex items-center">
                <Download className="w-4 h-4 mr-2" />
                Excel
              </button>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute right-0 top-0 w-1/2 h-full opacity-30 pointer-events-none hidden lg:block">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-primary rounded-full blur-[100px]"></div>
          <div className="absolute top-1/4 right-1/4 w-[200px] h-[200px] bg-accent rounded-full blur-[80px]"></div>
        </div>
      </motion.div>

      {/* KPIs */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi, index) => {
          const Icon = kpi.icon
          const isPositive = kpi.trend.startsWith('+')
          return (
            <motion.div
              key={kpi.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <Card className="group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
                  <CardTitle className="text-sm font-medium text-muted-foreground">{kpi.title}</CardTitle>
                  <div className="p-2 bg-white/5 rounded-full group-hover:bg-primary/20 transition-colors">
                    <Icon className="h-4 w-4 text-foreground group-hover:text-primary transition-colors" />
                  </div>
                </CardHeader>
                <CardContent className="relative z-10">
                  <div className="text-3xl font-bold tracking-tight mb-1">{kpi.value}</div>
                  <p className={`text-xs font-medium flex items-center gap-1 ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                    {isPositive ? '↑' : '↓'} {kpi.trend} <span className="text-muted-foreground font-normal">vs last month</span>
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}>
          <Card>
            <CardHeader>
              <CardTitle>Revenue Growth</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#7C3AED" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff0a" vertical={false} />
                  <XAxis dataKey="month" stroke="#888888" axisLine={false} tickLine={false} />
                  <YAxis stroke="#888888" axisLine={false} tickLine={false} tickFormatter={(val) => `$${val/1000}k`} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', backdropFilter: 'blur(10px)' }} 
                    itemStyle={{ color: '#fff' }}
                  />
                  <Area type="monotone" dataKey="rev" stroke="#7C3AED" strokeWidth={3} fill="url(#colorRev)" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }}>
          <Card>
            <CardHeader>
              <CardTitle>Retention Trend</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={retData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff0a" vertical={false} />
                  <XAxis dataKey="month" stroke="#888888" axisLine={false} tickLine={false} />
                  <YAxis stroke="#888888" axisLine={false} tickLine={false} domain={['auto', 'auto']} tickFormatter={(val) => `${val}%`} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', backdropFilter: 'blur(10px)' }} 
                  />
                  <Line type="monotone" dataKey="rate" stroke="#06B6D4" strokeWidth={3} dot={{ r: 4, fill: '#06B6D4', strokeWidth: 2, stroke: '#000' }} activeDot={{ r: 6, strokeWidth: 0 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* AI Insights Panel */}
        <motion.div className="md:col-span-2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <Card className="border-primary/30 bg-gradient-to-r from-primary/10 via-background to-accent/5 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3"></div>
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary shadow-[0_0_15px_rgba(124,58,237,0.3)]">
                  ✨
                </div>
                AI Retention Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="glass p-5 rounded-2xl flex items-start gap-4 hover:bg-white/10 transition-colors">
                  <div className="mt-1 w-3 h-3 rounded-full bg-green-400 shadow-[0_0_10px_rgba(74,222,128,0.5)] flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground mb-1 text-base">Retention Boost</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">The new onboarding flow introduced in May has significantly improved activation rates for the SMB segment.</p>
                  </div>
                </div>
                <div className="glass p-5 rounded-2xl flex items-start gap-4 hover:bg-white/10 transition-colors">
                  <div className="mt-1 w-3 h-3 rounded-full bg-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.5)] flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground mb-1 text-base">Churn Risk: Mid-Market</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">Users who haven't logged in for 14 days have a 65% chance of churning. <span className="text-primary cursor-pointer hover:underline">Deploy an automated reactivation email.</span></p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
