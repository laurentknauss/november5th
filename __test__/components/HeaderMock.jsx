import React from 'react';

// A minimal mock of the Header component for testing
const Header = ({ title = "Blockchain-based Voting DApp" }) => {
  return (
    <header data-testid="header-component">
      <h1 data-testid="header-title" className="text-5xl text-slate-800 font-bold">
        {title}
      </h1>
      <div data-testid="connect-button">Connect Button</div>
      <div className="animate-pulse"></div>
    </header>
  );
};

export default Header;
