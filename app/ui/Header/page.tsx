'use client';

import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';

interface HeaderProps {
  title?: string;
}

const Header: React.FC<HeaderProps> = ({ 
  title = "Blockchain-based Voting DApp" 
}) => {
  return (
    <header className="w-full flex flex-col items-center justify-center pb-6">
      <h1 className="text-5xl text-white font-bold mb-8 drop-shadow-lg">
        {title}
      </h1>
      
      <div className="mb-8 p-4 border-2 border-gray-700 rounded-lg bg-gray-900 bg-opacity-80 shadow-xl">
        <ConnectButton />
      </div>
    </header>
  );
};

export default Header;
