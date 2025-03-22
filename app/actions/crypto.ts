'use server';

import { cache } from 'react';

export const getCryptoPrices = cache(async () => {
    const API_KEY = process.env.COINGECKO_API_KEY;

    try {
        // Log API key presence (not the actual key) for debugging
        console.log(`API key is ${API_KEY ? 'present' : 'missing'} for CoinGecko`);

        const apiUrl = `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,avalanche-2,dogecoin,chainlink,pax-gold&vs_currencies=usd&include_24hr_change=true`;
        
        // Only add API key if it exists
        const fullUrl = API_KEY ? `${apiUrl}&x_cg_demo_api_key=${API_KEY}` : apiUrl;

        const response = await fetch(
            fullUrl,
            { 
                next: { revalidate: 300 }, // Cache for 5 minutes
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            }
        );
        
        if (!response.ok) {
            console.error(`API Error: ${response.status} ${response.statusText}`);
            return {}; // Return empty object instead of throwing, so UI can handle gracefully
        }
        
        const data = await response.json();
        console.log("Fetched Crypto Prices:", data); // Debug: Log data in server logs

        return data;
    } catch (error) {
        console.error("Error fetching crypto prices:", error);
        return {}; // Return empty object to avoid breaking the UI
    }
});
