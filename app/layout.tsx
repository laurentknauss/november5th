'use client';

import { WagmiProvider } from 'wagmi';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { config } from '@/app/config';
import AuroraBackground from '@/app/ui/AuroraBackground/AuroraBackground';
import '@rainbow-me/rainbowkit/styles.css';
import './globals.css';
import metadata from './metadata';

// Expose metadata for SEO
export { default as metadata } from './metadata';

// Create a client
const queryClient = new QueryClient();

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
      </body>
    </html>
  );
}