'use client';

import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import Image from 'next/image';
import BallotEntrance from './ui/BallotEntrance/page';

const REPUBLICAN_LOGO = "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Republicanlogo.svg/1200px-Republicanlogo.svg.png";
const DEMOCRAT_LOGO = "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/DemocraticLogo.svg/1200px-DemocraticLogo.svg.png";

export default function Home() {
  const { isConnected } = useAccount();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-14 text-center pt-10">
        <h1 className="text-5xl text-white font-bold mb-8 drop-shadow-lg">Blockchain-based Voting DApp</h1>
        
        <div className="mb-8 p-4 border-2 border-gray-700 rounded-lg bg-gray-900 bg-opacity-80 shadow-xl">
          <ConnectButton />
        </div>

        {isConnected ? (
          <BallotEntrance />
        ) : (
          <div className="space-y-6">
            <p className="text-xl text-white pt-2 pb-8 mt-6 px-6 py-4 bg-gray-900 bg-opacity-70 rounded-lg shadow-lg border border-gray-700">Please connect your wallet to participate in the secure blockchain-based voting process</p>
            
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
    </div>
  );
}