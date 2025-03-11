'use client';

import type { Metadata } from 'next'; 
import { WagmiProvider } from 'wagmi';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { config } from '@/app/config';
import { Analytics} from '@vercel/analytics/react'
import  AuroraBackground  from '@/app/ui/AuroraBackground/AuroraBackground';
import '@rainbow-me/rainbowkit/styles.css';
import './globals.css';

// Create a client
const queryClient = new QueryClient();

 const metadata: Metadata = { 
  title : 'Presidential voting app',
  description:  'A blockchain-based secure political app ',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
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
      </body>
    </html>
  );
}