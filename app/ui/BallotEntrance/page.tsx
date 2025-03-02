'use client';

import { FC, useState, useEffect } from 'react';
import { useWriteContract, useReadContract, useAccount, useWaitForTransactionReceipt, useDisconnect } from 'wagmi';
import { ThreeDots } from 'react-loader-spinner';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import VotingStats from '../VotingStats/page';
import { abi } from '@/app/abi';
import { contractAddresses } from '@/app/contractAddresses';

type MessageType = {
  type: 'info' | 'error' | 'success';
  content: string;
} | null;

const REPUBLICAN_LOGO = "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Republicanlogo.svg/1200px-Republicanlogo.svg.png";
const DEMOCRAT_LOGO = "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/DemocraticLogo.svg/1200px-DemocraticLogo.svg.png";

const BallotEntrance: FC = () => {
  const router = useRouter();
  const { disconnect } = useDisconnect();
  const { isConnected, address } = useAccount();
  const [isTransacting, setIsTransacting] = useState(false);
  const [message, setMessage] = useState<MessageType>(null);
  
  // Client-side state to prevent hydration mismatch
  const [mounted, setMounted] = useState(false);

  // Only run after hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  // Read contract states
  const { data: hasVoted, isLoading: isLoadingHasVoted } = useReadContract({
    address: contractAddresses[421614][0] as `0x${string}`,
    abi: abi,
    functionName: 'hasVoted',
    args: address ? [address] : undefined
  });

  const { data: votingEndTime, isLoading: isLoadingVotingEndTime } = useReadContract({
    address: contractAddresses[421614][0] as `0x${string}`,
    abi: abi,
    functionName: 'votingEndTime'
  });

  const { data: votingFinalized, isLoading: isLoadingVotingFinalized } = useReadContract({
    address: contractAddresses[421614][0] as `0x${string}`,
    abi: abi,
    functionName: 'votingFinalized'
  });

  const { data: requiredBalance, isLoading: isLoadingRequiredBalance } = useReadContract({
    address: contractAddresses[421614][0] as `0x${string}`,
    abi: abi,
    functionName: 'requiredBalance'
  });

  // Write contract functions
  const { writeContract: vote, data: voteData } = useWriteContract();

  // Wait for transaction receipt
  const { isLoading: isConfirming, isSuccess: isConfirmed } = 
    useWaitForTransactionReceipt({
      hash: voteData,
    });

  const handleVote = async (candidateIndex: number) => {
    if (!isConnected || !address) {
      setMessage({ type: 'error', content: 'Please connect your wallet first' });
      return;
    }

    try {
      setIsTransacting(true);
      setMessage({ type: 'info', content: 'Please confirm the transaction in your wallet' });

      await vote({
        address: contractAddresses[421614][0] as `0x${string}`,
        abi: abi,
        functionName: 'vote',
        args: [BigInt(candidateIndex)],
      });

    } catch (error) {
      console.error('Error voting:', error);
      
      // Parse common blockchain errors with more user-friendly messages
      let errorMessage = 'Failed to cast vote';
      
      if (error instanceof Error) {
        const errorString = error.message.toLowerCase();
        
        if (errorString.includes('user rejected') || errorString.includes('user denied')) {
          errorMessage = 'Transaction rejected in wallet';
        } else if (errorString.includes('insufficient funds') || errorString.includes('gas')) {
          errorMessage = 'Insufficient funds for transaction';
        } else if (errorString.includes('nonce')) {
          errorMessage = 'Transaction nonce error. Please try again';
        } else if (errorString.includes('balance')) {
          errorMessage = 'Insufficient token balance to vote';
        } else if (errorString.includes('execution reverted')) {
          // Extract the revert reason if available
          const revertMatch = errorString.match(/execution reverted: (.+?)(?:"|}|$)/i);
          errorMessage = revertMatch ? `Smart contract error: ${revertMatch[1]}` : 'Smart contract execution failed';
        } else {
          errorMessage = error.message;
        }
      }
      
      setMessage({ 
        type: 'error', 
        content: errorMessage
      });
    } finally {
      setIsTransacting(false);
    }
  };

  // Update message when transaction is confirmed
  useEffect(() => {
    if (isConfirmed) {
      setMessage({ type: 'success', content: 'Vote successfully cast!' });
    }
  }, [isConfirmed]);

  const handleDisconnect = () => {
    disconnect();
    router.push('/');
  };

  if (!isConnected) {
    return (
      <div className="text-center p-6">
        <p className="text-lg">Please connect your wallet to vote</p>
      </div>
    );
  }

  // Prevent hydration mismatch by showing a loading state initially
  if (!mounted) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white bg-opacity-90 rounded-lg shadow-md border border-slate-200">
      <h2 className="text-3xl font-bold mb-6 text-slate-800">Cast Your Vote</h2>
        <div className="flex justify-center py-12">
          <ThreeDots color="#4B5563" height={50} width={50} />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-amber-50 bg-opacity-90 rounded-lg shadow-lg border border-amber-200">
      <h2 className="text-3xl font-bold mb-6 text-amber-900">Cast Your Vote</h2>

      {/* Voting Stats Section */}
      <section className="mb-8">
        <VotingStats />
      </section>

      {message && (
        <div className={`p-4 mb-4 rounded-lg shadow ${
          message.type === 'error' ? 'bg-red-100 text-red-700' :
          message.type === 'success' ? 'bg-green-100 text-green-700' :
          'bg-blue-100 text-blue-700'
        }`}>
          {message.content}
        </div>
      )}

      {isLoadingHasVoted || isLoadingVotingFinalized ? (
        <div className="bg-gray-100 p-6 rounded-lg mb-6 flex justify-center shadow-inner">
          <ThreeDots color="#4B5563" height={40} width={40} />
        </div>
      ) : hasVoted ? (
        <div className="bg-blue-900 bg-opacity-60 p-6 rounded-lg mb-6 shadow-md border border-blue-800">
          <p className="mb-2 text-white text-xl">You have already cast your vote</p>
          <p className="text-blue-200">Thank you for participating in the democratic process!</p>
        </div>
      ) : votingFinalized ? (
        <div className="bg-yellow-900 bg-opacity-60 p-6 rounded-lg mb-6 shadow-md border border-yellow-800">
          <p className="mb-2 text-white text-xl">Voting has been finalized</p>
          <p className="text-yellow-200">The voting period has ended. Results will be announced soon.</p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex gap-8 w-full">
            <button
              onClick={() => handleVote(0)}
              disabled={isTransacting || isConfirming}
              className="flex-1 bg-red-600 text-white py-4 px-12 rounded-lg hover:bg-red-700 disabled:opacity-50 min-w-[300px] text-xl flex flex-col items-center justify-center gap-4 shadow-md hover:shadow-lg transform hover:-translate-y-1 transition duration-200 border-2 border-red-700"
            >
              {isTransacting || isConfirming ? (
                <div className="flex items-center justify-center">
                  <ThreeDots color="#ffffff" height={24} width={24} />
                </div>
              ) : (
                <>
                  <div className="relative w-24 h-24 mb-2">
                    <Image
                      src={REPUBLICAN_LOGO}
                      alt="Republican Party"
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>
                  <span>Vote Republican</span>
                </>
              )}
            </button>

            <button
              onClick={() => handleVote(1)}
              disabled={isTransacting || isConfirming}
              className="flex-1 bg-blue-600 text-white py-4 px-12 rounded-lg hover:bg-blue-700 disabled:opacity-50 min-w-[300px] text-xl flex flex-col items-center justify-center gap-4 shadow-md hover:shadow-lg transform hover:-translate-y-1 transition duration-200 border-2 border-blue-700"
            >
              {isTransacting || isConfirming ? (
                <div className="flex items-center justify-center">
                  <ThreeDots color="#ffffff" height={24} width={24} />
                </div>
              ) : (
                <>
                  <div className="relative w-24 h-24 mb-2">
                    <Image
                      src={DEMOCRAT_LOGO}
                      alt="Democratic Party"
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>
                  <span>Vote Democrat</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      <p className="text-sm text-slate-600 mt-6 mb-8 border-t border-b border-slate-200 py-3">
        Required balance to vote: {isLoadingRequiredBalance ? (
          <span className="inline-flex items-center"><ThreeDots color="#4B5563" height={12} width={24} /></span>
        ) : (
          requiredBalance ? `${Number(requiredBalance)} USDC` : "loading..."
        )}
      </p>

      <div className="flex justify-center mt-12">
        <button
          onClick={handleDisconnect}
          className="px-8 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-lg shadow-md hover:shadow-lg transform hover:-translate-y-1"
        >
          Disconnect and Return Home
        </button>
      </div>
    </div>
  );
};

export default BallotEntrance;
