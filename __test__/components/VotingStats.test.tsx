import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useReadContract } from 'wagmi';
import VotingStats from '@/app/ui/VotingStats/VotingStats';

// We'll use the global mock from jest.setup.js for motion/react

describe('VotingStats', () => {
  // Mock implementation for loading state
  const mockLoadingState = () => {
    (useReadContract as jest.Mock).mockImplementation(() => ({
      data: null,
      isLoading: true,
    }));
  };

  // Mock implementation for data state
  const mockDataState = () => {
    (useReadContract as jest.Mock).mockImplementation((params) => {
      if (params.functionName === 'getVotingResults') {
        return {
          data: [BigInt(40), BigInt(60)],
          isLoading: false,
        };
      } else if (params.functionName === 'votingEndTime') {
        // Return a voting end time 5 days from now
        const nowInSeconds = Math.floor(Date.now() / 1000);
        const fiveDaysInSeconds = 5 * 24 * 60 * 60;
        return {
          data: BigInt(nowInSeconds + fiveDaysInSeconds),
          isLoading: false,
        };
      }
      return { data: null, isLoading: false };
    });
  };

  beforeEach(() => {
    // Mock Date.now to return a consistent value
    jest.spyOn(Date, 'now').mockImplementation(() => new Date('2025-03-11').getTime());
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('shows loading spinner when data is loading', () => {
    mockLoadingState();
    render(<VotingStats />);
    
    // Should show loading indicator
    expect(screen.getByTestId('three-dots-loader')).toBeInTheDocument();
    
    // Shouldn't show any stats yet
    expect(screen.queryByText('Current Voting Results')).not.toBeInTheDocument();
  });

  it('renders voting stats when data is available', () => {
    mockDataState();
    render(<VotingStats />);
    
    // Component title
    expect(screen.getByText('Current Voting Results')).toBeInTheDocument();
    
    // Stats cards
    expect(screen.getByText('Total Votes')).toBeInTheDocument();
    expect(screen.getAllByText('Republican')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Democrat')[0]).toBeInTheDocument();
    expect(screen.getByText('Time Remaining')).toBeInTheDocument();
    
    // Vote values
    expect(screen.getByText('100')).toBeInTheDocument(); // Total votes (40 + 60)
    expect(screen.getByText('40')).toBeInTheDocument(); // Republican votes
    expect(screen.getByText('60')).toBeInTheDocument(); // Democrat votes
    
    // Vote distribution heading
    expect(screen.getByText('Vote Distribution')).toBeInTheDocument();
    
    // Vote percentages
    expect(screen.getByText('40.0%')).toBeInTheDocument(); // Republican percentage
    expect(screen.getByText('60.0%')).toBeInTheDocument(); // Democrat percentage
  });

  it('displays the correct time remaining', () => {
    mockDataState();
    render(<VotingStats />);
    
    // With our 5-day mock, we should see "5d 0h" (or similar)
    expect(screen.getByText(/5d \d+h/)).toBeInTheDocument();
  });

  it('calculates percentages correctly', () => {
    // Override the getVotingResults mock for this specific test
    (useReadContract as jest.Mock).mockImplementation((params) => {
      if (params.functionName === 'getVotingResults') {
        return {
          data: [BigInt(25), BigInt(75)], // 25% Republican, 75% Democrat
          isLoading: false,
        };
      } else if (params.functionName === 'votingEndTime') {
        return {
          data: BigInt(Math.floor(Date.now() / 1000) + 86400), // 1 day
          isLoading: false,
        };
      }
      return { data: null, isLoading: false };
    });
    
    render(<VotingStats />);
    
    // Check percentages are calculated correctly
    expect(screen.getByText('25.0%')).toBeInTheDocument(); // Republican percentage
    expect(screen.getByText('75.0%')).toBeInTheDocument(); // Democrat percentage
  });
});
