import { useState, useEffect } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
//import { useAccount, useReadContract, useWriteContract, useWaitForTransaction } from 'wagmi';
//import abi from '@/abi'; 


const contractAddress = 'YOUR_CONTRACT_ADDRESS'; // Replace with your deployed contract address

export default function Home() {
  //const { address, isConnected } = useAccount();
  const [votes1, setVotes1] = useState(0);
  const [votes2, setVotes2] = useState(0);
  const [totalVotes, setTotalVotes] = useState(0);
  const [hasVoted, setHasVoted] = useState(false);
  const [votingActive, setVotingActive] = useState(false);
  const [votingFinalized, setVotingFinalized] = useState(false);

  // Get number of votes
  /*const { data: voteData, refetch: refetchVotes } = useReadContract({
    address: contractAddress,
    abi: abi,
    functionName: 'getNumberOfVotes',
    watch: true,
  });

  // Check if user has voted
  const { data: userVoted } = useReadContract({
    address: contractAddress,
    abi: abi,
    functionName: 'hasVoted',
    args: [address],
    enabled: isConnected,
    watch: true,
  });

  // Get voting status
  const { data: votingEndTime } = useReadContract({
    address: contractAddress,
    abi: abi,
    functionName: 'votingEndTime',
    watch: true,
  });

  const { data: votingFinalizedData } = useReadContract({
    address: contractAddress,
    abi: abi,
    functionName: 'votingFinalized',
    watch: true,
  });
*/
  // Vote function
  /*const { write: castVote, data: voteData, isLoading: isVoting, isSuccess: voteSuccess } = useWriteContract({
    address: contractAddress,
    abi: abi,
    functionName: 'vote',
  });

  // Wait for vote transaction
  const { isLoading: isVoteLoading } = useWaitForTransaction({
    hash: voteData?.hash,
  });

  useEffect(() => {
    if (voteData) {
      setVotes1(voteData[0]);
      setVotes2(voteData[1]);
      setTotalVotes(voteData[2]);
    }
  }, [voteData]);

  useEffect(() => {
    if (userVoted !== undefined) {
      setHasVoted(userVoted);
    }
  }, [userVoted]);

  useEffect(() => {
    const now = Math.floor(Date.now() / 1000);
    if (votingEndTime) {
      setVotingActive(now < votingEndTime.toNumber());
    }
  }, [votingEndTime]);

  useEffect(() => {
    if (votingFinalizedData !== undefined) {
      setVotingFinalized(votingFinalizedData);
    }
  }, [votingFinalizedData]);

  
  const handleVote = async (candidateIndex) => {
    try {
      await castVote({ args: [candidateIndex] });
    } catch (error) {
      console.error('Error casting vote:', error);
    }
  };
*/
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold mb-8">Decentralized Voting DApp</h1>

        {isConnected ? (
          <>
            <p className="text-2xl mb-4">Connected: {address}</p>
            {votingActive ? (
              !hasVoted ? (
                <div className="mb-8">
                  <p className="text-xl mb-4">Cast your vote:</p>
                  <div className="flex space-x-4">
                    <button 
                    className="btn bt-primary" onClick={() => handleVote(0)} disabled={isVoting || isVoteLoading}
                    >
                      Candidate 1
                    </button>
                    <button color="secondary" onClick={() => handleVote(1)} disabled={isVoting || isVoteLoading}>
                      Candidate 2
                    </button>
                  </div>
                </div>
              ) : (
                <div className="alert alert-success mb-8">Thank you for voting!</div>
              )
            ) : votingFinalized ? (
              <div className="alert alert-info mb-8">Voting has ended. Results are being finalized.</div>
            ) : (
              <div className="alert alert-warning mb-8">Voting has not started yet.</div>
            )}

            <div className="w-full max-w-md">
              <p className="text-xl mb-4">Current Vote Count:</p>
              <div className="mb-4">
                <progress className="progress progress-primary w-full mb-2"
                    value={votes1} max={totalVotes}>
                </progress>
                
                <p>Candidate 1: {votes1} votes</p>
              </div>
              <div>
                <progress className="progress progress-secondary w-full mb-2"
                value={votes2} max={totalVotes}>
                </progress>
            
                <p>Candidate 2: {votes2} votes</p>
              </div>
              <p className="mt-4">Total Votes: {totalVotes}</p>
            </div>
          </>
        ) : (
          <ConnectButton />
        )}
      </main>
    </div>
  );
}