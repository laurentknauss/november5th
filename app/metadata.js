/* This file is for SEO - must not have 'use client' directive
* Metadata is centralized here making it easier to manage and update.
*/ 
export const metadata = {
  title: 'Blockchain Voting App',
  description: 'Secure and fair blockchain-based voting platform for democratic decisions.',
  openGraph: { 
    type: 'website', 
    locale: 'en_US', 
    url: 'https://www.november5th.xyz', 
    siteName: 'November 5th - Blockchain Voting',
    title: 'Blockchain Voting App',
    description: 'Secure and fair blockchain-based voting platform for democratic decisions.',
    images: [
      {
        url: 'https://www.november5th.xyz/api/og', 
        width: 1200,
        height: 630,
        alt: 'November 5th Blockchain Voting Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blockchain Voting App',
    description: 'Secure and fair blockchain-based voting platform for democratic decisions.',
    images: ['https://www.november5th.xyz/api/og'],
    creator: '@november5th',
  },
};