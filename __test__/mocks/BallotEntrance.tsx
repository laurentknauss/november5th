import React from 'react';

const BallotEntrance = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-amber-50 bg-opacity-90 rounded-lg shadow-lg border border-amber-200">
      <h2 className="text-3xl font-bold mb-6 text-amber-900">Cast Your Vote</h2>
      
      <div className="space-y-4">
        <div className="flex gap-8 w-full">
          <button className="vote-button" data-testid="vote-republican">
            <span>Vote Republican</span>
          </button>
          
          <button className="vote-button" data-testid="vote-democrat">
            <span>Vote Democrat</span>
          </button>
        </div>
      </div>
      
      <p className="text-sm text-amber-800 mt-6 mb-8">
        Required balance to vote: 100 USDC
      </p>
      
      <div className="flex justify-center mt-12">
        <button className="disconnect-button">
          Disconnect and Return Home
        </button>
      </div>
    </div>
  );
};

export default BallotEntrance;
