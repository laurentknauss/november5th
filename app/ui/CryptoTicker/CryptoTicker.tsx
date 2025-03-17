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
        const updatedPrices: CryptoPrice[] = [
          { symbol: 'BTC', price: data.bitcoin.usd, change24h: data.bitcoin.usd_24h_change },
          { symbol: 'ETH', price: data.ethereum.usd, change24h: data.ethereum.usd_24h_change },
          { symbol: 'AVAX', price: data['avalanche-2'].usd, change24h: data['avalanche-2'].usd_24h_change },
          { symbol: 'DOGE', price: data.dogecoin.usd, change24h: data.dogecoin.usd_24h_change },
          { symbol: 'LINK', price: data.chainlink.usd, change24h: data.chainlink.usd_24h_change },
          { symbol: 'PAXG', price: data['pax-gold'].usd, change24h: data['pax-gold'].usd_24h_change },
        ];
        
        setCryptoPrices(updatedPrices);
      } catch (error) {
        console.error(error);
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
        ) : (
          cryptoPrices.map((crypto) => (
            <div key={crypto.symbol} className="flex items-center">
              <span className="font-semibold mr-1">{crypto.symbol}</span>
              <span className="mr-1">${crypto.price.toLocaleString(undefined, { 
                minimumFractionDigits: crypto.symbol === 'DOGE' ? 4 : 2, 
                maximumFractionDigits: crypto.symbol === 'DOGE' ? 4 : 2 
              })}</span>
              <span className={`flex items-center text-xs ${crypto.change24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {crypto.change24h >= 0 ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                {Math.abs(crypto.change24h).toFixed(1)}%
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CryptoTicker;
