'use client';

export default function CoinGeckoAttribution() {
  return (
    <div className="absolute left-6 top-6">
      <a 
        href="https://www.coingecko.com?utm_source=november5th&utm_medium=referral" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="flex items-center text-xs text-gray-500 hover:text-gray-700"
      >
        <div className="w-[24px] h-[24px] mr-2 bg-[#8dc63f] rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-[10px]">CG</span>
        </div>
        <span>Powered by CoinGecko</span>
      </a>
    </div>
  );
}