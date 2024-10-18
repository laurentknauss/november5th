
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { RainbowKitProvider, Chain, midnightTheme } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { config } from "@/app/config" ; 
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"; 
import { Inter } from "next/font/google"; 
import { preload } from "react-dom";


const queryClient = new QueryClient(); 

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: 'swap', 
  preload: true,
});


export const metadata: Metadata = {
  title: "November 5th US election Blockchain Ballot ",
  description: "Cast your vote for the next US president on the blockchain", 
};



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex`}>
      <QueryClientProvider client={queryClient}> 
      <WagmiProvider config={config}>
      <RainbowKitProvider
      modalSize="compact"
      locale="en-US"
      theme={midnightTheme({
       accentColor: "rainbow",
       overlayBlur: "large",
       accentColorForeground: "rainbow",
       borderRadius: "large", 
       fontStack: "system",
        })} initialChain={421614}   >
            <div className="flex-grow"> {children}     </div> 
      </RainbowKitProvider>
      </WagmiProvider>
      </QueryClientProvider>
      </body>
    </html>
  );
}