'use client';

import React, { useState, useEffect } from 'react';
import Header from './ui/Header/page';
import Footer from './ui/Footer/page';
import { useAccount } from 'wagmi';
import Image from 'next/image';
import BallotEntrance from './ui/BallotEntrance/page';

const REPUBLICAN_LOGO = "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Republicanlogo.svg/1200px-Republicanlogo.svg.png";
const DEMOCRAT_LOGO = "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/DemocraticLogo.svg/1200px-DemocraticLogo.svg.png";

export default function Home() {
  const { isConnected } = useAccount();
  const [mounted, setMounted] = useState(false);

  // Only run after hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen py-0">
      <div className="w-full bg-zinc-800 text-red-500 py-2 px-6 text-center font-bold">
        DISCLAIMER: This is a student project for educational purposes only - Not affiliated with any government entity
      </div>
      <main className="flex flex-col items-center w-full flex-1 px-14 text-center pt-0">
        <Header />

        {!mounted ? (
          <div className="flex justify-center items-center py-24">
            <div className="animate-pulse bg-gray-300 opacity-20 w-64 h-64 rounded-full"></div>
          </div>
        ) : isConnected ? (
          <BallotEntrance />
        ) : (
          <div className="space-y-6">
            <p className="text-xl text-zinc-800 pt-2 pb-8 mt-6 px-6 py-4 bg-none ">
              Please connect your wallet to participate in the secure blockchain-based voting process</p>
            
            <div className="flex justify-center gap-12 mt-8">
              <div className="text-center bg-gray-100 p-10 rounded-full shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition duration-300 border-4 border-red-600">
                <div className="relative w-32 h-32 mb-4">
                  <Image
                    src={REPUBLICAN_LOGO}
                    alt="Republican Party"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
                <p className="text-lg font-semibold text-red-600">Republican Party</p>
              </div>

              <div className="text-center bg-gray-100 p-10 rounded-full shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition duration-300 border-4 border-blue-600">
                <div className="relative w-32 h-32 mb-4">
                  <Image
                    src={DEMOCRAT_LOGO}
                    alt="Democratic Party"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
                <p className="text-lg font-semibold text-blue-600">Democratic Party</p>
              </div>
            </div>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
}