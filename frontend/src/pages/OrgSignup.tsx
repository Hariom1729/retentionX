import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Building2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function OrgSignup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    orgName: '',
    website: '',
    size: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground relative overflow-hidden">
      <div className="absolute top-[-20%] left-[-10%] w-96 h-96 bg-primary/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-20%] right-[-10%] w-96 h-96 bg-secondary/20 rounded-full blur-[120px]" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md p-8 bg-card/50 backdrop-blur-xl border border-border/50 rounded-2xl shadow-2xl"
      >
        <div className="flex justify-center mb-6">
          <div className="p-3 bg-primary/20 rounded-xl">
            <Building2 className="w-8 h-8 text-primary" />
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-center mb-2">Create Organization</h2>
        <p className="text-muted-foreground text-center mb-8">Set up your workspace to get started</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Organization Name</label>
            <Input 
              required 
              placeholder="Acme Corp" 
              value={formData.orgName}
              onChange={e => setFormData({...formData, orgName: e.target.value})}
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Website</label>
            <Input 
              type="url"
              placeholder="https://acme.com" 
              value={formData.website}
              onChange={e => setFormData({...formData, website: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Company Size</label>
            <select 
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={formData.size}
              onChange={e => setFormData({...formData, size: e.target.value})}
            >
              <option value="">Select size</option>
              <option value="1-10">1-10 employees</option>
              <option value="11-50">11-50 employees</option>
              <option value="51-200">51-200 employees</option>
              <option value="201+">201+ employees</option>
            </select>
          </div>

          <Button type="submit" className="w-full mt-6 group">
            Complete Setup
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </form>
      </motion.div>
    </div>
  );
}
