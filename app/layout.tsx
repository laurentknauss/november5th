'use client';

import { WagmiProvider } from 'wagmi';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { config } from '@/app/config';
import { SpeedInsights } from '@vercel/speed-insights/react'; 
import { Analytics, type BeforeSendEvent} from '@vercel/analytics/react'; 
import AuroraBackground from '@/app/ui/AuroraBackground/AuroraBackground';
import '@rainbow-me/rainbowkit/styles.css';
import './globals.css';
import { useEffect , useState } from 'react';

// Create a client
const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {



  const [clientIp, setClientIp] = useState<string | null>(null);
  
  useEffect(() => {
    // Fetch the client's IP address
    const getClientIp = async () => {
      try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        setClientIp(data.ip);
      } catch (error) {
        console.error('Error fetching IP:', error);
      }
    };
    
    getClientIp();
  }, []);

  const handleBeforeSend = (event: BeforeSendEvent): BeforeSendEvent | null => {
    // Get excluded IPs from environment variable
    const excludedIps = process.env.NEXT_PUBLIC_EXCLUDED_IPS?.split(',') || [];
    
    // Don't track if client IP is in the excluded list
    if (clientIp && excludedIps.includes(clientIp)) {
      console.log('Analytics tracking disabled for this IP');
      return null;
    }
    
    return event;
  };








  return (
    <html lang="en" className="h-full overflow-x-hidden">
      <body className="h-full">
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <RainbowKitProvider>
              <AuroraBackground>
                {children}
              </AuroraBackground>
            </RainbowKitProvider>
          </QueryClientProvider>
        </WagmiProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}