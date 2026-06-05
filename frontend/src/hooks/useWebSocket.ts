import { useEffect, useState } from 'react';

export function useWebSocket(url: string) {
  const [data, setData] = useState<any>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Mock WebSocket implementation for now
    let interval: NodeJS.Timeout;
    
    setIsConnected(true);
    
    interval = setInterval(() => {
      // Simulate receiving real-time data
      setData({
        type: 'UPDATE',
        timestamp: new Date().toISOString(),
        payload: {
          activeUsers: Math.floor(Math.random() * 1000) + 500,
          recentChurns: Math.floor(Math.random() * 5),
        }
      });
    }, 5000);

    return () => {
      clearInterval(interval);
      setIsConnected(false);
    };
  }, [url]);

  return { data, isConnected };
}
