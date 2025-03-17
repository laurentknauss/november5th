'use client';

import React, { useState, useEffect } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import CoinGeckoAttribution from '@/app/components/CoinGeckoAttribution';

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
      <CoinGeckoAttribution />
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