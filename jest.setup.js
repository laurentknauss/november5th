// Create a basic React implementation
import React from 'react';

// Import the necessary testing libraries
import '@testing-library/jest-dom';

// Mock motion/react
jest.mock('motion/react', () => ({
  AnimatePresence: function AnimatePresence({ children }) { return children; },
  motion: {
    div: function MotionDiv(props) { return React.createElement('div', props, props.children); },
    span: function MotionSpan(props) { return React.createElement('span', props, props.children); }
  }
}));

// Mock next/font/google
jest.mock('next/font/google', () => ({
  Inter: jest.fn().mockReturnValue({
    className: 'mocked-font',
    style: { fontFamily: 'sans-serif' },
    subsets: ['latin'],
    weight: ['500', '800'],
    display: 'swap',
    preload: true,
  }),
}));

// Mock Next.js image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: function MockImage(props) {
    return React.createElement('img', {
      src: props.src || '',
      alt: props.alt || '',
      className: props.className || '',
      'data-testid': 'mock-image',
      fill: props.fill,
      priority: props.priority
    });
  }
}));

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    refresh: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    pathname: '/',
  }),
  useSearchParams: jest.fn().mockReturnValue({
    get: jest.fn().mockImplementation(key => null),
    getAll: jest.fn().mockImplementation(key => []),
    has: jest.fn().mockImplementation(key => false),
  }),
  usePathname: jest.fn().mockReturnValue('/'),
}));

// Also mock old Next.js router for backwards compatibility
jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    query: {},
    pathname: '/',
    route: '/',
    asPath: '/',
    events: {
      on: jest.fn(),
      off: jest.fn(),
      emit: jest.fn(),
    },
  }),
}));

// Mock the environment variables
process.env = {
  ...process.env,
  NEXT_PUBLIC_GOOGLE_ANALYTICS_ID: 'test-ga-id',
};

// Mock wagmi and rainbow-kit hooks
jest.mock('wagmi', () => ({
  useAccount: jest.fn().mockReturnValue({
    isConnected: true,
    address: '0x123456789abcdef',
  }),
  useDisconnect: jest.fn().mockReturnValue({
    disconnect: jest.fn(),
  }),
  useWriteContract: jest.fn().mockReturnValue({
    writeContract: jest.fn(),
    data: '0xtransactionHash',
  }),
  useReadContract: jest.fn().mockReturnValue({
    data: null,
    isLoading: false,
  }),
  useWaitForTransactionReceipt: jest.fn().mockReturnValue({
    isLoading: false,
    isSuccess: false,
  }),
}));

jest.mock('@rainbow-me/rainbowkit', () => ({
  ConnectButton: jest.fn().mockImplementation(() => React.createElement('div', {'data-testid': 'connect-button'}, 'Connect Button')),
  RainbowKitProvider: jest.fn().mockImplementation(({ children }) => children),
}));

jest.mock('react-loader-spinner', () => ({
  ThreeDots: jest.fn().mockImplementation(props => React.createElement('div', {'data-testid': 'three-dots-loader'}, 'Loading...' )),
}));

// Mock contract data
jest.mock('@/app/abi', () => ({
  abi: [],
}));

jest.mock('@/app/contractAddresses', () => ({
  contractAddresses: {
    421614: ["0x1234567890123456789012345678901234567890"],
  },
}));

// Suppress console errors during tests
const originalError = console.error;
beforeAll(() => {
  console.error = (...args) => {
    if (
      /Warning: ReactDOM.render is no longer supported in React 18/.test(args[0]) ||
      /Warning: useLayoutEffect does nothing on the server/.test(args[0]) ||
      /Warning: React does not recognize the/.test(args[0])
    ) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});
