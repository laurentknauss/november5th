/*

'use client';

import React, { useState, useEffect } from 'react';

interface DebtData {
  total_debt: number;
  last_updated: string;
}

const formatMillions = (amount: number): string => {
  // Convert to millions and format with commas
  const millions = amount / 1_000_000;
  return `${millions.toLocaleString()} Million`;
};

const Trillions: React.FC = () => {
  const [debtData, setDebtData] = useState<DebtData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);


  useEffect( () => {
    setMounted(true) ; 
  } , []); 



  useEffect(() => {
    if(!mounted) return; 
    const fetchTreasuryData = async () => {
      // Using the fiscaldata.treasury.gov API - ensure we get the latest data
      const today = new Date();
      
      // Include filter parameters to ensure we get recent data
      // Fetch data from the last 30 days to get the most recent
      const thirtyDaysAgo = new Date(today);
      thirtyDaysAgo.setDate(today.getDate() - 30);
      const formattedThirtyDaysAgo = thirtyDaysAgo.toISOString().split('T')[0];
      
      const url = `https://api.fiscaldata.treasury.gov/services/api/fiscal_service/v2/accounting/od/debt_to_penny?sort=-record_date&page[size]=10&filter=record_date:gte:${formattedThirtyDaysAgo}`;
      const response = await fetch(url, { 
        cache: 'no-store',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`Error fetching Treasury data: ${response.status}`);
      }

      const data = await response.json();
      
      // Log data for debugging
      console.log('Debt data fetched:', data);
      
      if (data.data && data.data.length > 0) {
        // Sort by date to ensure we get the latest
        const sortedData = [...data.data].sort((a, b) => {
          return new Date(b.record_date).getTime() - new Date(a.record_date).getTime();
        });
        
        const latestData = sortedData[0];
        console.log('Latest data:', latestData);
        
        setDebtData({
          total_debt: parseFloat(latestData.tot_pub_debt_out_amt),
          last_updated: latestData.record_date
        });
      } else {
        throw new Error('No data received from Treasury API');
      }
    };

    const fetchDebtClockData = async () => {
      // As a fallback, we'll estimate the current debt based on known values
      // This is less accurate but provides a reasonable approximation
      // Current debt is approximately $34 trillion (early 2024)
      const estimatedDebt = 34.2 * 1_000_000_000_000; // $34.2 trillion base
      const now = new Date();
      
      setDebtData({
        total_debt: estimatedDebt,
        last_updated: now.toISOString().split('T')[0]
      });
    };

    const fetchDebtData = async () => {
      try {
        // First try the Treasury API with expanded parameters
        await fetchTreasuryData();
      } catch (primaryError) {
        console.error('Primary data source failed, trying backup:', primaryError);
        try {
          // Fallback to debt clock estimation
          await fetchDebtClockData();
        } catch (backupError) {
          console.error('All data sources failed:', backupError);
          setError('Unable to fetch debt data from any source');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDebtData();

    // Set up interval to refresh data every 5 minutes
    const intervalId = setInterval(fetchDebtData, 5 * 60 * 1000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, [mounted]); 

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
      <div className="flex flex-col items-center justify-center py-4 px-4 text-center">
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
    <div className="flex flex-col items-center justify-center py-4 px-4 text-center">
      <h2 className="text-xl font-bold text-white mb-3">US National Debt in Millions</h2>
      <div className="text-4xl font-bold text-red-500 mb-2">
        {currentDebt ? formatMillions(currentDebt) : 'Loading...'}
      </div>
      <div className="text-sm text-gray-400">
         {debtData?.last_updated ? new Date(debtData.last_updated).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : 'Unknown'}
      </div>
      <div className="mt-2 text-sm text-gray-500">Real-time estimate based on U.S. Treasury data</div>
    </div>
  );
};



  
    // During server render or before hydration, show a loading skeleton
    if (!mounted) {
      return (
        <div className=\"flex flex-col items-center justify-center py-4 px-4 text-center\">
          <div className=\"h-6 w-64 bg-gray-300/20 rounded mb-3\"></div>
          <div className=\"h-10 w-48 bg-gray-300/20 rounded mb-2\"></div>
          <div className=\"h-4 w-32 bg-gray-300/20 rounded\"></div>
        </div>
      );
    }
  
    if (loading) {
      return (
        <div className=\"flex flex-col items-center justify-center py-4 px-4 text-center\">
          <div className=\"animate-pulse w-64 h-12 bg-gray-300 rounded mb-2\"></div>
          <div className=\"animate-pulse w-48 h-4 bg-gray-200 rounded\"></div>
        </div>
      );
    }
  
    if (error) {
      return (
        <div className=\"flex flex-col items-center justify-center p-6 bg-red-50 rounded-lg border border-red-200\">
          <div className=\"text-red-700 font-medium\">Failed to load US National Debt data</div>
          <div className=\"text-red-500 text-sm\">{error}</div>
        </div>
      );
    }
  
    return (
      <div className=\"flex flex-col items-center justify-center py-4 px-4 text-center\">
        <h2 className=\"text-xl font-bold text-white mb-3\">US National Debt in Millions</h2>
        <div className=\"text-4xl font-bold text-red-500 mb-2\">
          {debtData ? formatMillions(debtData.total_debt) : 'Loading...'}
        </div>
        {debtData && (
          <p className=\"text-sm text-gray-400\" suppressHydrationWarning>
            Refreshed at {new Date(debtData.last_updated).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })} at {new Date(debtData.last_updated).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
          </p>
        )}
      </div>
    );
  };















export default Trillions;
*/


