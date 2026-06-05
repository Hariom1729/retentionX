import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Settings, Play, Save } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

export default function CampaignBuilder() {
  const [campaignName, setCampaignName] = useState('');
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState('Draft');

  const saveMutation = useMutation({
    mutationFn: (data: any) => axios.post('http://localhost:5000/api/campaigns', data),
    onSuccess: () => setStatus('Saved'),
  });

  const launchMutation = useMutation({
    mutationFn: (data: any) => axios.post('http://localhost:5000/api/campaigns/launch', data),
    onSuccess: () => setStatus('Active'),
  });

  const handleSave = () => {
    saveMutation.mutate({ name: campaignName, subject, content });
  };

  const handleLaunch = () => {
    launchMutation.mutate({ name: campaignName, subject, content });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Campaign Builder</h1>
          <p className="text-muted-foreground mt-1">
            Create and manage email campaigns for customer retention.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant={status === 'Active' ? 'default' : 'secondary'} className="mr-4">
            {status}
          </Badge>
          <Button variant="outline" onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Save Draft
          </Button>
          <Button onClick={handleLaunch}>
            <Play className="h-4 w-4 mr-2" />
            Launch
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Email Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Campaign Name</label>
                <Input
                  placeholder="e.g. Churn Prevention Q3"
                  value={campaignName}
                  onChange={(e) => setCampaignName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email Subject</label>
                <Input
                  placeholder="We miss you! Here's a special offer."
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email Body</label>
                <Textarea
                  placeholder="Hi {{first_name}},\n\nWe noticed you haven't been active lately..."
                  className="min-h-[300px] font-mono"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="w-5 h-5 mr-2" />
                Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Target Audience</label>
                <select className="w-full flex h-10 items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                  <option>High Churn Risk</option>
                  <option>Recent Drop-offs</option>
                  <option>All Customers</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Send Time</label>
                <Input type="datetime-local" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
