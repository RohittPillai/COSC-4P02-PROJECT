// This file helps TypeScript recognize Jest globals in your IDE
import '@testing-library/jest-dom';
import { jest } from '@jest/globals';

declare global {
  // Extend NodeJS namespace to include Jest globals
  namespace NodeJS {
    interface Global {
      // Add Jest globals
      describe: typeof describe;
      test: typeof test;
      it: typeof it;
      expect: typeof expect;
      beforeEach: typeof beforeEach;
      afterEach: typeof afterEach;
      beforeAll: typeof beforeAll;
      afterAll: typeof afterAll;
      jest: typeof jest;
    }
  }

  // Make these available globally
  const describe: jest.Describe;
  const test: jest.It;
  const it: jest.It;
  const expect: jest.Expect;
  const beforeEach: jest.Lifecycle;
  const afterEach: jest.Lifecycle;
  const beforeAll: jest.Lifecycle;
  const afterAll: jest.Lifecycle;
}

// Export empty object to make TypeScript treat this as a module
export {}; 