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
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold mb-8">Blockchain-based Voting DApp</h1>

        
        <div className="mb-8 p-4 border-2 border-black rounded-lg bg-[#87CEEB] shadow-lg">
          <ConnectButton />
        </div>

        {isConnected ? (
          <BallotEntrance />
        ) : (
          <div className="space-y-6">
            <p className="text-xl mt-4">Please connect your wallet to participate in voting</p>
            
            <div className="flex justify-center gap-12 mt-8">
              <div className="text-center">
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

              <div className="text-center">
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