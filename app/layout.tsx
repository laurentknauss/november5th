/*
* The metadata is dynamically imported and used in RootLayout.tsx. 
* All necessary OpenGraph andTwitter tags are included for better SEO and 
* social media sharing 
* Layout.tsx is a pure Server component handling the overall structure of the app 
* namely the metadata, global styles, and the Providers component.
*/



import type  { Metadata } from 'next';
import '@rainbow-me/rainbowkit/styles.css';
import './globals.css';
import Providers from '@/app/providers';


export const metadata: Metadata = {
  
    title: "November 5th - Blockchain Voting",
    description: "Secure blockchain-based voting platform",
    metadataBase: new URL("https://www.november5th.xyz"), 
    openGraph: {
      title: "November 5th - Blockchain Voting",
      description: "Secure blockchain-based voting platform",
      
      images: [{
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "November 5th Blockchain Voting Platform",
      }],
      type: "website",
      siteName: "November 5th - Blockchain Voting",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: "November 5th - Blockchain Voting",
      description: "Secure blockchain-based voting platform",
      images: ["/opengraph-image.png"],
    },
  };





export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {








  return (
    <html lang="en">
      <head>

      </head>

      <body className="h-full">
        <Providers>
           { children } 
        </Providers>
      </body>
    </html>
  );
}