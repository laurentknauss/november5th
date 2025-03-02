'use client';

import React, { useState, useEffect } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';

interface HeaderProps {
  title?: string;
}

const Header: React.FC<HeaderProps> = ({ 
  title = "Blockchain-based Voting DApp" 
}) => {
  const [mounted, setMounted] = useState(false);

  // Only run after hydration
  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <header className="w-full flex flex-col items-center pt-2 pb-4">
      <h1 className="text-5xl text-gray-800 font-bold mb-4 drop-shadow-md tracking-tight">
        {title}
      </h1>
      
      {mounted ? (
        <div className="mb-8 p-4 border-2 border-gray-300 rounded-lg bg-white bg-opacity-70 shadow-lg">
          <ConnectButton />
        </div>
      ) : (
        <div className="mb-8 p-4 border-2 border-gray-300 rounded-lg bg-white bg-opacity-70 shadow-lg">
          <div className="h-10 w-40 bg-gray-500 animate-pulse rounded-md"></div>
        </div>
      )}
    </header>
  );
};

export default Header;
