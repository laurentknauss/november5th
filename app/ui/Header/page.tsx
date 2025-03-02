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
      <h1 className="text-5xl text-white font-bold mb-4 drop-shadow-lg">
        {title}
      </h1>
      
      {mounted ? (
        <div className="mb-8 p-4 border-2 border-gray-700 rounded-lg bg-gray-900 bg-opacity-80 shadow-xl">
          <ConnectButton />
        </div>
      ) : (
        <div className="mb-8 p-4 border-2 border-gray-700 rounded-lg bg-gray-900 bg-opacity-80 shadow-xl">
          <div className="h-10 w-40 bg-gray-500 animate-pulse rounded-md"></div>
        </div>
      )}
    </header>
  );
};

export default Header;
