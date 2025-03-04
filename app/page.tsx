'use client';

import React, { useState, useEffect } from 'react';
import Header from './ui/Header/Header';
import Footer from './ui/Footer/page';
import { useAccount } from 'wagmi';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import BallotEntrance from './ui/BallotEntrance/page';

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
    <div className="min-h-screen bg-white flex flex-col">
      <div className="w-full bg-zinc-800 text-red-500 py-2 px-6 text-center font-bold">
        DISCLAIMER: This is a student project for educational purposes only - Not affiliated with any government entity
      </div>

      <div className="flex-grow flex">
        {/* Left side text section */}
        <div className="w-1/2 p-16 flex flex-col justify-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            The Most Reliable Way to Vote
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Secure, transparent blockchain-based voting platform ensuring every vote counts.
          </p>
          <div className="w-full max-w-xs">
            <ConnectButton />
          </div>
        </div>

        {/* Right side party selection */}
        <div className="w-1/2 p-16 flex flex-col justify-center space-y-8">
          {!mounted ? (
            <div>Loading...</div>
          ) : isConnected ? (
            <BallotEntrance />
          ) : (
            <>
              <div 
                className="w-full h-64 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center relative"
              >
                <div className="relative w-48 h-48">
                  <Image
                    src={REPUBLICAN_LOGO}
                    alt="Republican Party"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
                <div className="absolute bottom-4 text-white font-bold">
                  Republican Party
                </div>
              </div>

              <div 
                className="w-full h-64 rounded-2xl bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center relative"
              >
                <div className="relative w-48 h-48">
                  <Image
                    src={DEMOCRAT_LOGO}
                    alt="Democratic Party"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
                <div className="absolute bottom-4 text-white font-bold">
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