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
    { symbol: 'AVAX', price: 0, change24h: 0 },
    { symbol: 'DOGE', price: 0, change24h: 0 },
    { symbol: 'LINK', price: 0, change24h: 0 },
    { symbol: 'PAXG', price: 0, change24h: 0 },
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCryptoPrices = async () => {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,avalanche-2,dogecoin,chainlink,pax-gold&vs_currencies=usd&include_24hr_change=true');
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
            symbol: 'AVAX', 
            price: data['avalanche-2'].usd, 
            change24h: data['avalanche-2'].usd_24h_change 
          },
          { 
            symbol: 'DOGE', 
            price: data.dogecoin.usd, 
            change24h: data.dogecoin.usd_24h_change 
          },
          { 
            symbol: 'LINK', 
            price: data.chainlink.usd, 
            change24h: data.chainlink.usd_24h_change 
          },
          { 
            symbol: 'PAXG', 
            price: data['pax-gold'].usd, 
            change24h: data['pax-gold'].usd_24h_change 
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
    <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
      {loading ? (
        <>
          {Array(6).fill(0).map((_, i) => (
            <div key={i} className="h-4 w-16 bg-gray-700 animate-pulse rounded"></div>
          ))}
        </>
      ) : (
        cryptoPrices.map((crypto) => (
          <div key={crypto.symbol} className="flex items-center">
            <span className="font-semibold mr-1">{crypto.symbol}</span>
            <span className="mr-1">${crypto.price.toLocaleString(undefined, { 
              minimumFractionDigits: crypto.symbol === 'DOGE' ? 4 : 2, 
              maximumFractionDigits: crypto.symbol === 'DOGE' ? 4 : 2 
            })}</span>
            <span 
              className={`flex items-center text-xs ${
                crypto.change24h >= 0 ? 'text-green-500' : 'text-red-500'
              }`}
            >
              {crypto.change24h >= 0 ? (
                <ArrowUp className="h-3 w-3" />
              ) : (
                <ArrowDown className="h-3 w-3" />
              )}
              {Math.abs(crypto.change24h).toFixed(1)}%
            </span>
          </div>
        ))
      )}
    </div>
  );
};

export default CryptoTicker;