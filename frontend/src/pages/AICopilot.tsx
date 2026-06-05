import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Send, Code, Table as TableIcon, Loader2 } from 'lucide-react';

export default function AICopilot() {
  const [query, setQuery] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<{ sql: string; data: any[] } | null>(null);

  const handleQuery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsProcessing(true);
    // Mock processing
    setTimeout(() => {
      setResult({
        sql: `SELECT customer_id, name, SUM(revenue) as total_revenue\nFROM subscriptions\nWHERE status = 'active'\nGROUP BY customer_id, name\nORDER BY total_revenue DESC\nLIMIT 5;`,
        data: [
          { id: '1', name: 'Acme Corp', revenue: '$15,000' },
          { id: '2', name: 'Globex Inc', revenue: '$12,400' },
          { id: '3', name: 'Soylent Corp', revenue: '$9,800' },
          { id: '4', name: 'Initech', revenue: '$8,200' },
          { id: '5', name: 'Umbrella Corp', revenue: '$7,500' },
        ]
      });
      setIsProcessing(false);
    }, 1500);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto space-y-6"
    >
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-500/10 border border-blue-500/20 mb-4">
          <Sparkles className="w-8 h-8 text-blue-400" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">AI Data Copilot</h1>
        <p className="text-gray-400">Ask questions in plain English, get instant SQL and data insights.</p>
      </div>

      {/* Query Input */}
      <div className="p-2 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-xl flex items-center focus-within:border-blue-500/50 transition-colors">
        <form onSubmit={handleQuery} className="flex w-full items-center">
          <div className="pl-4 pr-2 text-blue-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g., Show me the top 5 customers by revenue this month"
            className="flex-1 bg-transparent border-none text-white focus:outline-none focus:ring-0 p-3 placeholder:text-gray-600"
          />
          <button 
            type="submit"
            disabled={isProcessing || !query.trim()}
            className="p-3 mr-1 bg-blue-600 hover:bg-blue-500 text-white rounded-xl disabled:opacity-50 transition-colors flex items-center justify-center"
          >
            {isProcessing ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
          </button>
        </form>
      </div>

      {/* Results Area */}
      {result && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* SQL Generated */}
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-xl flex flex-col">
            <div className="flex items-center gap-2 mb-4 text-gray-300">
              <Code className="w-5 h-5 text-purple-400" />
              <h3 className="font-semibold">Generated SQL</h3>
            </div>
            <div className="flex-1 bg-black/50 p-4 rounded-xl border border-white/5 font-mono text-sm text-blue-300 overflow-x-auto whitespace-pre">
              {result.sql}
            </div>
          </div>

          {/* Data Result */}
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-xl flex flex-col">
            <div className="flex items-center gap-2 mb-4 text-gray-300">
              <TableIcon className="w-5 h-5 text-green-400" />
              <h3 className="font-semibold">Result Data</h3>
            </div>
            <div className="flex-1 bg-black/30 rounded-xl border border-white/5 overflow-hidden">
              <table className="w-full text-sm text-left text-gray-300">
                <thead className="text-xs text-gray-400 bg-white/5 uppercase border-b border-white/10">
                  <tr>
                    <th className="px-4 py-3">Customer</th>
                    <th className="px-4 py-3 text-right">Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  {result.data.map((row, i) => (
                    <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="px-4 py-3 font-medium text-white">{row.name}</td>
                      <td className="px-4 py-3 text-right text-green-400">{row.revenue}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      )}

      {/* Suggested Queries */}
      {!result && !isProcessing && (
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500 mb-4">Try asking...</p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "What is our churn rate this quarter?",
              "Show me users who haven't logged in for 30 days",
              "Which feature is used most by Enterprise accounts?",
              "Revenue breakdown by subscription tier"
            ].map((q, i) => (
              <button 
                key={i}
                onClick={() => setQuery(q)}
                className="px-4 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-sm text-gray-300 transition-colors"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}
