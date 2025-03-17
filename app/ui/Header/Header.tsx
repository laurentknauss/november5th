'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ConnectButton } from '@rainbow-me/rainbowkit';

interface HeaderProps {
  title?: string;
}

const Header = ({ 
  title = "Blockchain-based Voting DApp"
}: HeaderProps) => {
  const [mounted, setMounted] = useState(false);

  // Only run after hydration
  useEffect(() => {
    setMounted(true);
  }, []);
  
  return (
    <header className="w-full flex flex-col items-center pt-12 pb-10 relative">
      <div className="absolute left-6 top-6">
        <Link href="https://www.coingecko.com?utm_source=november5th&utm_medium=referral" target="_blank" rel="noopener noreferrer" className="flex items-center text-xs text-gray-500 hover:text-gray-700">
          <Image src="/images/coingecko-logo.svg" alt="CoinGecko Logo" width={24} height={24} className="mr-2" />
          <span>Powered by CoinGecko</span>
        </Link>
      </div>
      <h1 className="text-5xl text-slate-800 font-bold mb-4 drop-shadow-sm tracking-tight">
        {title}
      </h1>
      
      {mounted ? (
        <div className="mb-8 pt-10 pb-2 bg-none ">
          <ConnectButton />
        </div>
      ) : (
        <div className="mb-8 p-4 border border-slate-200 rounded-lg bg-white bg-opacity-70 shadow-md">
          <div className="h-10 w-40 bg-gray-500 animate-pulse rounded-md"></div>
        </div>
      )}
    </header>
  );
};

export default Header;