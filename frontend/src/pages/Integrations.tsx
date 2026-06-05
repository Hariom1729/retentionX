import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, CheckCircle2, ArrowRight, Settings } from 'lucide-react';

const integrationsList = [
  { id: 'stripe', name: 'Stripe', category: 'Billing', desc: 'Sync customer subscriptions and revenue data.', connected: true, logo: 'S' },
  { id: 'salesforce', name: 'Salesforce', category: 'CRM', desc: 'Import accounts, contacts, and opportunities.', connected: false, logo: 'SF' },
  { id: 'hubspot', name: 'HubSpot', category: 'CRM', desc: 'Sync marketing and sales pipelines automatically.', connected: true, logo: 'HS' },
  { id: 'slack', name: 'Slack', category: 'Communication', desc: 'Send alerts for churn risks and health drops.', connected: false, logo: 'Sl' },
  { id: 'segment', name: 'Segment', category: 'Data', desc: 'Stream product usage events in real-time.', connected: false, logo: 'Sg' },
  { id: 'zendesk', name: 'Zendesk', category: 'Support', desc: 'Sync support tickets and CSAT scores.', connected: false, logo: 'Z' },
];

export default function Integrations() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const categories = ['All', 'CRM', 'Billing', 'Data', 'Support', 'Communication'];

  const filteredIntegrations = integrationsList.filter(int => {
    const matchesSearch = int.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = filter === 'All' || int.category === filter;
    return matchesSearch && matchesCategory;
  });

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Integrations Marketplace</h1>
          <p className="text-gray-400">Connect your tools to unify customer data.</p>
        </div>
        
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search integrations..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-white focus:outline-none focus:border-blue-500/50 transition-colors placeholder:text-gray-500"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="flex overflow-x-auto pb-2 gap-2 hide-scrollbar">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-colors border ${
              filter === cat 
                ? 'bg-blue-600/20 text-blue-400 border-blue-500/30' 
                : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Integration Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {filteredIntegrations.map((integration, idx) => (
          <motion.div
            key={integration.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.05 }}
            className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-xl hover:bg-white/10 transition-all group flex flex-col"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-xl font-bold text-white shadow-inner border border-white/10">
                {integration.logo}
              </div>
              {integration.connected ? (
                <span className="flex items-center gap-1 text-xs font-medium text-green-400 bg-green-400/10 px-2 py-1 rounded-full border border-green-400/20">
                  <CheckCircle2 className="w-3 h-3" /> Connected
                </span>
              ) : (
                <span className="text-xs font-medium text-gray-500 bg-white/5 px-2 py-1 rounded-full border border-white/5">
                  {integration.category}
                </span>
              )}
            </div>
            
            <h3 className="text-xl font-bold text-white mb-2">{integration.name}</h3>
            <p className="text-sm text-gray-400 mb-6 flex-1">{integration.desc}</p>
            
            <div className="pt-4 border-t border-white/10 mt-auto">
              {integration.connected ? (
                <button className="w-full py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2">
                  <Settings className="w-4 h-4" /> Manage Settings
                </button>
              ) : (
                <button className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 group-hover:bg-blue-500">
                  Connect <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
