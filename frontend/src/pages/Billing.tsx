import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, Check, Zap, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const plans = [
  {
    name: 'Starter',
    price: '$49',
    description: 'Perfect for small teams getting started with retention analytics.',
    features: ['Up to 10,000 users', 'Basic analytics dashboard', 'Standard support', '1 team member'],
    recommended: false
  },
  {
    name: 'Pro',
    price: '$199',
    description: 'Advanced features for growing companies that need deep insights.',
    features: ['Up to 100,000 users', 'Advanced AI insights', 'Priority support', 'Up to 5 team members', 'Custom workflows'],
    recommended: true
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'Tailored solutions for large-scale operations and complex needs.',
    features: ['Unlimited users', 'Custom integrations', '24/7 dedicated support', 'Unlimited team members', 'SLA guarantee'],
    recommended: false
  }
];

export default function Billing() {
  const [stripeMockOpen, setStripeMockOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleUpgrade = (planName: string) => {
    if (planName === 'Starter' || planName === 'Custom') return;
    setSelectedPlan(planName);
    setStripeMockOpen(true);
  };

  const processPayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStripeMockOpen(false);
      alert('Payment successful! Subscription upgraded.');
    }, 2000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Billing & Plans</h1>
        <p className="text-muted-foreground">Manage your subscription and billing details</p>
      </div>

      <Card className="mb-8 border-primary/20 bg-primary/5">
        <CardContent className="flex items-center justify-between p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/20 rounded-xl">
              <CreditCard className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Current Plan: Starter</h3>
              <p className="text-sm text-muted-foreground">Your next billing date is July 1st, 2026</p>
            </div>
          </div>
          <Button variant="outline">Manage Payment Method</Button>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-3 gap-6">
        {plans.map((plan, i) => (
          <Card key={i} className={`relative flex flex-col ${plan.recommended ? 'border-primary shadow-lg shadow-primary/10' : ''}`}>
            {plan.recommended && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full flex items-center gap-1">
                <Zap className="w-3 h-3" /> Most Popular
              </div>
            )}
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <div className="mt-4 flex items-baseline text-4xl font-extrabold">
                {plan.price}
                {plan.price !== 'Custom' && <span className="ml-1 text-xl font-medium text-muted-foreground">/mo</span>}
              </div>
              <CardDescription className="mt-4">{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <ul className="space-y-3">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full" 
                variant={plan.recommended ? 'default' : 'outline'}
                onClick={() => handleUpgrade(plan.name)}
              >
                {plan.price === 'Custom' ? 'Contact Sales' : (plan.name === 'Starter' ? 'Current Plan' : 'Upgrade')}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <AnimatePresence>
        {stripeMockOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
              className="bg-zinc-900 border border-white/10 p-6 rounded-2xl shadow-2xl max-w-md w-full relative"
            >
              <Button variant="ghost" size="icon" className="absolute top-4 right-4" onClick={() => setStripeMockOpen(false)}>
                <X className="w-4 h-4" />
              </Button>
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                  <CreditCard className="w-8 h-8 text-primary" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-center mb-2">Upgrade to {selectedPlan}</h2>
              <p className="text-center text-muted-foreground mb-6">Complete your payment securely with Stripe.</p>
              
              <div className="space-y-4 mb-6">
                <div className="p-4 bg-black/40 rounded-xl border border-white/5 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{selectedPlan} Plan (Monthly)</span>
                    <span className="font-medium">$199.00</span>
                  </div>
                  <div className="w-full h-[1px] bg-white/10"></div>
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>$199.00</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Card Information</label>
                  <div className="p-3 bg-white/5 border border-white/10 rounded-lg flex items-center gap-3">
                    <CreditCard className="w-5 h-5 text-muted-foreground" />
                    <span className="text-sm font-mono tracking-widest">•••• •••• •••• 4242</span>
                    <span className="text-sm text-muted-foreground ml-auto">12/28</span>
                  </div>
                </div>
              </div>

              <Button className="w-full h-12 text-lg bg-primary hover:bg-primary/90" onClick={processPayment} disabled={isProcessing}>
                {isProcessing ? <Loader2 className="w-5 h-5 animate-spin" /> : `Pay $199.00`}
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