'use client';

import React, { useState, useEffect } from 'react';

interface DebtData {
  total_debt: number;
  last_updated: string;
}

const formatMillions = (amount: number): string => {
  // Convert to millions and format with commas
  const millions = amount / 1_000_000;
  return `${millions.toLocaleString()} Million`;
};

const Trillions: React.FC = () => {
  const [debtData, setDebtData] = useState<DebtData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState<boolean>(false);
  const [currentDebt, setCurrentDebt] = useState<number | null>(null);

  // Set mounted state to true after hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  // Data fetching effect - only runs on client
  useEffect(() => {
    if (!mounted) return;
    
    const fetchTreasuryData = async () => {
      // Using the fiscaldata.treasury.gov API - ensure we get the latest data
      const today = new Date();
      
      // Include filter parameters to ensure we get recent data
      // Fetch data from the last 30 days to get the most recent
      const thirtyDaysAgo = new Date(today);
      thirtyDaysAgo.setDate(today.getDate() - 30);
      const formattedThirtyDaysAgo = thirtyDaysAgo.toISOString().split('T')[0];
      
      const url = `https://api.fiscaldata.treasury.gov/services/api/fiscal_service/v2/accounting/od/debt_to_penny?sort=-record_date&page[size]=10&filter=record_date:gte:${formattedThirtyDaysAgo}`;
      const response = await fetch(url, { 
        cache: 'no-store',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`Error fetching Treasury data: ${response.status}`);
      }

      const data = await response.json();
      
      // Log data for debugging
      console.log('Debt data fetched:', data);
      
      if (data.data && data.data.length > 0) {
        // Sort by date to ensure we get the latest
        const sortedData = [...data.data].sort((a, b) => {
          return new Date(b.record_date).getTime() - new Date(a.record_date).getTime();
        });
        
        const latestData = sortedData[0];
        console.log('Latest data:', latestData);
        
        setDebtData({
          total_debt: parseFloat(latestData.tot_pub_debt_out_amt),
          last_updated: latestData.record_date
        });
      } else {
        throw new Error('No data received from Treasury API');
      }
    };

    const fetchDebtClockData = async () => {
      // As a fallback, we'll estimate the current debt based on known values
      // This is less accurate but provides a reasonable approximation
      // Current debt is approximately $34 trillion (early 2024)
      const estimatedDebt = 34.2 * 1_000_000_000_000; // $34.2 trillion base
      const now = new Date();
      
      setDebtData({
        total_debt: estimatedDebt,
        last_updated: now.toISOString().split('T')[0]
      });
    };

    const fetchDebtData = async () => {
      try {
        // First try the Treasury API with expanded parameters
        await fetchTreasuryData();
      } catch (primaryError) {
        console.error('Primary data source failed, trying backup:', primaryError);
        try {
          // Fallback to debt clock estimation
          await fetchDebtClockData();
        } catch (backupError) {
          console.error('All data sources failed:', backupError);
          setError('Unable to fetch debt data from any source');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDebtData();

    // Set up interval to refresh data every 5 minutes
    const intervalId = setInterval(fetchDebtData, 5 * 60 * 1000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, [mounted]); 

  // Real-time debt counter effect
  useEffect(() => {
    if (!debtData || !mounted) return;
    
    // Set initial debt amount
    setCurrentDebt(debtData.total_debt);
    
    // US debt increases roughly by $4 million per minute
    // That's about $66,666 per second
    const increasePerSecond = 66666;
    
    const intervalId = setInterval(() => {
      setCurrentDebt(prev => prev !== null ? prev + increasePerSecond : null);
    }, 1000);
    
    return () => clearInterval(intervalId);
  }, [debtData, mounted]);

  // During server render or before hydration, show a loading skeleton
  if (!mounted) {
    return (
      <div className="flex flex-col items-center justify-center py-4 px-4 text-center">
        <div className="h-6 w-64 bg-gray-300/20 rounded mb-3"></div>
        <div className="h-10 w-48 bg-gray-300/20 rounded mb-2"></div>
        <div className="h-4 w-32 bg-gray-300/20 rounded"></div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-4 px-4 text-center">
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
    <div className="flex flex-col items-center justify-center py-4 px-4 text-center">
      <h2 className="text-xl font-bold text-white mb-3">US National Debt in Millions</h2>
      <div className="text-4xl font-bold text-red-500 mb-2">
        {currentDebt ? formatMillions(currentDebt) : 'Loading...'}
      </div>
      <div className="text-sm text-gray-400" suppressHydrationWarning>
        {debtData?.last_updated ? new Date(debtData.last_updated).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : 'Unknown'}
      </div>
      <div className="mt-2 text-sm text-gray-500">Real-time estimate based on U.S. Treasury data</div>
    </div>
  );
};

export default Trillions;
