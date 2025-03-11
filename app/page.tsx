'use client';

import React, { useState, useEffect } from 'react';
import { Cover } from './ui/Cover';
import Footer from './ui/Footer/Footer';
import { useAccount } from 'wagmi';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import BallotEntrance from './ui/BallotEntrance/BallotEntrance';

const ConnectButton = dynamic(
  () => import('@rainbow-me/rainbowkit').then((mod) => mod.ConnectButton),
  { ssr: false }
);

const REPUBLICAN_LOGO = "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Republicanlogo.svg/1200px-Republicanlogo.svg.png";
const DEMOCRAT_LOGO = "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/DemocraticLogo.svg/1200px-DemocraticLogo.svg.png";

export default function Home() {
  const { isConnected } = useAccount();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="w-full bg-zinc-800 text-red-500 py-2 px-6 text-center font-bold">
        DISCLAIMER: This is a student project for educational purposes only - Not affiliated with any government entity
      </div>

      <div>
        <h1 className="text-4xl md:text-4xl lg:text-6xl font-semibold max-w-7xl mx-auto text-center mt-6 relative z-20 py-6 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white">
          <Cover>The Most Reliable Way to Vote</Cover>
        </h1>
      </div>

      <div className="flex-grow flex flex-col md:flex-row">
        {/* Left side text section */}
        <div className="w-full md:w-1/2 p-6 md:p-16 flex flex-col items-center justify-center">
          <p className="text-lg md:text-xl text-gray-600 mb-6 md:mb-10 text-center px-4">
            Secure, transparent blockchain-based voting platform ensuring every vote counts.
          </p>
          <div className="flex justify-center w-full">
            <div className="transform scale-110 md:scale-125 backdrop-blur-sm bg-white/10 p-4 rounded-xl border border-gray-200/30 shadow-md">
              <ConnectButton />
            </div>
          </div>
        </div>

        {/* Right side party selection */}
        <div className="w-full md:w-1/2 p-6 md:p-16 flex flex-col justify-center space-y-6 md:space-y-8 mt-8 md:mt-0">
          {!mounted ? (
            <div>Loading...</div>
          ) : isConnected ? (
            <BallotEntrance />
          ) : (
            <>
              <div 
                className="w-full h-48 md:h-64 rounded-2xl bg-white/20 backdrop-blur-sm border-2 border-red-500/40 flex items-center justify-center relative shadow-lg"
              >
                <div className="relative w-32 h-32 md:w-48 md:h-48">
                  <Image
                    src={REPUBLICAN_LOGO}
                    alt="Republican Party"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
                <div className="absolute bottom-4 text-white font-bold drop-shadow-md text-sm md:text-base">
                  Republican Party
                </div>
              </div>

              <div 
                className="w-full h-48 md:h-64 rounded-2xl bg-white/20 backdrop-blur-sm border-2 border-blue-500/40 flex items-center justify-center relative shadow-lg"
              >
                <div className="relative w-32 h-32 md:w-48 md:h-48">
                  <Image
                    src={DEMOCRAT_LOGO}
                    alt="Democratic Party"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
                <div className="absolute bottom-4 text-white font-bold drop-shadow-md text-sm md:text-base">
                  Democratic Party
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
}