// Import the necessary testing libraries
import '@testing-library/jest-dom';

// Mock Next.js router (new App Router)
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    refresh: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    pathname: '/',
  }),
  useSearchParams: () => ({
    get: jest.fn().mockImplementation(key => null),
    getAll: jest.fn().mockImplementation(key => []),
    has: jest.fn().mockImplementation(key => false),
  }),
  usePathname: () => '/',
}));

// Also mock old Next.js router for backwards compatibility
jest.mock('next/router', () => ({
  useRouter: () => ({
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


// Mock Next.js image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: function MockImage(props) {
     
    return Object.assign(document.createElement('img'), { 
      src: props.src || '',
      alt: props.alt || '',
      className: props.className || '',
    });
  },
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
  ConnectButton: jest.fn().mockImplementation(() => <div data-testid="connect-button">Connect Button</div>),
  RainbowKitProvider: jest.fn().mockImplementation(({ children }) => children),
}));

jest.mock('react-loader-spinner', () => ({
  ThreeDots: jest.fn().mockImplementation(() => <div data-testid="three-dots-loader">Loading...</div>),
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
      /Warning: useLayoutEffect does nothing on the server/.test(args[0])
    ) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});
