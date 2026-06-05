import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Save, Palette } from 'lucide-react';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';

export default function WhiteLabelSettings() {
  const [primaryColor, setPrimaryColor] = useState('#2563eb');
  const [logoUrl, setLogoUrl] = useState('');
  const [orgName, setOrgName] = useState('My Company');

  // Preview the color dynamically
  useEffect(() => {
    document.documentElement.style.setProperty('--primary-preview', primaryColor);
  }, [primaryColor]);

  // Fetch current config
  useQuery({
    queryKey: ['whiteLabelConfig'],
    queryFn: async () => {
      const res = await axios.get('http://localhost:5000/api/white-label');
      const data = res.data;
      if (data) {
        if (data.primaryColor) setPrimaryColor(data.primaryColor);
        if (data.logoUrl) setLogoUrl(data.logoUrl);
        if (data.orgName) setOrgName(data.orgName);
      }
      return data;
    },
    retry: false,
  });

  const saveMutation = useMutation({
    mutationFn: (data: any) => axios.post('http://localhost:5000/api/white-label', data),
    onSuccess: () => {
      document.documentElement.style.setProperty('--primary', primaryColor);
      alert('White-label settings saved and applied!');
    }
  });

  const handleSave = () => {
    saveMutation.mutate({ primaryColor, logoUrl, orgName });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center">
          <Palette className="w-8 h-8 mr-3 text-primary" />
          White-Label Settings
        </h1>
        <p className="text-muted-foreground mt-1">
          Customize the platform's appearance to match your brand.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Brand Identity</CardTitle>
            <CardDescription>Configure your organization's brand assets.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Organization Name</Label>
              <Input 
                value={orgName} 
                onChange={(e) => setOrgName(e.target.value)} 
                placeholder="Enter organization name" 
              />
            </div>
            
            <div className="space-y-2">
              <Label>Logo URL</Label>
              <Input 
                value={logoUrl} 
                onChange={(e) => setLogoUrl(e.target.value)} 
                placeholder="https://example.com/logo.png" 
              />
            </div>

            <div className="space-y-2">
              <Label>Primary Brand Color</Label>
              <div className="flex items-center space-x-3">
                <Input 
                  type="color" 
                  value={primaryColor} 
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="w-16 h-10 p-1"
                />
                <Input 
                  type="text" 
                  value={primaryColor} 
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="font-mono uppercase flex-1"
                />
              </div>
            </div>

            <Button onClick={handleSave} className="w-full mt-4">
              <Save className="w-4 h-4 mr-2" />
              Save Configuration
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Live Preview</CardTitle>
            <CardDescription>See how your settings look.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border rounded-lg p-6 space-y-6 bg-background">
              <div className="flex items-center space-x-4">
                {logoUrl ? (
                  <img src={logoUrl} alt="Logo" className="h-10 object-contain" />
                ) : (
                  <div className="h-10 w-10 bg-muted rounded-md flex items-center justify-center">
                    <span className="text-xs text-muted-foreground">Logo</span>
                  </div>
                )}
                <h2 className="text-xl font-bold">{orgName}</h2>
              </div>

              <div className="space-y-4 border-t pt-4">
                <p className="text-sm text-muted-foreground">Example UI elements with your brand color:</p>
                
                <div className="flex space-x-2">
                  <Button style={{ backgroundColor: 'var(--primary-preview, var(--primary))', color: 'white' }}>
                    Primary Action
                  </Button>
                  <Button variant="outline" style={{ borderColor: 'var(--primary-preview, var(--primary))', color: 'var(--primary-preview, var(--primary))' }}>
                    Secondary Action
                  </Button>
                </div>

                <div 
                  className="w-full h-2 rounded-full mt-4" 
                  style={{ backgroundColor: 'var(--primary-preview, var(--primary))' }}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
