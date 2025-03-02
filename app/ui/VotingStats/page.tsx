'use client';

import React from 'react';
import { useReadContract } from 'wagmi';
import { ThreeDots } from 'react-loader-spinner';
import { abi } from '@/app/abi';
import { contractAddresses } from '@/app/contractAddresses';

const VotingStats: React.FC = () => {
  // Read voting results from contract
  const { data: votingResults, isLoading: isLoadingResults } = useReadContract({
    address: contractAddresses[421614][0] as `0x${string}`,
    abi: abi,
    functionName: 'getVotingResults',
  });
  
  // Read voting end time
  const { data: votingEndTime, isLoading: isLoadingEndTime } = useReadContract({
    address: contractAddresses[421614][0] as `0x${string}`,
    abi: abi,
    functionName: 'votingEndTime',
  });

  // Get total votes
  const totalVotes = votingResults 
    ? Number(votingResults[0]) + Number(votingResults[1]) 
    : 0;
  
  // Calculate percentage for each candidate
  const republicanPercentage = totalVotes > 0 
    ? (Number(votingResults ? votingResults[0] : 0) / totalVotes) * 100 
    : 0;
  
  const democratPercentage = totalVotes > 0 
    ? (Number(votingResults ? votingResults[1] : 0) / totalVotes) * 100 
    : 0;
  
  // Calculate time remaining until voting ends
  const timeRemaining = votingEndTime ? Number(votingEndTime) * 1000 - Date.now() : 0;
  const daysRemaining = Math.max(0, Math.floor(timeRemaining / (1000 * 60 * 60 * 24)));
  const hoursRemaining = Math.max(0, Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));

  if (isLoadingResults || isLoadingEndTime) {
    return (
      <div className="flex justify-center items-center py-8">
        <ThreeDots color="#ffffff" height={50} width={50} />
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto font-[Inter]">
      <h2 className="text-2xl font-bold text-white mb-6">Current Voting Results</h2>
      
      {/* Stats Component */}
      <div className="stats stats-vertical lg:stats-horizontal shadow w-full bg-[#f8f4e3] text-gray-800 mb-8">
        <div className="stat">
          <div className="stat-title font-medium">Total Votes</div>
          <div className="stat-value text-3xl font-semibold">{totalVotes}</div>
          <div className="stat-desc font-light">Votes cast so far</div>
        </div>
        
        <div className="stat">
          <div className="stat-title font-medium">Republican</div>
          <div className="stat-value text-red-500 font-semibold">{votingResults ? Number(votingResults[0]) : 0}</div>
          <div className="stat-desc font-light">Votes for Republican candidate</div>
        </div>
        
        <div className="stat">
          <div className="stat-title font-medium">Democrat</div>
          <div className="stat-value text-blue-500 font-semibold">{votingResults ? Number(votingResults[1]) : 0}</div>
          <div className="stat-desc font-light">Votes for Democratic candidate</div>
        </div>
        
        <div className="stat">
          <div className="stat-title font-medium">Time Remaining</div>
          <div className="stat-value text-2xl font-semibold">{daysRemaining}d {hoursRemaining}h</div>
          <div className="stat-desc font-light">Until voting closes</div>
        </div>
      </div>
      
      {/* Progress Indicators */}
      <div className="grid grid-cols-1 gap-6 mb-8 bg-[#f8f4e3] p-6 rounded-lg shadow-inner">
        <h3 className="text-xl font-bold text-gray-800 col-span-full mb-4">Vote Distribution</h3>
        
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <span className="text-lg font-medium text-red-500">Republican</span>
            <span className="text-lg font-medium text-red-500">{republicanPercentage.toFixed(1)}%</span>
          </div>
          <progress 
            className="progress progress-error w-full h-6" 
            value={republicanPercentage} 
            max="100"
          ></progress>
        </div>
        
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <span className="text-lg font-medium text-blue-500">Democrat</span>
            <span className="text-lg font-medium text-blue-500">{democratPercentage.toFixed(1)}%</span>
          </div>
          <progress 
            className="progress progress-info w-full h-6" 
            value={democratPercentage} 
            max="100"
          ></progress>
        </div>
        
        {/* Alternative Visualization - Radial Progress */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-8 mt-4">
          <div className="flex flex-col items-center">
            <div 
              className="radial-progress text-red-500" 
              style={{ "--value": republicanPercentage, "--size": "8rem", "--thickness": "0.8rem" }}
              role="progressbar"
            >
              {republicanPercentage.toFixed(0)}%
            </div>
            <span className="mt-2 text-lg">Republican</span>
          </div>
          
          <div className="flex flex-col items-center">
            <div 
              className="radial-progress text-blue-500" 
              style={{ "--value": democratPercentage, "--size": "8rem", "--thickness": "0.8rem" }}
              role="progressbar"
            >
              {democratPercentage.toFixed(0)}%
            </div>
            <span className="mt-2 text-lg">Democrat</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VotingStats;
