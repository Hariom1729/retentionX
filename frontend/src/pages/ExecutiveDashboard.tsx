
import { motion } from 'framer-motion';
import { DollarSign, Users, Activity, TrendingUp, TrendingDown, Briefcase, ChevronRight, Download, FileText } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const revenueData = [
  { name: 'Jan', value: 40000 },
  { name: 'Feb', value: 45000 },
  { name: 'Mar', value: 52000 },
  { name: 'Apr', value: 48000 },
  { name: 'May', value: 61000 },
  { name: 'Jun', value: 68000 },
];

const csData = [
  { client: 'Acme Corp', manager: 'Sarah J.', status: 'At Risk', mrr: '$4,500', health: 45 },
  { client: 'Globex', manager: 'Mike T.', status: 'Healthy', mrr: '$2,100', health: 92 },
  { client: 'Soylent', manager: 'Sarah J.', status: 'Onboarding', mrr: '$8,000', health: 78 },
  { client: 'Initech', manager: 'Alex W.', status: 'Healthy', mrr: '$1,200', health: 88 },
];

export default function ExecutiveDashboard() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Executive Overview</h1>
          <p className="text-gray-400">High-level metrics for revenue and customer success operations.</p>
        </div>
        <div className="flex space-x-2 mt-4 sm:mt-0">
          <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-gray-300 hover:bg-white/10 flex items-center gap-2 transition-colors">
            <FileText className="w-4 h-4" /> PDF
          </button>
          <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-gray-300 hover:bg-white/10 flex items-center gap-2 transition-colors">
            <Download className="w-4 h-4" /> Excel
          </button>
        </div>
      </div>

      {/* Top Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: 'Total MRR', value: '$68,000', trend: '+12%', isPositive: true, icon: DollarSign, color: 'text-green-400' },
          { title: 'Active Customers', value: '1,248', trend: '+5%', isPositive: true, icon: Users, color: 'text-blue-400' },
          { title: 'Gross Churn', value: '2.4%', trend: '-0.5%', isPositive: true, icon: Activity, color: 'text-purple-400' },
          { title: 'Net Retention', value: '114%', trend: '+2%', isPositive: true, icon: Briefcase, color: 'text-orange-400' }
        ].map((metric, idx) => {
          const Icon = metric.icon;
          return (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-xl"
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`p-2 rounded-lg bg-white/5 ${metric.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className={`flex items-center gap-1 text-sm ${metric.isPositive ? 'text-green-400' : 'text-red-400'}`}>
                  {metric.isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  {metric.trend}
                </div>
              </div>
              <h3 className="text-gray-400 text-sm mb-1">{metric.title}</h3>
              <p className="text-3xl font-bold text-white">{metric.value}</p>
            </motion.div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-xl">
          <h3 className="text-lg font-semibold text-white mb-6">Revenue Growth (YTD)</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis dataKey="name" stroke="#ffffff50" axisLine={false} tickLine={false} />
                <YAxis stroke="#ffffff50" axisLine={false} tickLine={false} tickFormatter={(val) => `$${val/1000}k`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#000000cc', borderColor: '#ffffff20', borderRadius: '8px' }}
                  itemStyle={{ color: '#10b981' }}
                />
                <Area type="monotone" dataKey="value" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* CS Workspace / Needs Attention */}
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-xl flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-white">Accounts at Risk</h3>
            <button className="text-sm text-blue-400 hover:text-blue-300">View All</button>
          </div>
          
          <div className="flex-1 space-y-4">
            {csData.map((acc, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-black/20 border border-white/5 hover:bg-white/5 transition-colors cursor-pointer group">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-white group-hover:text-blue-400 transition-colors">{acc.client}</h4>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    acc.status === 'At Risk' ? 'bg-red-500/20 text-red-400 border border-red-500/20' : 
                    acc.status === 'Healthy' ? 'bg-green-500/20 text-green-400 border border-green-500/20' :
                    'bg-blue-500/20 text-blue-400 border border-blue-500/20'
                  }`}>
                    {acc.status}
                  </span>
                </div>
                <div className="flex justify-between items-end">
                  <div className="text-sm text-gray-400">
                    <p>MRR: {acc.mrr}</p>
                    <p>CSM: {acc.manager}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className={`text-sm font-semibold ${acc.health < 50 ? 'text-red-400' : 'text-green-400'}`}>{acc.health}/100</span>
                    <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-white" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
