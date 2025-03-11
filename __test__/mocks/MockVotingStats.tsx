import React from 'react';

const MockVotingStats = () => {
  return (
    <div data-testid="voting-stats-component">
      <h2>Current Voting Results</h2>
      <div className="stats-grid">
        <div>
          <div>Total Votes</div>
          <div>100</div>
        </div>
        <div>
          <div>Republican</div>
          <div>40</div>
        </div>
        <div>
          <div>Democrat</div>
          <div>60</div>
        </div>
        <div>
          <div>Time Remaining</div>
          <div>5d 0h</div>
        </div>
      </div>
      <h3>Vote Distribution</h3>
      <div>
        <div>
          <span>Republican</span>
          <span>40.0%</span>
        </div>
        <div>
          <span>Democrat</span>
          <span>60.0%</span>
        </div>
      </div>
    </div>
  );
};

export default MockVotingStats;
