'use client';

import React, { useState, useEffect } from 'react';
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
        <a href="https://www.coingecko.com?utm_source=november5th&utm_medium=referral" target="_blank" rel="noopener noreferrer" className="flex items-center text-xs text-gray-500 hover:text-gray-700">
          <img 
            src="https://static.coingecko.com/s/coingecko-logo-8903d34ce19ca4be1c81f0db30e924154750d208683fad7ae6f2ce06c76d0a56.png" 
            alt="CoinGecko Logo" 
            width="24" 
            height="24" 
            className="mr-2" 
          />
          <span>Powered by CoinGecko</span>
        </a>
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