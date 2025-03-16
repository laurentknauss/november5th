import { Metadata } from 'next';

const metadata: Metadata = { 
  title: 'Blockchain Voting App',
  description: 'Secure and fair blockchain-based voting platform for democratic decisions.',
  openGraph: { 
    type: 'website', 
    locale: 'en_US', 
    url: 'https://november5th.xyz', 
    siteName: 'November 5th - Blockchain Voting',
    title: 'Blockchain Voting App',
    description: 'Secure and fair blockchain-based voting platform for democratic decisions.',
    images: [
      {
        url: 'https://november5th.xyz/api/og', 
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
    images: ['https://november5th.xyz/api/og'],
    creator: '@november5th',
  },
};

export default metadata;