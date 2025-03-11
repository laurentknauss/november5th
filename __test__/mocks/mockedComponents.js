import React from 'react';

// Create a mock BallotEntrance component
jest.mock('@/app/ui/BallotEntrance/BallotEntrance', () => {
  return function MockBallotEntrance() {
    return (
      <div className="mocked-ballot-entrance">
        <h2>Cast Your Vote</h2>
        <button>Vote Republican</button>
        <button>Vote Democrat</button>
        <button>Disconnect and Return Home</button>
      </div>
    );
  };
});

// Create a mock VotingStats component
jest.mock('@/app/ui/VotingStats/VotingStats', () => {
  return function MockVotingStats() {
    return (
      <div data-testid="voting-stats-component">
        Voting Stats Component
      </div>
    );
  };
});
