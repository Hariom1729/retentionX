import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Shield, Filter } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const MOCK_LOGS = [
  { id: 1, user: 'alice@example.com', action: 'EXPORT_DATA', resource: 'Customer Table', timestamp: '2026-06-05 10:23:41', ip: '192.168.1.42', status: 'Success' },
  { id: 2, user: 'bob@example.com', action: 'DELETE_CAMPAIGN', resource: 'Campaign ID 42', timestamp: '2026-06-05 09:12:15', ip: '10.0.0.12', status: 'Success' },
  { id: 3, user: 'charlie@example.com', action: 'LOGIN_ATTEMPT', resource: 'System', timestamp: '2026-06-04 22:45:11', ip: '203.0.113.5', status: 'Failed' },
  { id: 4, user: 'admin@example.com', action: 'UPDATE_BILLING', resource: 'Organization Settings', timestamp: '2026-06-04 15:30:00', ip: '192.168.1.100', status: 'Success' },
  { id: 5, user: 'system', action: 'AUTO_SYNC', resource: 'CRM Integration', timestamp: '2026-06-04 12:00:00', ip: '127.0.0.1', status: 'Success' },
];

export default function AuditLogs() {
  const [searchTerm, setSearchTerm] = useState('');

  const { data: logs = MOCK_LOGS, isLoading } = useQuery({
    queryKey: ['auditLogs'],
    queryFn: async () => {
      const res = await axios.get('http://localhost:5000/api/audit-logs');
      return res.data;
    },
    // Fallback to MOCK_LOGS if the endpoint doesn't exist yet
    retry: false,
  });

  const filteredLogs = logs.filter((log: any) => 
    log.user?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    log.action?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center">
            <Shield className="w-8 h-8 mr-3 text-primary" />
            Security & Audit Logs
          </h1>
          <p className="text-muted-foreground mt-1">
            Monitor system access, data exports, and configuration changes.
          </p>
        </div>
        <Button variant="outline">
          Export Logs (CSV)
        </Button>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-medium">Activity History</CardTitle>
          <div className="flex space-x-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search logs..."
                className="pl-8 w-[250px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border mt-4">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b">
                <tr>
                  <th className="px-6 py-3">Timestamp</th>
                  <th className="px-6 py-3">User</th>
                  <th className="px-6 py-3">Action</th>
                  <th className="px-6 py-3">Resource</th>
                  <th className="px-6 py-3">IP Address</th>
                  <th className="px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredLogs.map((log) => (
                  <tr key={log.id} className="bg-card border-b hover:bg-muted/50 transition-colors">
                    <td className="px-6 py-4 font-mono text-xs">{log.timestamp}</td>
                    <td className="px-6 py-4 font-medium">{log.user}</td>
                    <td className="px-6 py-4">
                      <Badge variant="outline" className="font-mono text-xs">
                        {log.action}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">{log.resource}</td>
                    <td className="px-6 py-4 font-mono text-xs text-muted-foreground">{log.ip}</td>
                    <td className="px-6 py-4">
                      <Badge variant={log.status === 'Success' ? 'default' : 'destructive'}>
                        {log.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
                {filteredLogs.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-muted-foreground">
                      No logs found matching your criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
