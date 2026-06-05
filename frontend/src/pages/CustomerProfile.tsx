
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, Calendar, Clock, Activity, CreditCard, ArrowRight, ShieldCheck, Tag } from 'lucide-react';

const events = [
  { id: 1, type: 'signup', title: 'Account Created', date: '2023-10-01T10:00:00Z', icon: User, color: 'text-blue-400' },
  { id: 2, type: 'subscription', title: 'Upgraded to Pro', date: '2023-10-15T14:30:00Z', icon: CreditCard, color: 'text-green-400' },
  { id: 3, type: 'usage', title: 'Created 5 Workflows', date: '2023-11-02T09:15:00Z', icon: Activity, color: 'text-purple-400' },
  { id: 4, type: 'support', title: 'Support Ticket #1024', date: '2023-11-20T16:45:00Z', icon: Phone, color: 'text-orange-400' },
  { id: 5, type: 'login', title: 'Recent Login', date: '2023-12-05T08:00:00Z', icon: Clock, color: 'text-gray-400' },
];

export default function CustomerProfile() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex flex-col md:flex-row gap-6">
        {/* Profile Card */}
        <div className="w-full md:w-1/3 space-y-6">
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-xl flex flex-col items-center text-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-blue-500 to-purple-600 p-1 mb-4">
              <div className="w-full h-full rounded-full bg-black/50 flex items-center justify-center backdrop-blur-sm">
                <span className="text-3xl font-bold text-white">JD</span>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-white mb-1">Jane Doe</h2>
            <p className="text-gray-400 mb-4">Chief Marketing Officer @ Acme Corp</p>
            
            <div className="flex flex-wrap gap-2 justify-center mb-6">
              <span className="px-3 py-1 text-xs rounded-full bg-green-500/20 text-green-300 border border-green-500/30 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> VIP Customer
              </span>
              <span className="px-3 py-1 text-xs rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 flex items-center gap-1">
                <Tag className="w-3 h-3" /> SaaS
              </span>
            </div>

            <div className="w-full space-y-3 text-sm text-left">
              <div className="flex items-center gap-3 text-gray-300 p-2 rounded-lg bg-white/5">
                <Mail className="w-4 h-4 text-gray-400" />
                <span>jane.doe@acmecorp.com</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300 p-2 rounded-lg bg-white/5">
                <Phone className="w-4 h-4 text-gray-400" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300 p-2 rounded-lg bg-white/5">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span>San Francisco, CA</span>
              </div>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-xl">
            <h3 className="text-lg font-semibold text-white mb-4">Health Metrics</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">Health Score</span>
                  <span className="text-green-400 font-semibold">92/100</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-400 h-2 rounded-full" style={{ width: '92%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">Engagement</span>
                  <span className="text-blue-400 font-semibold">High</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-400 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">Churn Risk</span>
                  <span className="text-red-400 font-semibold">Low (8%)</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div className="bg-gradient-to-r from-red-500 to-orange-400 h-2 rounded-full" style={{ width: '8%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline & Activities */}
        <div className="w-full md:w-2/3 space-y-6">
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Event Timeline</h3>
              <button className="text-sm text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1">
                View All <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            
            <div className="relative border-l border-white/10 ml-3 space-y-8 pb-4">
              {events.map((event, index) => {
                const Icon = event.icon;
                return (
                  <motion.div 
                    key={event.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative pl-8"
                  >
                    <div className={`absolute -left-[17px] top-1 w-8 h-8 rounded-full bg-black border border-white/10 flex items-center justify-center ${event.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2">
                        <h4 className="text-white font-medium">{event.title}</h4>
                        <div className="flex items-center gap-1 text-xs text-gray-500 mt-1 sm:mt-0">
                          <Calendar className="w-3 h-3" />
                          {new Date(event.date).toLocaleDateString()} at {new Date(event.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                      <p className="text-sm text-gray-400">
                        {event.type === 'usage' ? 'User successfully created 5 automated workflows in the marketing workspace.' : 
                         event.type === 'support' ? 'Reported an issue with API rate limits. Resolved by support team.' :
                         'System automatically tracked event.'}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-xl">
              <h4 className="text-gray-400 text-sm mb-1">Total MRR</h4>
              <p className="text-2xl font-bold text-white">$1,250<span className="text-sm text-gray-500 font-normal">/mo</span></p>
            </div>
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-xl">
              <h4 className="text-gray-400 text-sm mb-1">Lifetime Value</h4>
              <p className="text-2xl font-bold text-white">$15,000</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
