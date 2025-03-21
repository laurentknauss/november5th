'use client';

import Image from 'next/image'; 
import Link from 'next/link'; 
import React, { useState, useEffect } from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { getCryptoPrices } from '@/app/actions/crypto';

interface CryptoPrice {
  symbol: string;
  price: number;
  change24h: number;
}

const CryptoTicker = () => {
  const [cryptoPrices, setCryptoPrices] = useState<CryptoPrice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCryptoPrices = async () => {
      try {
        const data = await getCryptoPrices();
        console.log('Fetched data in component:', data); // Debug log
        
        // Check if data is valid before processing
        if (!data || typeof data !== 'object') {
          console.error('Invalid data received from API:', data);
          setLoading(false);
          return;
        }
        
        // Helper function to safely get crypto price info
        const getCryptoInfo = (cryptoId: string) => {
          const info = data[cryptoId];
          return {
            price: info?.usd ?? 0,
            change24h: info?.usd_24h_change ?? 0
          };
        };
        
        const updatedPrices: CryptoPrice[] = [
          { symbol: 'BTC', ...getCryptoInfo('bitcoin') },
          { symbol: 'ETH', ...getCryptoInfo('ethereum') },
          { symbol: 'AVAX', ...getCryptoInfo('avalanche-2') },
          { symbol: 'DOGE', ...getCryptoInfo('dogecoin') },
          { symbol: 'LINK', ...getCryptoInfo('chainlink') },
          { symbol: 'PAXG', ...getCryptoInfo('pax-gold') },
        ];
        
        setCryptoPrices(updatedPrices);
      } catch (error) {
        console.error('Error fetching crypto prices:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCryptoPrices();
    const intervalId = setInterval(fetchCryptoPrices, 60000);
    
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full bg-zinc-700 min-h-[75px] flex items-center">
      
      {/* CoinGecko Logo à gauche */}
      <div className="absolute left-0 flex items-center pl-4">
        <Link href="https://www.coingecko.com/en/api?utm_source=yourprojectname&utm_medium=referral" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center">
          <Image
            src="/images/coingecko-logo.png"
            alt="CoinGecko Logo"
            width={80}
            height={25}
            className="mr-2"
          />
          <span className="text-md font-bold text-white">Data by CoinGecko</span>
        </Link>
      </div>

      {/* Ticker des cryptos à droite */}
      <div className="absolute right-0 flex items-center gap-4 pr-4">
        {loading ? (
          Array(6).fill(0).map((_, i) => (
            <div key={i} className="h-4 w-16 bg-gray-700 animate-pulse rounded"></div>
          ))
        ) : cryptoPrices.length === 0 ? (
          <div className="text-amber-400 text-sm">Price data unavailable</div>
        ) : (
          cryptoPrices.map((crypto) => (
            <div key={crypto.symbol} className="flex items-center">
              <span className="font-semibold mr-1">{crypto.symbol}</span>
              <span className="mr-1">${(crypto.price || 0).toLocaleString(undefined, { 
                minimumFractionDigits: crypto.symbol === 'DOGE' ? 4 : 2, 
                maximumFractionDigits: crypto.symbol === 'DOGE' ? 4 : 2 
              })}</span>
              <span className={`flex items-center text-xs ${(crypto.change24h || 0) >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {(crypto.change24h || 0) >= 0 ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                {Math.abs(crypto.change24h || 0).toFixed(1)}%
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CryptoTicker;
