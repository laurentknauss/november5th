'use server' 

import { cache } from 'react'; 

export const getCryptoPrices = cache(async() => { 
    const API_KEY = process.env.COINGECKO_API_KEY;

    try { 
        const response = await fetch(
            `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,avalanche-2,dogecoin,chainlink,pax-gold&vs_currencies=usd&include_24hr_change=true&x_cg_demo_api_key=${API_KEY}`,
            { next: { revalidate: 300 } } // Cache for 5 minutes (300 seconds) - this reduces the api calls by 80% with minimùal code changes - for a portfolio demo app, the slightly less current data is 
            // a reasonable trade-off.
          );
        
          return await response.json();
        } catch (error) { 
            console.error('Error fetchig crypto prices:', error); 
            throw new Error('Failed to fetch crypto priices'); 
        }
        
    
}

