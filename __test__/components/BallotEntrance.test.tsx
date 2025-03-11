import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useAccount, useDisconnect, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import BallotEntrance from '@/app/ui/BallotEntrance/BallotEntrance';

// Mock VotingStats in a simpler way that's compatible with React 19
jest.mock('@/app/ui/VotingStats/VotingStats', () => {
  return function MockVotingStats() {
    return React.createElement('div', {'data-testid': 'voting-stats-component'}, 'Voting Stats Component');
  };
});


describe('BallotEntrance', () => {
  const mockPush = jest.fn();
  
  // Setup for connected user test
  const setupConnectedUser = () => {
    (useAccount as jest.Mock).mockReturnValue({
      isConnected: true,
      address: '0x123456789abcdef',
    });
    
    (useDisconnect as jest.Mock).mockReturnValue({
      disconnect: jest.fn(),
    });
    
    // Default behavior for contract read states
    (useReadContract as jest.Mock).mockImplementation((params) => {
      if (params.functionName === 'hasVoted') {
        return { data: false, isLoading: false };
      } else if (params.functionName === 'votingEndTime') {
        return { data: BigInt(Math.floor(Date.now() / 1000) + 86400), isLoading: false };
      } else if (params.functionName === 'votingFinalized') {
        return { data: false, isLoading: false };
      } else if (params.functionName === 'requiredBalance') {
        return { data: BigInt(100), isLoading: false };
      }
      return { data: null, isLoading: false };
    });
    
    // Default behavior for write contract
    (useWriteContract as jest.Mock).mockReturnValue({
      writeContract: jest.fn(),
      data: null,
    });
    
    // Default behavior for wait for transaction
    (useWaitForTransactionReceipt as jest.Mock).mockReturnValue({
      isLoading: false,
      isSuccess: false,
    });
  };
  
  // Setup for disconnected user test
  const setupDisconnectedUser = () => {
    (useAccount as jest.Mock).mockReturnValue({
      isConnected: false,
      address: undefined,
    });
  };
  
  // Setup for user who has already voted
  const setupUserHasVoted = () => {
    setupConnectedUser();
    (useReadContract as jest.Mock).mockImplementation((params) => {
      if (params.functionName === 'hasVoted') {
        return { data: true, isLoading: false };
      } else if (params.functionName === 'votingEndTime') {
        return { data: BigInt(Math.floor(Date.now() / 1000) + 86400), isLoading: false };
      } else if (params.functionName === 'votingFinalized') {
        return { data: false, isLoading: false };
      } else if (params.functionName === 'requiredBalance') {
        return { data: BigInt(100), isLoading: false };
      }
      return { data: null, isLoading: false };
    });
  };
  
  // Setup for when voting is finalized
  const setupVotingFinalized = () => {
    setupConnectedUser();
    (useReadContract as jest.Mock).mockImplementation((params) => {
      if (params.functionName === 'hasVoted') {
        return { data: false, isLoading: false };
      } else if (params.functionName === 'votingEndTime') {
        return { data: BigInt(Math.floor(Date.now() / 1000) - 86400), isLoading: false };
      } else if (params.functionName === 'votingFinalized') {
        return { data: true, isLoading: false };
      } else if (params.functionName === 'requiredBalance') {
        return { data: BigInt(100), isLoading: false };
      }
      return { data: null, isLoading: false };
    });
  };

  beforeEach(() => {
    // Mock the router's push method
    const mockPush = jest.fn();
    jest.requireMock('next/navigation').useRouter.mockReturnValue({
      push: mockPush,
    });
    
    // Reset mocks before each test
    jest.clearAllMocks();
  });

  it('shows a message when user is not connected', () => {
    setupDisconnectedUser();
    render(<BallotEntrance />);
    
    expect(screen.getByText('Please connect your wallet to vote')).toBeInTheDocument();
    expect(screen.queryByText('Cast Your Vote')).not.toBeInTheDocument();
  });

  it('shows loading state before mounting', () => {
    setupConnectedUser();
    
    // Override useEffect to keep mounted state as false
    jest.spyOn(React, 'useEffect').mockImplementationOnce(cb => {});
    
    render(<BallotEntrance />);
    
    expect(screen.getByText('Cast Your Vote')).toBeInTheDocument();
    expect(screen.getByTestId('three-dots-loader')).toBeInTheDocument();
  });

  it('shows voting options when user is connected and has not voted', () => {
    setupConnectedUser();
    render(<BallotEntrance />);
    
    // Title should be present
    expect(screen.getByText('Cast Your Vote')).toBeInTheDocument();
    
    // Voting stats component should be rendered
    expect(screen.getByTestId('voting-stats-component')).toBeInTheDocument();
    
    // Vote buttons should be present
    expect(screen.getByText('Vote Republican')).toBeInTheDocument();
    expect(screen.getByText('Vote Democrat')).toBeInTheDocument();
    
    // Required balance should be shown
    expect(screen.getByText('Required balance to vote:')).toBeInTheDocument();
    expect(screen.getByText('100 USDC')).toBeInTheDocument();
    
    // Disconnect button should be present
    expect(screen.getByText('Disconnect and Return Home')).toBeInTheDocument();
  });

  it('shows already voted message when user has voted', () => {
    setupUserHasVoted();
    render(<BallotEntrance />);
    
    expect(screen.getByText('You have already cast your vote')).toBeInTheDocument();
    expect(screen.getByText('Thank you for participating in the democratic process!')).toBeInTheDocument();
    
    // Vote buttons should not be present
    expect(screen.queryByText('Vote Republican')).not.toBeInTheDocument();
    expect(screen.queryByText('Vote Democrat')).not.toBeInTheDocument();
  });

  it('shows voting finalized message when voting is over', () => {
    setupVotingFinalized();
    render(<BallotEntrance />);
    
    expect(screen.getByText('Voting has been finalized')).toBeInTheDocument();
    expect(screen.getByText('The voting period has ended. Results will be announced soon.')).toBeInTheDocument();
    
    // Vote buttons should not be present
    expect(screen.queryByText('Vote Republican')).not.toBeInTheDocument();
    expect(screen.queryByText('Vote Democrat')).not.toBeInTheDocument();
  });

  it('handles voting for Republican candidate', () => {
    setupConnectedUser();
    const mockWriteContract = jest.fn();
    (useWriteContract as jest.Mock).mockReturnValue({
      writeContract: mockWriteContract,
      data: null,
    });
    
    render(<BallotEntrance />);
    
    // Click the Republican vote button
    fireEvent.click(screen.getByText('Vote Republican'));
    
    // Check if writeContract was called with correct parameters
    expect(mockWriteContract).toHaveBeenCalledWith(expect.objectContaining({
      functionName: 'vote',
      args: [BigInt(0)], // 0 for Republican
    }));
  });

  it('handles voting for Democrat candidate', () => {
    setupConnectedUser();
    const mockWriteContract = jest.fn();
    (useWriteContract as jest.Mock).mockReturnValue({
      writeContract: mockWriteContract,
      data: null,
    });
    
    render(<BallotEntrance />);
    
    // Click the Democrat vote button
    fireEvent.click(screen.getByText('Vote Democrat'));
    
    // Check if writeContract was called with correct parameters
    expect(mockWriteContract).toHaveBeenCalledWith(expect.objectContaining({
      functionName: 'vote',
      args: [BigInt(1)], // 1 for Democrat
    }));
  });

  it('handles disconnect button click', () => {
    setupConnectedUser();
    const mockDisconnect = jest.fn();
    (useDisconnect as jest.Mock).mockReturnValue({
      disconnect: mockDisconnect,
    });
    
    render(<BallotEntrance />);
    
    // Click the disconnect button
    fireEvent.click(screen.getByText('Disconnect and Return Home'));
    
    // Check if disconnect was called
    expect(mockDisconnect).toHaveBeenCalled();
    
    // Check if router.push was called with correct path
    expect(mockPush).toHaveBeenCalledWith('/');
  });

  it('shows loading state when transaction is in progress', () => {
    setupConnectedUser();
    const mockWriteContract = jest.fn();
    (useWriteContract as jest.Mock).mockReturnValue({
      writeContract: mockWriteContract,
      data: '0xtxhash',
    });
    (useWaitForTransactionReceipt as jest.Mock).mockReturnValue({
      isLoading: true,
      isSuccess: false,
    });
    
    render(<BallotEntrance />);
    
    // First click to initiate transaction
    fireEvent.click(screen.getByText('Vote Republican'));
    
    // Re-render to simulate state update
    render(<BallotEntrance />);
    
    // Should show loading indicators and disable buttons
    expect(screen.getAllByTestId('three-dots-loader')).toHaveLength(2); // One in Republican button, one in Democrat
    expect(screen.queryByText('Vote Republican')).not.toBeInTheDocument();
    expect(screen.queryByText('Vote Democrat')).not.toBeInTheDocument();
  });

  it('shows success message when transaction is confirmed', () => {
    setupConnectedUser();
    (useWriteContract as jest.Mock).mockReturnValue({
      writeContract: jest.fn(),
      data: '0xtxhash',
    });
    (useWaitForTransactionReceipt as jest.Mock).mockReturnValue({
      isLoading: false,
      isSuccess: true,
    });
    
    render(<BallotEntrance />);
    
    // Success message should appear
    expect(screen.getByText('Vote successfully cast!')).toBeInTheDocument();
  });
});
