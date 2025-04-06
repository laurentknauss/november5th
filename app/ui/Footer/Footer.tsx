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

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <footer className={`${inter.className} w-full mt-auto flex justify-center`}>
      <div className="w-full px-0">
        <div className="bg-slate-800 backdrop-blur-md  p-3 md:p-4 shadow-lg w-full">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2  mx-auto relative h-auto px-4">
            {/* Left: Logo & About */}
            <div className="flex flex-col space-y-2 pt-4 sm:pl-8">
              <h3 className="text-lg text-white font-bold mb-1">Blockchain Voting</h3>
              <p className="text-sm text-zinc-300 text-left">
                Decentralized voting platform <br />Powered by Avalanche & Chainlink <br />For secure and transparent voting
              </p>
            </div>

            {/* Center: National Debt Tracker */}
            <div className="flex justify-center">
              <Trillions />
            </div>

            {/* Right: Links */}
            <div className="flex flex-col space-y-1 pt-2 sm:pr-8 text-right">
              <h3 className="text-lg text-white font-bold mb-1">Useful Links</h3>
              <ul className="text-sm space-y-1 pt-2">
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

          <div className="mt-4 pt-4 flex flex-col items-center text-center max-w-7xl mx-auto">
            <p className="text-sm">
              <span className="text-orange-400">DISCLAIMER: This is a student project for educational purposes only - Not affiliated with any government entity</span>
            </p>
            <p className="text-orange-400 text-sm mt-1 md:mt-0">
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