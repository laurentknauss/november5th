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
        <div className="bg-zinc-700/95 backdrop-blur-md border-t border-zinc-700/30 p-4 md:p-6 shadow-lg w-full">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Left: Logo & About */}
            <div className="absolute left-0 flex flex-col space-y-2 items-start md:pl-8">
              <h3 className="text-lg text-white font-bold mb-1">Blockchain Voting</h3>
              <p className="text-sm text-zinc-300 text-left">
                Decentralized voting platform <br/>Powered by Avalanche & Chainlink  <br/>For secure and transparent voting
              </p>
            </div>
            
            {/* Center: National Debt Tracker */}
            <div className="pb-14 absolute left-1/2 transform -translate-x-1/2  text-center ">
              <Trillions />
            </div>
            
            {/* Right: Links */}
            <div className="absolute right-0 flex flex-col space-y-2 items-end md:pr-8">
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
          
          <div className=" mt-28 pt-8 flex flex-col items-center text-center max-w-7xl mx-auto">
            <p className="text-sm">
              <span className="text-red-500">DISCLAIMER: This is a student project for educational purposes only - Not affiliated with any government entity</span>
            </p>
            <p className="text-red-500 text-sm mt-1 md:mt-0">
              Crafted by{' '}
              <a href="https://knauss.dev" target="_blank" rel="noopener noreferrer" className="text-white font-bold ">
                Laurent Knauss
              </a>{' '}
              | Software Engineer
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;