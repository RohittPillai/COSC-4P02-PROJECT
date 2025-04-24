// Import necessary modules and dependencies from React and Testing Library
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'; // Optional: used for simulating user interactions
import AboutUs from '../../app/aboutus/page'; // Import the AboutUs component
import { useRouter } from 'next/navigation'; // Import useRouter hook from Next.js

// Extend the global Window interface to include optional JotForm and AgentInitializer objects
declare global {
  interface Window {
    JotForm?: {
      setCustomMessage: (message: string) => void;
      open: () => void;
    };
    AgentInitializer?: {
      init: (options: any) => void;
    };
  }
}

// Mock the Next.js router using jest to prevent navigation-related issues during testing
jest.mock('next/navigation', () => ({
  useRouter: jest.fn()
}));

// Mock Next.js Image component to return a normal <img> tag instead of the optimized one
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => {
    return React.createElement('img', props);
  }
}));

// Mock Framer Motion's motion.div to avoid animation logic during tests
jest.mock('framer-motion', () => ({
  motion: {
    div: (props) => {
      const { children, ...restProps } = props;
      return React.createElement('div', restProps, children);
    },
    h1: (props) => {
      const { children, ...restProps } = props;
      return React.createElement('h1', restProps, children);
    },
    p: (props) => {
      const { children, ...restProps } = props;
      return React.createElement('p', restProps, children);
    },
    section: (props) => {
      const { children, ...restProps } = props;
      return React.createElement('section', restProps, children);
    }
  },
  useAnimation: () => ({
    start: jest.fn().mockResolvedValue(undefined) // Stubbed animation controller
  })
}));

// Mock the Link component from Next.js to behave like a standard <a> tag
jest.mock('next/link', () => ({
  __esModule: true,
  default: (props) => {
    const { children, href, ...restProps } = props;
    return React.createElement('a', { href, ...restProps }, children);
  }
}));

// Mock Header component used in AboutUs page to isolate test scope
jest.mock('../../app/_components/Header', () => ({
  __esModule: true,
  default: () => React.createElement('div', { 'data-testid': 'mock-header' }, 'Header')
}));

// Mock Footer component used in AboutUs page to isolate test scope
jest.mock('../../app/_components/Footer', () => ({
  __esModule: true,
  default: () => React.createElement('div', { 'data-testid': 'mock-footer' }, 'Footer')
}));

// Begin test suite for the AboutUs page
describe('AboutUs Page', () => {
  // Runs before each test case
  beforeEach(() => {
    // Provide a mock implementation for useRouter to prevent actual navigation
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn()
    });

    // Stub the global AgentInitializer if used in component effects
    global.window.AgentInitializer = {
      init: jest.fn()
    };

    // Use fake timers to control time-based operations (e.g., setTimeout)
    jest.useFakeTimers();
  });

  // Clean up after each test
  afterEach(() => {
    // Clear all mocks to avoid test bleed
    jest.clearAllMocks();

    // Restore real timers after each test
    jest.useRealTimers();
  });

  // Test: Checks if "About Us" heading is rendered
  it('renders the hero section', () => {
    render(<AboutUs />);
    expect(screen.getByText('About Us')).toBeInTheDocument();
  });

  // Test: Validates the rendering of the "Why Choose ResumeX" section
  it('renders the Why Choose section', () => {
    render(<AboutUs />);
    expect(screen.getByText(/Why Choose/)).toBeInTheDocument();
    expect(screen.getByText('ResumeX?')).toBeInTheDocument();
    expect(screen.getByText('AI Suggestions')).toBeInTheDocument();
    expect(screen.getByText('Templates')).toBeInTheDocument();
    expect(screen.getByText('PDF Export')).toBeInTheDocument();
  });

  // Test: Confirms that the AI Resume Enhancer bullet points are rendered correctly
  it('renders the AI Resume Enhancer section', () => {
    render(<AboutUs />);
    expect(screen.getByText('• Transforms summaries into compelling statements')).toBeInTheDocument();
    expect(screen.getByText('• Identifies keywords and suggests improvements')).toBeInTheDocument();
    expect(screen.getByText('• Analyzes job descriptions for tailoring')).toBeInTheDocument();
    expect(screen.getByText('• Enhances readability and structure')).toBeInTheDocument();
  });

  // Test: Checks if the Gemini branding section (e.g., "Powered by" and logo) is shown
  it('renders the Gemini section', () => {
    render(<AboutUs />);
    expect(screen.getByText('Powered by')).toBeInTheDocument();
    expect(screen.getByAltText('Gemini Logo')).toBeInTheDocument();
  });

  // Test: Ensures that JotForm agent is removed from DOM on component unmount
  it('cleans up JotForm agent on unmount', async () => {
    // Render the component
    const { unmount } = render(<AboutUs />);

    // Manually create a fake JotForm agent DOM element
    const mockAgent = document.createElement('div');
    mockAgent.id = 'JotformAgent-01954e62666e790e93a05f107990fb5bc6b7';
    document.body.appendChild(mockAgent);

    // Trigger component unmount
    unmount();

    // Wait and check if the JotForm agent element is properly removed
    await waitFor(() => {
      expect(document.getElementById('JotformAgent-01954e62666e790e93a05f107990fb5bc6b7')).toBeNull();
    });
  });
});
