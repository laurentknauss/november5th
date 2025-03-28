import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Footer from '@/app/ui/Footer/Footer';

// Mock the Trillions component in a way compatible with React 19
jest.mock('@/app/ui/Trillions', () => {
  return function MockTrillions() {
    return React.createElement('div', {'data-testid': 'trillions-component'}, 'Trillions Component');
  };
});


describe('Footer', () => {
  beforeEach(() => {
    // Mock the Date constructor to return a fixed date
    const mockDate = new Date('2025-03-11T12:00:00Z');
    jest.spyOn(global, 'Date').mockImplementation(() => mockDate as unknown as Date);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders the footer component correctly', () => {
    render(<Footer />);
    
    // Verify main section headings
    expect(screen.getByText('Blockchain Voting')).toBeInTheDocument();
    expect(screen.getByText('Useful Links')).toBeInTheDocument();
    
    // Verify description text
    expect(screen.getByText(/Decentralized voting platform/i)).toBeInTheDocument();
    expect(screen.getByText(/Powered by Avalanche & Chainlink/i)).toBeInTheDocument();
    
    // Verify Trillions component is rendered
    expect(screen.getByTestId('trillions-component')).toBeInTheDocument();
  });

  it('contains links to external resources', () => {
    render(<Footer />);
    
    // Check for Avalanche link
    const avalancheLink = screen.getByText('Avalanche');
    expect(avalancheLink).toBeInTheDocument();
    expect(avalancheLink.closest('a')).toHaveAttribute('href', 'https://www.avax.network/');
    
    // Check for Fuji Explorer link
    const fujiLink = screen.getByText('Fuji Explorer');
    expect(fujiLink).toBeInTheDocument();
    expect(fujiLink.closest('a')).toHaveAttribute('href', 'https://testnet.snowtrace.io/');
    
    // Check for USA.gov Voting link
    const usaGovLink = screen.getByText('USA.gov Voting');
    expect(usaGovLink).toBeInTheDocument();
    expect(usaGovLink.closest('a')).toHaveAttribute('href', 'https://www.usa.gov/voting');
  });

  

  it('includes the developer credit with link', () => {
    render(<Footer />);
    
    // Check for the developer credit
    const developerLink = screen.getByText('Laurent Knauss');
    expect(developerLink).toBeInTheDocument();
    expect(developerLink.closest('a')).toHaveAttribute('href', 'https://knauss.dev');
    
    // Check for the role text
    expect(screen.getByText(/Software Engineer/i)).toBeInTheDocument();
  });

  it('displays the educational project disclaimer', () => {
    render(<Footer />);
    
    // Check for the educational project disclaimer
    expect(screen.getByText(/student project/i)).toBeInTheDocument();
  });
});
