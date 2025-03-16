'use client';

import React from 'react';
import CryptoTicker from '../CryptoTicker/CryptoTicker';

const DisclaimerTicker = () => {
  return (
    <div className="w-full bg-zinc-800 text-white py-2 px-4">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between">
        <div className="text-red-500 font-bold text-center sm:text-left mb-2 sm:mb-0">
          DISCLAIMER: This is a student project for educational purposes only - Not affiliated with any government entity
        </div>
        <CryptoTicker />
      </div>
    </div>
  );
};

export default DisclaimerTicker;