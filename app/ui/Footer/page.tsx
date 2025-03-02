'use client'; 

import React, { useState, useEffect } from 'react';
import { Inter } from 'next/font/google';

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
    <footer className={`${inter.className} w-full max-w-6xl mt-auto flex justify-center py-6`}>
      <div className="w-full px-4 md:px-8 lg:px-12">
        <div className="rounded-lg bg-zinc-900/80 backdrop-blur-md border border-zinc-700/30 p-4 md:p-6 shadow-lg w-full max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left: Logo & About */}
            <div className="flex flex-col space-y-2 items-start">
              <h3 className="text-xl text-white font-bold mb-2">Blockchain Voting</h3>
              <p className="text-md text-zinc-300 text-left">
                Decentralized voting platform <br/>Powered by Avalanche blockchain<br/>For secure and transparent voting<br/><span className="text-yellow-400 font-semibold">Student project - Not affiliated with any government</span>
              </p>
            </div>
            
            {/* Center: Information */}
            <div className="flex flex-col space-y-2 items-center justify-center">
              <h3 className="text-lg text-white font-bold mb-2">Voting Platform</h3>
              <p className="text-md text-zinc-300 text-center">
                Cast your vote securely<br/>
                Transparent and immutable<br/>
                Real-time results
              </p>
            </div>
            
            {/* Right: Links */}
            <div className="flex flex-col space-y-2 items-end">
              <h3 className="text-lg text-white font-bold mb-2">Useful Links</h3>
              <ul className="text-md space-y-2 text-right">
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
          
          <div className="border-t border-zinc-700/50 mt-6 pt-6 flex flex-col items-center text-center">
            <p className="text-md text-zinc-400">
              © {mounted ? new Date().getFullYear() : '2025'} Blockchain Voting - <span className="text-yellow-400">Educational Student Project</span>
            </p>
            <p className="text-md text-zinc-400 mt-2 md:mt-0">
              Crafted by{' '}
              <a href="https://knauss.dev" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
                Laurent Knauss
              </a>{' '}
              | Blockchain Engineer
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;