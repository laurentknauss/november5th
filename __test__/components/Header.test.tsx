import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '../components/HeaderMock';

// The ConnectButton from rainbow-kit is already mocked in jest.setup.js

describe('Header', () => {
  it('renders the default title correctly', () => {
    render(<Header />);
    
    // Check for the default title
    expect(screen.getByText('Blockchain-based Voting DApp')).toBeInTheDocument();
  });

  it('renders a custom title when provided', () => {
    const customTitle = 'Custom Header Title';
    render(<Header title={customTitle} />);
    
    // Check for the custom title
    expect(screen.getByText(customTitle)).toBeInTheDocument();
    
    // Make sure the default title is not rendered
    expect(screen.queryByText('Blockchain-based Voting DApp')).not.toBeInTheDocument();
  });

  it('shows a loading placeholder when not mounted', () => {
    // Override the useEffect implementation to not set mounted to true
    jest.spyOn(React, 'useEffect').mockImplementationOnce(cb => {});
    
    const { container } = render(<Header />);
    
    // Check for the loading placeholder
    expect(container.querySelector('.animate-pulse')).toBeInTheDocument();
    
    // The ConnectButton should not be visible yet
    expect(screen.queryByTestId('connect-button')).not.toBeInTheDocument();
  });

  it('shows the ConnectButton when mounted', () => {
    // Let useEffect run normally to set mounted to true
    render(<Header />);
    
    // Check for the ConnectButton
    expect(screen.getByTestId('connect-button')).toBeInTheDocument();
  });

  it('applies styling classes to title', () => {
    const { container } = render(<Header />);
    
    // Check for styling classes on the title
    const titleElement = screen.getByText('Blockchain-based Voting DApp');
    expect(titleElement).toHaveClass('text-5xl');
    expect(titleElement).toHaveClass('font-bold');
    expect(titleElement).toHaveClass('text-slate-800');
  });
});
