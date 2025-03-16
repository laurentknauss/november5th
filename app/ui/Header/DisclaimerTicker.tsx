'use client';

import React from 'react';
import CryptoTicker from '../CryptoTicker/CryptoTicker';

const DisclaimerTicker = () => {
  return (
    <div className="w-full bg-zinc-800 text-white py-2 px-4">
      <div className="container mx-auto flex flex-col sm:flex-row items-center">
        <div className="text-red-500 font-bold sm:mr-auto">
          DISCLAIMER: This is a student project for educational purposes only - Not affiliated with any government entity
        </div>
        <div className="mt-2 sm:mt-0">
          <CryptoTicker />
        </div>
      </div>
    </div>
  );
};

export default DisclaimerTicker;