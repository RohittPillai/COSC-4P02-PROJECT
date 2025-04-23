import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Homepage from '~/app/page';

// Mock the components used in the homepage
jest.mock('~/app/_components/Header', () => {
  return {
    __esModule: true,
    default: () => <div data-testid="mock-header">Header</div>,
  };
});

jest.mock('~/app/_components/Footer', () => {
  return {
    __esModule: true,
    default: () => <div data-testid="mock-footer">Footer</div>,
  };
});

// Mock next/script
jest.mock('next/script', () => ({
  __esModule: true,
  default: () => <div data-testid="mock-script">Script</div>,
}));

// Mock next/link
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => children,
}));

describe('Homepage', () => {
  it('renders the hero section with title and CTA button', () => {
    render(<Homepage />);
    
    expect(screen.getByText('Build Your Resume with AI')).toBeInTheDocument();
    expect(screen.getByText('Generate professional resumes effortlessly with AI-powered templates.')).toBeInTheDocument();
    expect(screen.getByText('Get Started for Free')).toBeInTheDocument();
  });

  it('renders all three features with correct content', () => {
    render(<Homepage />);
    
    // Check feature titles
    expect(screen.getByText('AI-Powered Suggestions')).toBeInTheDocument();
    expect(screen.getByText('Customizable Templates')).toBeInTheDocument();
    expect(screen.getByText('Instant PDF Export')).toBeInTheDocument();

    // Check feature descriptions
    expect(screen.getByText('Get personalized resume suggestions tailored to your experience.')).toBeInTheDocument();
    expect(screen.getByText('Choose from professional designs that make you stand out.')).toBeInTheDocument();
    expect(screen.getByText('Download your resume instantly in high-quality PDF format.')).toBeInTheDocument();
  });

  it('renders the Google Gemini section with correct content', () => {
    render(<Homepage />);
    
    expect(screen.getByText(/Powered by/)).toBeInTheDocument();
    expect(screen.getByText(/Google Gemini/)).toBeInTheDocument();
    expect(screen.getByText(/ResumeX leverages the power of/)).toBeInTheDocument();
  });

  it('renders all testimonials', () => {
    render(<Homepage />);
    
    expect(screen.getByText('What Our Users Say')).toBeInTheDocument();
    expect(screen.getByText('Sarah Johnson')).toBeInTheDocument();
    expect(screen.getByText('Michael Lee')).toBeInTheDocument();
    expect(screen.getByText('Emily Carter')).toBeInTheDocument();
  });

  it('includes header and footer', () => {
    render(<Homepage />);
    
    expect(screen.getByTestId('mock-header')).toBeInTheDocument();
    expect(screen.getByTestId('mock-footer')).toBeInTheDocument();
  });

  it('loads JotForm script', () => {
    render(<Homepage />);
    
    expect(screen.getByTestId('mock-script')).toBeInTheDocument();
  });

  it('initializes chat when start chat is triggered', () => {
    // Mock window.AgentInitializer
    const mockInit = jest.fn();
    global.window.AgentInitializer = {
      init: mockInit,
    };

    render(<Homepage />);
    
    // Trigger handleStartChat (this would normally be called by a button click)
    const instance = screen.getByText('Get Started for Free');
    fireEvent.click(instance);

    // Clean up
    delete global.window.AgentInitializer;
  });
}); 