import { motion } from 'framer-motion';
import { Network, Plus, Play, Save, Settings2, Mail, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function WorkflowBuilder() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="h-[calc(100vh-8rem)] flex flex-col"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Network className="w-8 h-8 text-primary" />
            Workflow Builder
          </h1>
          <p className="text-muted-foreground mt-1">Design automated retention campaigns visually</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline"><Save className="w-4 h-4 mr-2" /> Save Draft</Button>
          <Button><Play className="w-4 h-4 mr-2" /> Activate Workflow</Button>
        </div>
      </div>

      <div className="flex-1 border border-border/50 rounded-xl bg-card/30 backdrop-blur-sm relative overflow-hidden flex">
        {/* Sidebar Tools */}
        <div className="w-64 border-r border-border/50 bg-card/50 p-4 space-y-4">
          <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider mb-4">Triggers</h3>
          <Card className="p-3 cursor-grab hover:border-primary/50 transition-colors flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 rounded text-blue-500"><Users className="w-4 h-4" /></div>
            <span className="text-sm font-medium">User Churn Risk High</span>
          </Card>
          
          <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider mb-4 mt-8">Actions</h3>
          <Card className="p-3 cursor-grab hover:border-primary/50 transition-colors flex items-center gap-3">
            <div className="p-2 bg-green-500/10 rounded text-green-500"><Mail className="w-4 h-4" /></div>
            <span className="text-sm font-medium">Send Email Campaign</span>
          </Card>
          <Card className="p-3 cursor-grab hover:border-primary/50 transition-colors flex items-center gap-3">
            <div className="p-2 bg-orange-500/10 rounded text-orange-500"><Settings2 className="w-4 h-4" /></div>
            <span className="text-sm font-medium">Update User Tag</span>
          </Card>
        </div>

        {/* Canvas Area (Mock) */}
        <div className="flex-1 relative bg-black/20 overflow-hidden" style={{ backgroundImage: 'radial-gradient(circle at center, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
          
          {/* Connection Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <path d="M 320 200 C 450 200, 450 200, 580 200" stroke="rgba(255,255,255,0.2)" strokeWidth="2" fill="none" strokeDasharray="4 4" className="animate-pulse" />
            <path d="M 830 200 C 950 200, 950 300, 1050 300" stroke="rgba(255,255,255,0.2)" strokeWidth="2" fill="none" />
          </svg>
          {/* Mock Node 1: Trigger */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="absolute top-[160px] left-[100px]"
          >
            <Card className="p-4 w-64 border-blue-500/30 shadow-lg shadow-blue-500/10">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-blue-500/20 rounded text-blue-500"><Users className="w-4 h-4" /></div>
                <span className="font-medium">User Churn Risk &gt; 80%</span>
              </div>
              <div className="absolute right-[-8px] top-1/2 -translate-y-1/2 w-4 h-4 bg-zinc-900 border-2 border-blue-500 rounded-full z-10" />
            </Card>
          </motion.div>

          {/* Mock Node 2: Action */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="absolute top-[160px] left-[580px]"
          >
            <Card className="p-4 w-64 border-green-500/30 shadow-lg shadow-green-500/10 relative glass">
              <div className="absolute left-[-8px] top-1/2 -translate-y-1/2 w-4 h-4 bg-zinc-900 border-2 border-green-500 rounded-full z-10" />
              <div className="absolute right-[-8px] top-1/2 -translate-y-1/2 w-4 h-4 bg-zinc-900 border-2 border-green-500 rounded-full z-10" />
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-green-500/20 rounded text-green-500"><Mail className="w-4 h-4" /></div>
                <span className="font-medium">Send "We Miss You" Offer</span>
              </div>
            </Card>
          </motion.div>

          {/* Mock Node 3: Update Tag */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="absolute top-[260px] left-[1050px]"
          >
            <Card className="p-4 w-64 border-orange-500/30 shadow-lg shadow-orange-500/10 relative glass">
              <div className="absolute left-[-8px] top-1/2 -translate-y-1/2 w-4 h-4 bg-zinc-900 border-2 border-orange-500 rounded-full z-10" />
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-orange-500/20 rounded text-orange-500"><Settings2 className="w-4 h-4" /></div>
                <span className="font-medium">Tag as "At Risk"</span>
              </div>
            </Card>
          </motion.div>
          
          <Button variant="outline" className="absolute bottom-8 right-8 rounded-full shadow-lg h-14 w-14 p-0">
            <Plus className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
