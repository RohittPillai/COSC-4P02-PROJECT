/// <reference types="jest" />
import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';
import { configure } from '@testing-library/react';
import { beforeAll, jest } from '@jest/globals';
import React from 'react';

// Add TextEncoder and TextDecoder to global scope
if (typeof global.TextEncoder === 'undefined') {
  (global as any).TextEncoder = TextEncoder;
}
if (typeof global.TextDecoder === 'undefined') {
  (global as any).TextDecoder = TextDecoder;
}

// Configure testing library
configure({
  asyncUtilTimeout: 5000,
  testIdAttribute: 'data-testid',
});

// Configure React test environment
declare global {
  namespace NodeJS {
    interface Global {
      IS_REACT_ACT_ENVIRONMENT: boolean;
    }
  }
}

// Enable React concurrent mode
(global as any).IS_REACT_ACT_ENVIRONMENT = true;

// Mock window.matchMedia
type MediaQueryList = {
  matches: boolean;
  media: string;
  onchange: null;
  addListener: jest.Mock;
  removeListener: jest.Mock;
  addEventListener: jest.Mock;
  removeEventListener: jest.Mock;
  dispatchEvent: jest.Mock;
};

// Setup window.matchMedia mock
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn(
    // Use type assertion to handle the unknown type
    (query: unknown) => ({
      matches: false,
      media: String(query),
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    } as MediaQueryList)
  ),
});

// Setup localStorage mock
const storageMock = new Map<string, string>();
const localStorageMock: Storage = {
  getItem: (key: string): string | null => storageMock.get(key) ?? null,
  setItem: (key: string, value: string): void => { storageMock.set(key, value); },
  removeItem: (key: string): void => { storageMock.delete(key); },
  clear: (): void => { storageMock.clear(); },
  length: storageMock.size,
  key: (index: number): string | null => Array.from(storageMock.keys())[index] ?? null,
  [Symbol.iterator]: storageMock[Symbol.iterator],
};

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
  writable: true
});

// Suppress all console output during tests
const originalLog = console.log;
console.log = (...args: Parameters<typeof console.log>) => {
  // Don't show any console.log output during tests
  return;
};

// Suppress act() warnings and other React warnings
const originalError = console.error;
console.error = (...args: Parameters<typeof console.error>) => {
  // If it's a string, check for specific patterns to filter
  if (typeof args[0] === 'string') {
    // Filter out known React warnings and test infrastructure warnings
    if (args[0].includes('Warning:') ||
        args[0].includes('Error:') ||
        /Warning.*not wrapped in act/.test(args[0]) ||
        args[0].includes('The current testing environment is not configured to support act') ||
        args[0].includes('Received `true` for a non-boolean attribute `priority`') ||
        args[0].includes('Function components cannot be given refs') ||
        args[0].includes('React does not recognize the `passHref` prop') ||
        args[0].includes('Each child in a list should have a unique "key" prop') ||
        args[0].includes('ReactDOMTestUtils.act is deprecated') ||
        args[0].includes('Checkout Error:')) {
      return;
    }
  }
  // For non-string errors that might include objects with a toString method
  if (args[0]?.toString && typeof args[0].toString === 'function') {
    const errorString = args[0].toString();
    if (errorString.includes('Checkout Error:') ||
        errorString.includes('Warning:') ||
        errorString.includes('Error:')) {
      return;
    }
  }
  originalError.call(console, ...args);
};

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
  useSearchParams: () => ({
    get: jest.fn(),
    getAll: jest.fn(),
    has: jest.fn(),
    forEach: jest.fn(),
    entries: jest.fn(),
    keys: jest.fn(),
    values: jest.fn(),
    toString: jest.fn(),
  }),
}));

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
    return React.createElement('img', { ...props, alt: props.alt ?? '' });
  },
}));

// Mock next-auth
jest.mock('next-auth/react', () => ({
  useSession: jest.fn(() => ({
    data: { user: { name: 'Test User' } },
    status: 'authenticated',
  })),
  signIn: jest.fn(),
  signOut: jest.fn(),
}));

// Set environment variables
process.env = {
  ...process.env,
  NEXT_PUBLIC_SUPABASE_URL: 'http://localhost:54321',
  NEXT_PUBLIC_SUPABASE_ANON_KEY: 'your-anon-key',
}; 