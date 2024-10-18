// app/page.tsx
"use client"; // This is a Client Component

import { useState, useEffect } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useReadContract, useWriteContract } from 'wagmi';
//import { readContract } from 'wagmi'; // Import useContractRead hook
import {abi} from '@/app/abi'; // Import your contract ABI

// DaisyUI components
import { Button, Label, Progress } from 'daisyui';

const contractAddress = '0xYOUR_CONTRACT_ADDRESS'; // Replace with your contract address

export default function Home() {
  const { address, isConnected } = useAccount();
  const [candidate1Votes, setCandidate1Votes] = useState(0);
  const [candidate2Votes, setCandidate2Votes] = useState(0);
  const [hasVoted, setHasVoted] = useState(false);

/*  // Wagmi contract hooks
  const { data: votes1 } = useReadContract({
    address: contractAddress,
    abi: abi,
    functionName: 'getVotes', // Replace with your function name to get candidate 1 votes
    args: [0], // Assuming candidate 1 is at index 0
  });

  const { data: votes2 } = useReadContract({
    address: contractAddress,
    abi: abi,
    functionName: 'getVotes', // Replace with your function name to get candidate 2 votes
    args: [1], // Assuming candidate 2 is at index 1
  });

  /*
  const { write: castVote } = useWriteContract({
    address: contractAddress,
    abi: abi,
    functionName: 'vote', // Replace with your vote function name
  });

  // Update vote counts when data is fetched
  useEffect(() => {
    if (votes1) {
      setCandidate1Votes(votes1.toNumber());
    }
    if (votes2) {
      setCandidate2Votes(votes2.toNumber());
    }
  }, [votes1, votes2]);

  // Check if user has already voted (replace with your logic)
  useEffect(() => {
    const checkIfVoted = async () => {
      if (address) {
        // Example: Assuming your contract has a hasVoted function
        const hasVoted = await readContract { // Adjust this to useContractRead
          address: contractAddress,
          abi: abi,
          functionName: 'hasVoted',
          args: [address],
        };
        setHasVoted(hasVoted);
      }
    };
    checkIfVoted();
  }, [address]);

  const handleVote = async (candidateIndex: number) => {
    try {
      await castVote({
        args: [candidateIndex],
      });
      // Optionally update vote counts immediately or wait for the next data fetch
      if (candidateIndex === 0) {
        setCandidate1Votes(candidate1Votes + 1);
      } else {
        setCandidate2Votes(candidate2Votes + 1);
      }
      setHasVoted(true);
    } catch (error) {
      console.error('Error casting vote:', error);
      // Handle error (e.g., display an error message to the user)
    }
  };*/

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold">
          Decentralized Voting Dapp
        </h1> In MAINTENANCE

        <div className="mt-10">
          {isConnected ? (
            <div>
              <p className="text-2xl">Connected with: {address}</p>
              {/* Voting Section */}
              {!hasVoted ? (
                <div className="mt-10">
                  <Label className="text-xl">Cast your vote:</Label>
                  <div className="flex space-x-4 mt-4">
                    <Button color="primary"
                     >
                      Candidate 1
                    </Button>
                    <Button color="secondary" >
                      Candidate 2
                    </Button>
                  </div>
                </div>
              ) : (
                <p className="text-xl mt-10">Thank you for voting!</p>
              )}

              {/* Vote Count Section */}
              <div className="mt-10">
                <Label className="text-xl">Vote Count:</Label>
                <div className="mt-4">
                  <Progress
                    className="w-96"
                    value={candidate1Votes}
                    max={candidate1Votes + candidate2Votes}
                    color="primary"
                  />
                  <p>
                    Candidate 1: {candidate1Votes} vote
                    {candidate1Votes !== 1 ? 's' : ''}
                  </p>
                </div>
                <div className="mt-2">
                  <Progress
                    className="w-96"
                    value={candidate2Votes}
                    max={candidate1Votes + candidate2Votes}
                    color="secondary"
                  />
                  <p>
                    Candidate 2: {candidate2Votes} vote
                    {candidate2Votes !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <ConnectButton />
          )}
        </div>
      </main>
    </div>
  );
}