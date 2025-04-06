'use client';

import React, { useState, useEffect } from 'react';
import { FlipWords } from './ui/FlipWords';
import Footer from './ui/Footer/Footer';
import { useAccount } from 'wagmi';
import CryptoTicker from './ui/CryptoTicker/CryptoTicker';

import Image from 'next/image';
import BallotEntrance from './ui/BallotEntrance/BallotEntrance';
import Web3ConnectButton from './ui/Web3ConnectButton';


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
      <div className="w-full bg-zinc-800 text-white py-2 px-4">
        <div className="container mx-auto">
          <CryptoTicker />
        </div>
      </div>
      
      <div className="font-unlock flex-grow flex flex-col md:flex-row ">
        {/* Left side text section */}
        <div className="w-full md:w-1/2 p-6 md:p-16 flex flex-col items-center justify-center">

        <h1 className="text-2xl font-frijole-regular  sm:text-3xl md:text-4xl lg:text-6xl font-bold max-w-7xl mx-auto text-center mt-6 relative z-20 py-6 bg-clip-text bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white overflow-visible min-h-[100px] sm:min-h-[120px]">
        The Most <FlipWords words={["Secure", "Reliable", "Transparent"]} duration={3000} className="text-inherit" /> Way To Vote
        </h1>
  
        <p className="text-shadow-lg text-xl md:text-xl text-slate-900 mb-6 md:mb-10 text-center capitalize px-4 "> Blockchain-based voting platform ensuring every vote counts.   </p>
          <div className="flex justify-center w-full">
            <div className="transform scale-100 md:scale-125 backdrop-blur-md p-8 rounded-xl bg-none ">
              <Web3ConnectButton />
            </div>
          </div>
        </div>

        {/* Right side party selection */}
        <div className="w-full md:w-1/2 p-10 md:p-16 flex flex-col justify-center space-y-6 md:space-y-8 mt-8 md:mt-0">
          {!mounted ? (
            <div>Loading...</div>
          ) : isConnected ? (
            <BallotEntrance />
          ) : (
            <>
              <div 
                className="w-full max-w-xs mx-auto h-24 md:h-32 rounded-xl bg-transparent backdrop-blur-sm border-4 border-solid  border-slate-700 flex items-center justify-center relative shadow-md"
              >
                <div className="relative w-18 h-20 md:w-24 md:h-24">
                  <Image
                    src={REPUBLICAN_LOGO}
                    alt="Republican Party"
                    fill
                    style={{ objectFit: 'contain' }}
                    className="object-contain" 
                    priority
                  />
                </div>
                <div className="relative bottom-0 text-slate-800 font-bold drop-shadow-md text-md md:text-sm mb-0 mt-2">
                  Republican Party
                </div>
              </div>

              <div 
                className="w-full max-w-xs mx-auto h-20 md:h-32 rounded-xl bg-transparent backdrop-blur-sm border-4 border-solid    border-slate-700  flex items-center justify-center relative shadow-md"
              >
                <div className="relative w-18 h-20 md:w-24 md:h-24">
                  <Image
                    src={DEMOCRAT_LOGO}
                    alt="Democratic Party"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
                <div className="relative bottom-0 text-slate-700 font-bold drop-shadow-md text-xs md:text-sm mb-0 mt-2">
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