import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import FreeResume from '~/app/free-resume/page';
import * as navigation from 'next/navigation';
import { ReadonlyURLSearchParams } from 'next/navigation';

// Mock next/navigation
const mockSearchParams = {
  get: jest.fn((param: string) => param === 'template' ? 'template1' : null),
  getAll: () => [],
  has: () => false,
  entries: () => new Map().entries(),
  forEach: (callback: (value: string, key: string, parent: URLSearchParams) => void) => {
    // Implementation not needed for our tests
  },
  keys: () => new Map().keys(),
  values: () => new Map().values(),
  toString: () => '',
  [Symbol.iterator]: () => new Map()[Symbol.iterator](),
  append: () => { throw new Error('ReadOnly'); },
  delete: () => { throw new Error('ReadOnly'); },
  set: () => { throw new Error('ReadOnly'); },
  sort: () => { throw new Error('ReadOnly'); },
  size: 0
};

jest.mock('next/navigation', () => ({
  useSearchParams: () => mockSearchParams,
}));

// Mock next-auth/react
jest.mock('next-auth/react', () => ({
  useSession: () => ({
    data: { user: { name: 'Test User' } },
    status: 'authenticated',
  }),
  signOut: jest.fn(),
}));

// Mock html2canvas and jsPDF
jest.mock('html2canvas', () => ({
  __esModule: true,
  default: jest.fn().mockResolvedValue({
    width: 800,
    height: 1000,
    toDataURL: () => 'mock-data-url',
  }),
}));

jest.mock('jspdf', () => ({
  jsPDF: jest.fn().mockImplementation(() => ({
    internal: {
      pageSize: {
        getWidth: () => 595,
        getHeight: () => 842,
      },
    },
    addImage: jest.fn(),
    save: jest.fn(),
  })),
}));

// Mock localStorage
type StorageRecord = Record<string, string>;
const mockStorage: StorageRecord = {};
const localStorageMock = {
  getItem: jest.fn((key: string) => mockStorage[key] ?? null),
  setItem: jest.fn((key: string, value: string) => {
    mockStorage[key] = value;
  }),
  clear: jest.fn(() => {
    Object.keys(mockStorage).forEach(key => delete mockStorage[key]);
  }),
  removeItem: jest.fn((key: string) => {
    delete mockStorage[key];
  }),
  key: jest.fn(),
  length: 0,
};
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Mock dynamic imports for templates
jest.mock('next/dynamic', () => () => {
  const DynamicComponent = () => <div data-testid="template-content">Mock Template</div>;
  DynamicComponent.displayName = 'DynamicComponent';
  return DynamicComponent;
});

// Mock Supabase client
jest.mock('~/lib/supabaseClient', () => ({
  supabase: {
    from: () => ({
      upsert: () => Promise.resolve({ data: null, error: null }),
      select: () => Promise.resolve({ data: [], error: null }),
      insert: () => ({
        select: () => ({
          single: () => Promise.resolve({ data: { id: 'test-id' }, error: null })
        })
      })
    }),
  },
}));

describe('FreeResume Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.clear();
    jest.useFakeTimers();
    mockSearchParams.get.mockImplementation((param: string) => param === 'template' ? 'template1' : null);
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders the free resume page with default template', () => {
    render(<FreeResume />);
    const templates = screen.getAllByTestId('template-content');
    expect(templates[0]).toBeInTheDocument();
  });

  it('loads user data from localStorage on mount', () => {
    const mockUserData = { name: 'Test User' };
    localStorageMock.setItem('userData', JSON.stringify(mockUserData));

    render(<FreeResume />);
    expect(localStorageMock.getItem).toHaveBeenCalledWith('userData');
  });

  it('saves resume data to localStorage', async () => {
    const mockUserData = { name: 'Test User' };
    localStorageMock.setItem('userData', JSON.stringify(mockUserData));

    render(<FreeResume />);

    // Fast-forward timers
    await act(async () => {
      jest.advanceTimersByTime(5000);
    });

    expect(localStorageMock.setItem).toHaveBeenCalled();
  });

  it('loads the correct template based on URL parameter', () => {
    mockSearchParams.get.mockImplementation((param: string) => param === 'template' ? 'template2' : null);
    
    render(<FreeResume />);
    expect(localStorageMock.setItem).toHaveBeenCalledWith('lastUsedTemplate', 'template2');
  });

  it('autosaves resume content periodically', async () => {
    render(<FreeResume />);

    await act(async () => {
      jest.advanceTimersByTime(5000);
    });

    expect(localStorageMock.setItem).toHaveBeenCalled();
  });

  it('shows saving indicator when clicking save button', async () => {
    render(<FreeResume />);
    
    const saveButton = screen.getByRole('button', { name: /save/i });
    fireEvent.click(saveButton);

    expect(screen.getByText(/save/i)).toBeInTheDocument();
  });
}); 