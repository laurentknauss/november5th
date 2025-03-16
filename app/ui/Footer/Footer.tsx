'use client'; 

import React, { useState, useEffect } from 'react';
import { Inter } from 'next/font/google';
import Trillions from '../Trillions';

const inter = Inter({
  subsets: ['latin'], 
  weight: ["500", "800"],
  display: 'swap', 
  preload: true,
}); 

const Footer = () => {
  const [mounted, setMounted] = useState(false);

  // Only run after hydration
  useEffect(() => {
    setMounted(true);
  }, []);
  
  return (
    <footer className={`${inter.className} w-full mt-auto flex justify-center `}>
      <div className="w-full px-0">
        <div className="bg-zinc-900/95 backdrop-blur-md border-t border-zinc-700/30 p-4 md:p-6 shadow-lg w-full">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Left: Logo & About */}
            <div className="flex flex-col space-y-2 items-start md:pl-8">
              <h3 className="text-lg text-white font-bold mb-1">Blockchain Voting</h3>
              <p className="text-sm text-zinc-300 text-left">
                Decentralized voting platform <br/>Powered by Avalanche & Chainlink  <br/>For secure and transparent voting
              </p>
            </div>
            
            {/* Center: National Debt Tracker */}
            <div className="flex flex-col space-y-2 items-center justify-center">
              <Trillions />
            </div>
            
            {/* Right: Links */}
            <div className="flex flex-col space-y-2 items-end md:pr-8">
              <h3 className="text-lg text-white font-bold mb-1">Useful Links</h3>
              <ul className="text-sm space-y-1 text-right">
                <li>
                  <a href="https://www.avax.network/" target="_blank" rel="noopener noreferrer" className="text-zinc-300 hover:text-red-400 transition-colors">
                    Avalanche
                  </a>
                </li>
                <li>
                  <a href="https://testnet.snowtrace.io/" target="_blank" rel="noopener noreferrer" className="text-zinc-300 hover:text-red-400 transition-colors">
                    Fuji Explorer
                  </a>
                </li>
                <li>
                  <a href="https://www.usa.gov/voting" target="_blank" rel="noopener noreferrer" className="text-zinc-300 hover:text-red-400 transition-colors">
                    USA.gov Voting
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-zinc-700/50 mt-4 pt-4 flex flex-col items-center text-center max-w-7xl mx-auto">
            <p className="text-sm text-zinc-400">
              © {mounted ? new Date().getFullYear() : '2025'} Blockchain Voting - <span className="text-red-500">Independent Project</span>
            </p>
            <p className="text-sm text-zinc-400 mt-1 md:mt-0">
              Crafted by{' '}
              <a href="https://knauss.dev" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
                Laurent Knauss
              </a>{' '}
              | Software  Engineer
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;