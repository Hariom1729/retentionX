import { motion } from 'framer-motion';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer,
  LineChart, Line, Cell
} from 'recharts';
import { Filter, Download, Calendar } from 'lucide-react';

const funnelData = [
  { name: 'Website Visitors', value: 10000, fill: '#3b82f6' },
  { name: 'Sign Ups', value: 4500, fill: '#8b5cf6' },
  { name: 'Onboarded', value: 2800, fill: '#ec4899' },
  { name: 'Active Users', value: 1900, fill: '#10b981' },
  { name: 'Paid Subscribers', value: 850, fill: '#f59e0b' },
];

const cohortData = [
  { month: 'Jan', 'M1': 100, 'M2': 85, 'M3': 70, 'M4': 60, 'M5': 55, 'M6': 50 },
  { month: 'Feb', 'M1': 100, 'M2': 88, 'M3': 75, 'M4': 65, 'M5': 58, 'M6': null },
  { month: 'Mar', 'M1': 100, 'M2': 82, 'M3': 68, 'M4': 58, 'M5': null, 'M6': null },
  { month: 'Apr', 'M1': 100, 'M2': 90, 'M3': 80, 'M4': null, 'M5': null, 'M6': null },
  { month: 'May', 'M1': 100, 'M2': 92, 'M3': null, 'M4': null, 'M5': null, 'M6': null },
  { month: 'Jun', 'M1': 100, 'M2': null, 'M3': null, 'M4': null, 'M5': null, 'M6': null },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-black/80 border border-white/20 p-3 rounded-lg backdrop-blur-md shadow-xl">
        <p className="text-white font-medium mb-1">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} style={{ color: entry.color }} className="text-sm">
            {entry.name}: {entry.value}%
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function Analytics() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Analytics</h1>
          <p className="text-gray-400">Deep dive into user funnels and cohort retention.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-gray-300 hover:bg-white/10 flex items-center gap-2 transition-colors">
            <Calendar className="w-4 h-4" /> Last 6 Months
          </button>
          <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-gray-300 hover:bg-white/10 flex items-center gap-2 transition-colors">
            <Filter className="w-4 h-4" /> Filters
          </button>
          <div className="flex bg-blue-600 rounded-lg overflow-hidden">
            <button className="px-4 py-2 hover:bg-blue-500 text-sm text-white flex items-center gap-2 transition-colors border-r border-blue-400">
              <Download className="w-4 h-4" /> PDF
            </button>
            <button className="px-4 py-2 hover:bg-blue-500 text-sm text-white flex items-center gap-2 transition-colors">
              <Download className="w-4 h-4" /> Excel
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Conversion Funnel */}
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-xl">
          <h3 className="text-lg font-semibold text-white mb-6">User Journey Funnel</h3>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={funnelData}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" horizontal={false} />
                <XAxis type="number" stroke="#ffffff50" />
                <YAxis dataKey="name" type="category" stroke="#ffffff80" width={120} />
                <RechartsTooltip 
                  cursor={{ fill: '#ffffff10' }}
                  contentStyle={{ backgroundColor: '#000000cc', borderColor: '#ffffff20', borderRadius: '8px' }}
                />
                <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                  {funnelData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Cohort Retention */}
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-xl">
          <h3 className="text-lg font-semibold text-white mb-6">Cohort Retention (%)</h3>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={cohortData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                <XAxis dataKey="month" stroke="#ffffff50" />
                <YAxis stroke="#ffffff50" />
                <RechartsTooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ paddingTop: '20px' }} />
                <Line type="monotone" dataKey="M2" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="M3" stroke="#8b5cf6" strokeWidth={2} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="M4" stroke="#ec4899" strokeWidth={2} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="M5" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      {/* Heatmap table mock */}
      <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-xl overflow-x-auto">
        <h3 className="text-lg font-semibold text-white mb-6">Retention Heatmap</h3>
        <table className="w-full text-sm text-center">
          <thead>
            <tr>
              <th className="p-2 text-left text-gray-400 font-medium">Cohort</th>
              <th className="p-2 text-gray-400 font-medium">Users</th>
              {['M1', 'M2', 'M3', 'M4', 'M5', 'M6'].map(m => (
                <th key={m} className="p-2 text-gray-400 font-medium">{m}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {cohortData.map((row, i) => (
              <tr key={i} className="border-t border-white/5">
                <td className="p-3 text-left font-medium text-white">{row.month} 2023</td>
                <td className="p-3 text-gray-300">1,240</td>
                <td className="p-3"><div className="bg-blue-500/80 text-white rounded p-2">100%</div></td>
                <td className="p-3">
                  {row.M2 ? <div className={`rounded p-2 text-white ${row.M2 > 85 ? 'bg-blue-500/60' : 'bg-blue-500/40'}`}>{row.M2}%</div> : '-'}
                </td>
                <td className="p-3">
                  {row.M3 ? <div className={`rounded p-2 text-white ${row.M3 > 75 ? 'bg-blue-500/50' : 'bg-blue-500/30'}`}>{row.M3}%</div> : '-'}
                </td>
                <td className="p-3">
                  {row.M4 ? <div className={`rounded p-2 text-white ${row.M4 > 60 ? 'bg-blue-500/40' : 'bg-blue-500/20'}`}>{row.M4}%</div> : '-'}
                </td>
                <td className="p-3">
                  {row.M5 ? <div className={`rounded p-2 text-white ${row.M5 > 55 ? 'bg-blue-500/30' : 'bg-blue-500/10'}`}>{row.M5}%</div> : '-'}
                </td>
                <td className="p-3">
                  {row.M6 ? <div className={`rounded p-2 text-white ${row.M6 > 50 ? 'bg-blue-500/20' : 'bg-blue-500/5'}`}>{row.M6}%</div> : '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
