'use client';

import React, { useState, useEffect } from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface CryptoPrice {
  symbol: string;
  price: number;
  change24h: number;
}

const CryptoTicker = () => {
  const [cryptoPrices, setCryptoPrices] = useState<CryptoPrice[]>([
    { symbol: 'BTC', price: 0, change24h: 0 },
    { symbol: 'ETH', price: 0, change24h: 0 },
    { symbol: 'MATIC', price: 0, change24h: 0 },
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCryptoPrices = async () => {
      try {
        // Fetch data from BitQuery API or use a public API endpoint
        // In production, you should use server-side API routes to hide keys
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,matic-network&vs_currencies=usd&include_24hr_change=true');
        const data = await response.json();

        const updatedPrices = [
          { 
            symbol: 'BTC', 
            price: data.bitcoin.usd, 
            change24h: data.bitcoin.usd_24h_change 
          },
          { 
            symbol: 'ETH', 
            price: data.ethereum.usd, 
            change24h: data.ethereum.usd_24h_change 
          },
          { 
            symbol: 'MATIC', 
            price: data['matic-network'].usd, 
            change24h: data['matic-network'].usd_24h_change 
          },
        ];
        
        setCryptoPrices(updatedPrices);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching crypto prices:', error);
        setLoading(false);
      }
    };

    fetchCryptoPrices();
    
    // Refresh every 60 seconds
    const intervalId = setInterval(fetchCryptoPrices, 60000);
    
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="w-full bg-zinc-900 text-white py-1 overflow-hidden">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div className="text-xs font-bold text-yellow-400 whitespace-nowrap mr-4">
            DISCLAIMER: This is a student project for educational purposes only - Not affiliated with any government entity
          </div>
          
          <div className="flex items-center space-x-6 overflow-x-auto whitespace-nowrap">
            {loading ? (
              <div className="flex space-x-6">
                {["BTC", "ETH", "MATIC"].map((symbol) => (
                  <div key={symbol} className="flex items-center">
                    <div className="h-4 w-16 bg-gray-700 animate-pulse rounded"></div>
                  </div>
                ))}
              </div>
            ) : (
              cryptoPrices.map((crypto) => (
                <div key={crypto.symbol} className="flex items-center">
                  <span className="font-semibold mr-2">{crypto.symbol}</span>
                  <span className="mr-2">${crypto.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  <span 
                    className={`flex items-center text-xs ${
                      crypto.change24h >= 0 ? 'text-green-500' : 'text-red-500'
                    }`}
                  >
                    {crypto.change24h >= 0 ? (
                      <ArrowUp className="h-3 w-3 mr-1" />
                    ) : (
                      <ArrowDown className="h-3 w-3 mr-1" />
                    )}
                    {Math.abs(crypto.change24h).toFixed(2)}%
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CryptoTicker;