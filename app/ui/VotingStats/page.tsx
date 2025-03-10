'use client';

import React, { useState, useEffect } from 'react';
import { useReadContract } from 'wagmi';
import { ThreeDots } from 'react-loader-spinner';
import { abi } from '@/app/abi';
import { contractAddresses } from '@/app/contractAddresses';
import { cn } from '@/app/lib/utils';
import { AnimatePresence, motion } from 'motion/react';

interface CustomStyle extends React.CSSProperties {
    '--value': number;
    '--size': string;
    '--thickness': string;
}

// Card component for stats
const StatCard = ({
  title,
  value,
  description,
  hovered,
  index,
  setHovered,
  colorClass = "bg-white/20",
  textColorClass = "text-gray-800"
}: {
  title: string;
  value: string | number;
  description: string;
  hovered: number | null;
  index: number;
  setHovered: React.Dispatch<React.SetStateAction<number | null>>;
  colorClass?: string;
  textColorClass?: string;
}) => (
  <div
    onMouseEnter={() => setHovered(index)}
    onMouseLeave={() => setHovered(null)}
    className={cn(
      "relative rounded-xl p-6 backdrop-blur-sm transition-all duration-300 border border-gray-200/30 shadow-lg overflow-hidden",
      colorClass,
      hovered !== null && hovered !== index && "blur-[1px] scale-[0.97]"
    )}
  >
    <AnimatePresence>
      {hovered === index && (
        <motion.span
          className="absolute inset-0 bg-white/10"
          layoutId="hoverBackground"
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { duration: 0.15 },
          }}
          exit={{
            opacity: 0,
            transition: { duration: 0.15, delay: 0.2 },
          }}
        />
      )}
    </AnimatePresence>
    <div className="relative z-10">
      <div className="text-sm font-medium mb-1 opacity-70">{title}</div>
      <div className={cn("text-3xl font-bold", textColorClass)}>{value}</div>
      <div className="text-xs mt-2 opacity-60">{description}</div>
    </div>
  </div>
);

// Progress bar with 3D effect
const ProgressBar3D = ({
  percentage,
  color,
  partyName
}: {
  percentage: number;
  color: string;
  partyName: string;
}) => (
  <div className="relative w-full mb-8">
    <div className="flex justify-between items-center mb-2">
      <span className={`text-lg font-medium ${color}`}>{partyName}</span>
      <span className={`text-lg font-medium ${color}`}>{percentage.toFixed(1)}%</span>
    </div>
    <div className="relative h-10 bg-gray-200/30 backdrop-blur-sm rounded-lg overflow-hidden border border-gray-200/20 shadow-inner">
      <motion.div 
        className={`absolute top-0 left-0 h-full ${color} rounded-lg`}
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent"></div>
      </motion.div>
    </div>
  </div>
);

// Main component
const VotingStats: React.FC = () => {
    const [mounted, setMounted] = useState(false);
    const [hovered, setHovered] = useState<number | null>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    const { data: votingResults, isLoading: isLoadingResults } = useReadContract({
        address: contractAddresses[421614][0] as `0x${string}`,
        abi: abi,
        functionName: 'getVotingResults',
    });

    const { data: votingEndTime, isLoading: isLoadingEndTime } = useReadContract({
        address: contractAddresses[421614][0] as `0x${string}`,
        abi: abi,
        functionName: 'votingEndTime',
    });

    const totalVotes = votingResults ? Number(votingResults[0]) + Number(votingResults[1]) : 0;

    const republicanPercentage = totalVotes > 0 
        ? (Number(votingResults?.[0]) / totalVotes) * 100 
        : 0;

    const democratPercentage = totalVotes > 0 
        ? (Number(votingResults?.[1]) / totalVotes) * 100 
        : 0;

    const timeRemaining = votingEndTime ? Number(votingEndTime) * 1000 - Date.now() : 0;
    const daysRemaining = Math.max(0, Math.floor(timeRemaining / (1000 * 60 * 60 * 24)));
    const hoursRemaining = Math.max(0, Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));

    if (!mounted || isLoadingResults || isLoadingEndTime) {
        return (
            <div className="w-full max-w-4xl mx-auto flex justify-center items-center py-8">
                <ThreeDots color="#4B5563" height={50} width={50} />
            </div>
        );
    }

    const statCards = [
        {
            title: "Total Votes",
            value: totalVotes,
            description: "Votes cast so far"
        },
        {
            title: "Republican",
            value: Number(votingResults?.[0]),
            description: "Votes for Republican candidate",
            colorClass: "bg-red-500/10",
            textColorClass: "text-red-500"
        },
        {
            title: "Democrat",
            value: Number(votingResults?.[1]),
            description: "Votes for Democratic candidate",
            colorClass: "bg-blue-500/10",
            textColorClass: "text-blue-500"
        },
        {
            title: "Time Remaining",
            value: `${daysRemaining}d ${hoursRemaining}h`,
            description: "Until voting closes"
        }
    ];

    return (
        <div className="w-full max-w-4xl mx-auto p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-gray-200/20 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Current Voting Results</h2>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {statCards.map((card, index) => (
                    <StatCard
                        key={card.title}
                        title={card.title}
                        value={card.value}
                        description={card.description}
                        hovered={hovered}
                        index={index}
                        setHovered={setHovered}
                        colorClass={card.colorClass}
                        textColorClass={card.textColorClass}
                    />
                ))}
            </div>

            {/* Vote Distribution */}
            <div className="mb-8 bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-gray-200/20 shadow-inner">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Vote Distribution</h3>

                {/* Progress Bars */}
                <div className="space-y-6">
                    <ProgressBar3D
                        percentage={republicanPercentage}
                        color="bg-red-500 text-red-500"
                        partyName="Republican"
                    />
                    <ProgressBar3D
                        percentage={democratPercentage}
                        color="bg-blue-500 text-blue-500"
                        partyName="Democrat"
                    />
                </div>

                {/* 3D Comparison */}
                <div className="flex flex-col sm:flex-row justify-center items-center gap-8 mt-10">
                    <div 
                        className="group relative transform transition-all duration-500 hover:scale-105"
                        style={{perspective: "1000px"}}
                    >
                        <motion.div 
                            className="flex flex-col items-center bg-red-500/80 text-white p-6 rounded-xl shadow-lg border border-red-400"
                            whileHover={{
                                rotateY: 10,
                                rotateX: 10,
                                translateZ: 10
                            }}
                        >
                            <div className="text-5xl font-bold mb-2">{republicanPercentage.toFixed(0)}%</div>
                            <span className="text-lg">Republican</span>
                            <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </motion.div>
                    </div>

                    <div className="text-gray-500 text-xl font-bold">VS</div>

                    <div 
                        className="group relative transform transition-all duration-500 hover:scale-105"
                        style={{perspective: "1000px"}}
                    >
                        <motion.div 
                            className="flex flex-col items-center bg-blue-500/80 text-white p-6 rounded-xl shadow-lg border border-blue-400"
                            whileHover={{
                                rotateY: -10,
                                rotateX: 10,
                                translateZ: 10
                            }}
                        >
                            <div className="text-5xl font-bold mb-2">{democratPercentage.toFixed(0)}%</div>
                            <span className="text-lg">Democrat</span>
                            <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VotingStats;