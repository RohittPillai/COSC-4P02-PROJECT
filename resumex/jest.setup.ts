/// <reference types="jest" />
import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';
import { configure } from '@testing-library/react';
import React from 'react';

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

// Single beforeAll block for all setup
beforeAll(() => {
  // Add TextEncoder and TextDecoder to global scope
  if (!global.TextEncoder) {
    global.TextEncoder = TextEncoder;
  }
  if (!global.TextDecoder) {
    global.TextDecoder = TextDecoder;
  }

  // Suppress act() warnings
  const originalError = console.error;
  console.error = (...args: Parameters<typeof console.error>) => {
    if (typeof args[0] === 'string') {
      if (/Warning.*not wrapped in act/.test(args[0]) ||
          args[0].includes('The current testing environment is not configured to support act')) {
        return;
      }
    }
    originalError.call(console, ...args);
  };

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

  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query: string): MediaQueryList => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
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
});

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