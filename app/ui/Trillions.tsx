'use client';

import React, { useState, useEffect } from 'react';

interface DebtData {
  total_debt: number;
  last_updated: string;
}

const formatTrillion = (amount: number): string => {
  // Convert to trillions and format with 2 decimal places
  const trillions = amount / 1_000_000_000_000;
  return `$${trillions.toFixed(2)} Trillion`;
};

const Trillions: React.FC = () => {
  const [debtData, setDebtData] = useState<DebtData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDebtData = async () => {
      try {
        // Using the fiscaldata.treasury.gov API
        const response = await fetch('https://api.fiscaldata.treasury.gov/services/api/fiscal_service/v2/accounting/od/debt_to_penny?sort=-record_date&page[size]=1');
        
        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.status}`);
        }

        const data = await response.json();
        
        if (data.data && data.data.length > 0) {
          const latestData = data.data[0];
          setDebtData({
            total_debt: parseFloat(latestData.tot_pub_debt_out_amt),
            last_updated: latestData.record_date
          });
        } else {
          throw new Error('No data received from API');
        }
      } catch (err) {
        console.error('Failed to fetch debt data:', err);
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchDebtData();

    // Set up interval to refresh data every 5 minutes
    const intervalId = setInterval(fetchDebtData, 5 * 60 * 1000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  // Add counter effect that simulates real-time debt increase
  const [currentDebt, setCurrentDebt] = useState<number | null>(null);

  useEffect(() => {
    if (!debtData) return;
    
    // Set initial debt amount
    setCurrentDebt(debtData.total_debt);
    
    // US debt increases roughly by $4 million per minute
    // That's about $66,666 per second
    const increasePerSecond = 66666;
    
    const intervalId = setInterval(() => {
      setCurrentDebt(prev => prev !== null ? prev + increasePerSecond : null);
    }, 1000);
    
    return () => clearInterval(intervalId);
  }, [debtData]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-center">
        <div className="animate-pulse w-64 h-12 bg-gray-300 rounded mb-2"></div>
        <div className="animate-pulse w-48 h-4 bg-gray-200 rounded"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-6 bg-red-50 rounded-lg border border-red-200">
        <div className="text-red-700 font-medium">Failed to load US National Debt data</div>
        <div className="text-red-500 text-sm">{error}</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center p-6 text-center">
      <h2 className="text-2xl font-bold text-white mb-2">US National Debt</h2>
      <div className="text-4xl font-bold text-red-500 mb-2">
        {currentDebt ? formatTrillion(currentDebt) : 'Loading...'}
      </div>
      <div className="text-sm text-gray-400">
        Last official update: {debtData?.last_updated ? new Date(debtData.last_updated).toLocaleDateString() : 'Unknown'}
      </div>
      <div className="mt-2 text-xs text-gray-500">Real-time estimate based on U.S. Treasury data</div>
    </div>
  );
};

export default Trillions;
