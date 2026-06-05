import { useState } from 'react';
import { motion } from 'framer-motion';
import { Key, Copy, Plus, Trash2, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface ApiKey {
  id: string;
  name: string;
  key: string;
  created: string;
  lastUsed: string;
}

export default function ApiKeys() {
  const [keys, setKeys] = useState<ApiKey[]>([
    { id: '1', name: 'Production API', key: 'sk_live_1234567890abcdef', created: '2026-01-10', lastUsed: 'Today' },
    { id: '2', name: 'Development API', key: 'sk_test_abcdef1234567890', created: '2026-03-15', lastUsed: 'Yesterday' }
  ]);
  const [newKeyName, setNewKeyName] = useState('');
  const [showKey, setShowKey] = useState<string | null>(null);

  const generateKey = () => {
    if (!newKeyName) return;
    const newKey: ApiKey = {
      id: Date.now().toString(),
      name: newKeyName,
      key: `sk_live_${Math.random().toString(36).substring(2, 15)}`,
      created: new Date().toISOString().split('T')[0],
      lastUsed: 'Never'
    };
    setKeys([...keys, newKey]);
    setNewKeyName('');
  };

  const deleteKey = (id: string) => {
    setKeys(keys.filter(k => k.id !== id));
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">API Keys</h1>
        <p className="text-muted-foreground">Manage your secret API keys for programmatic access.</p>
      </div>

      <Card className="glass border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="w-5 h-5 text-primary" />
            Generate New Key
          </CardTitle>
          <CardDescription>Create a new API key to authenticate your applications.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 items-end">
            <div className="space-y-2 flex-1">
              <label className="text-sm font-medium">Key Name</label>
              <Input 
                placeholder="e.g. Zapier Integration" 
                value={newKeyName} 
                onChange={(e) => setNewKeyName(e.target.value)} 
                className="bg-white/5 border-white/10"
              />
            </div>
            <Button onClick={generateKey} disabled={!newKeyName} className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Create Secret Key
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="glass border-white/10">
        <CardHeader>
          <CardTitle>Active API Keys</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-white/10 overflow-hidden bg-black/20">
            <Table>
              <TableHeader className="bg-white/5">
                <TableRow className="border-white/10">
                  <TableHead>Name</TableHead>
                  <TableHead>Secret Key</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Last Used</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {keys.map((k) => (
                  <TableRow key={k.id} className="border-white/10">
                    <TableCell className="font-medium">{k.name}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 font-mono text-sm">
                        {showKey === k.id ? k.key : 'sk_live_' + '*'.repeat(16)}
                        <Button variant="ghost" size="icon" className="w-6 h-6 ml-2" onClick={() => setShowKey(showKey === k.id ? null : k.id)}>
                          {showKey === k.id ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                        </Button>
                        <Button variant="ghost" size="icon" className="w-6 h-6" onClick={() => navigator.clipboard.writeText(k.key)}>
                          <Copy className="w-3 h-3" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{k.created}</TableCell>
                    <TableCell className="text-muted-foreground">{k.lastUsed}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" onClick={() => deleteKey(k.id)} className="text-red-400 hover:text-red-300 hover:bg-red-400/10">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
