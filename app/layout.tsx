/*
* The metadata is dynamically imported and used in RootLayout.tsx. 
* All necessary OpenGraph andTwitter tags are included for better SEO and 
* social media sharing 
*/


'use client';

import Head from 'next/head';
import { WagmiProvider } from 'wagmi';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { config } from '@/app/config';
import { SpeedInsights } from '@vercel/speed-insights/react'; 
import { Analytics, type BeforeSendEvent} from '@vercel/analytics/react'; 
import AuroraBackground from '@/app/ui/AuroraBackground/AuroraBackground';
import { metadata} from './metadata';
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
       <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="twitter:card" content={metadata.twitter.card} />
        <meta name="twitter:site" content="@november5th" />
        <meta name="twitter:creator" content={metadata.twitter.creator} />
        <meta name="twitter:title" content={metadata.twitter.title} />
        <meta name="twitter:description" content={metadata.twitter.description} />
        <meta name="twitter:image" content={metadata.twitter.images[0]} />
        <meta property="og:type" content={metadata.openGraph.type} />
        <meta property="og:locale" content={metadata.openGraph.locale} />
        <meta property="og:url" content={metadata.openGraph.url} />
        <meta property="og:site_name" content={metadata.openGraph.siteName} />
        <meta property="og:title" content={metadata.openGraph.title} />
        <meta property="og:description" content={metadata.openGraph.description} />
        <meta property="og:image" content={metadata.openGraph.images[0].url} />
      </Head>

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