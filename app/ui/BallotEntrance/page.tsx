"use client";

import { FC, useState, useEffect } from 'react';
import { useWriteContract, useReadContract, useAccount, useWaitForTransactionReceipt, useDisconnect } from 'wagmi';
import { ThreeDots } from 'react-loader-spinner';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
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

  // Read contract states
  const { data: hasVoted } = useReadContract({
    address: contractAddresses[421614][0] as `0x${string}`,
    abi: abi,
    functionName: 'hasVoted',
    
  });

  const { data: votingEndTime } = useReadContract({
    address: contractAddresses[421614][0] as `0x${string}`,
    abi: abi,
    functionName: 'votingEndTime',
  });

  const { data: votingFinalized } = useReadContract({
    address: contractAddresses[421614][0] as `0x${string}`,
    abi: abi,
    functionName: 'votingFinalized',
  });

  const { data: requiredBalance } = useReadContract({
    address: contractAddresses[421614][0] as `0x${string}`,
    abi: abi,
    functionName: 'requiredBalance',
  });

  // Write contract functions
  const { writeContract: vote, data: voteData } = useWriteContract();

  // Wait for transaction receipt
  const { isLoading: isConfirming, isSuccess: isConfirmed } = 
    useWaitForTransactionReceipt({
      hash: voteData,
    });

  const handleVote = async (candidateIndex: number) => {
    if (!isConnected) {
      setMessage({ type: 'error', content: 'Please connect your wallet first' });
      return;
    }

    try {
      setIsTransacting(true);
      setMessage({ type: 'info', content: 'Please confirm the transaction in your wallet' });

      await vote({
        address: contractAddresses[421614][0]    as `0x${string}`,
        abi: abi,
        functionName: 'vote',
        args: [BigInt(candidateIndex)],
      });

    } catch (error) {
      console.error('Error voting:', error);
      setMessage({ 
        type: 'error', 
        content: error instanceof Error ? error.message : 'Failed to cast vote' 
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

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Cast Your Vote</h2>

      {message && (
        <div className={`p-4 mb-4 rounded ${
          message.type === 'error' ? 'bg-red-100 text-red-700' :
          message.type === 'success' ? 'bg-green-100 text-green-700' :
          'bg-blue-100 text-blue-700'
        }`}>
          {message.content}
        </div>
      )}

      {hasVoted ? (
        <div className="bg-gray-100 p-4 rounded mb-4">
          <p className="mb-4">You have already cast your vote</p>
        </div>
      ) : votingFinalized ? (
        <div className="bg-yellow-100 p-4 rounded mb-4">
          <p className="mb-4">Voting has been finalized</p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex gap-8 w-full">
            <button
              onClick={() => handleVote(0)}
              disabled={isTransacting || isConfirming}
              className="flex-1 bg-red-500 text-white py-4 px-12 rounded-lg hover:bg-red-600 disabled:opacity-50 min-w-[300px] text-xl flex flex-col items-center justify-center gap-4"
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
              className="flex-1 bg-blue-500 text-white py-4 px-12 rounded-lg hover:bg-blue-600 disabled:opacity-50 min-w-[300px] text-xl flex flex-col items-center justify-center gap-4"
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

      <p className="text-sm text-gray-600 mt-6 mb-8">
        Required balance to vote: 100 USDC
      </p>

      <div className="flex justify-center mt-12">
        <button
          onClick={handleDisconnect}
          className="px-8 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-lg"
        >
          Disconnect and Return Home
        </button>
      </div>
    </div>
  );
};

export default BallotEntrance;




