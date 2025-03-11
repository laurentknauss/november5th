import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AuroraBackground from '@/app/ui/AuroraBackground/AuroraBackground';

describe('AuroraBackground', () => {
  it('renders children correctly', () => {
    render(
      <AuroraBackground>
        <div data-testid="test-child">Child Content</div>
      </AuroraBackground>
    );
    
    expect(screen.getByTestId('test-child')).toBeInTheDocument();
    expect(screen.getByText('Child Content')).toBeInTheDocument();
  });

  it('applies custom className when provided', () => {
    const { container } = render(
      <AuroraBackground className="custom-class">
        <div>Child Content</div>
      </AuroraBackground>
    );
    
    const rootElement = container.firstChild as HTMLElement;
    expect(rootElement).toHaveClass('custom-class');
    expect(rootElement).toHaveClass('relative');
    expect(rootElement).toHaveClass('min-h-screen');
  });

  it('disables radial gradient when showRadialGradient is false', () => {
    const { container } = render(
      <AuroraBackground showRadialGradient={false}>
        <div>Child Content</div>
      </AuroraBackground>
    );
    
    // There should be two divs with fixed and z-[-1] when showRadialGradient is false,
    // but three when true (default)
    const fixedElements = container.querySelectorAll('.fixed.z-\\[-1\\]');
    expect(fixedElements.length).toBe(2);
  });

  it('has three background elements when showRadialGradient is true (default)', () => {
    const { container } = render(
      <AuroraBackground>
        <div>Child Content</div>
      </AuroraBackground>
    );
    
    const fixedElements = container.querySelectorAll('.fixed.z-\\[-1\\]');
    expect(fixedElements.length).toBe(3);
  });

  it('passes additional props to the root element', () => {
    render(
      <AuroraBackground data-testid="aurora-root">
        <div>Child Content</div>
      </AuroraBackground>
    );
    
    expect(screen.getByTestId('aurora-root')).toBeInTheDocument();
  });
});
