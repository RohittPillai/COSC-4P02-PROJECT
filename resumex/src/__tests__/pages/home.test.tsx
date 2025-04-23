import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Homepage from '../../app/page';
import { useRouter } from 'next/navigation';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} alt={props.alt || ''} />;
  },
}));

// Mock next/script
jest.mock('next/script', () => ({
  __esModule: true,
  default: (props: any) => {
    return <script {...props} />;
  },
}));

// Mock Header and Footer components
jest.mock('../../app/_components/Header', () => {
  return function MockHeader() {
    return <div data-testid="mock-header">Header</div>;
  };
});

jest.mock('../../app/_components/Footer', () => {
  return function MockFooter() {
    return <div data-testid="mock-footer">Footer</div>;
  };
});

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  Sparkles: () => <span>Sparkles</span>,
  Palette: () => <span>Palette</span>,
  FileText: () => <span>FileText</span>,
  Star: () => <span>Star</span>,
}));

describe('Home Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the hero section correctly', () => {
    render(<Homepage />);
    
    expect(screen.getByText('Build Your Resume with AI')).toBeInTheDocument();
    expect(screen.getByText('Generate professional resumes effortlessly with AI-powered templates.')).toBeInTheDocument();
    expect(screen.getByText('Get Started for Free')).toBeInTheDocument();
  });

  it('renders the features section with all features', () => {
    render(<Homepage />);
    
    expect(screen.getByText('Why Choose')).toBeInTheDocument();
    expect(screen.getByText('ResumeX?')).toBeInTheDocument();
    expect(screen.getByText('AI-Powered Suggestions')).toBeInTheDocument();
    expect(screen.getByText('Customizable Templates')).toBeInTheDocument();
    expect(screen.getByText('Instant PDF Export')).toBeInTheDocument();
  });

  it('renders the Google Gemini section', () => {
    render(<Homepage />);
    
    expect(screen.getByText(/⚡ Powered by/)).toBeInTheDocument();
    expect(screen.getByText('Google Gemini', { selector: 'span.text-blue-400' })).toBeInTheDocument();
    expect(screen.getByText(/ResumeX leverages the power of/)).toBeInTheDocument();
  });

  it('renders testimonials section', () => {
    render(<Homepage />);
    
    expect(screen.getByText('What Our Users Say')).toBeInTheDocument();
    expect(screen.getByText('Sarah Johnson')).toBeInTheDocument();
    expect(screen.getByText('Michael Lee')).toBeInTheDocument();
    expect(screen.getByText('Emily Carter')).toBeInTheDocument();
  });

  it('initializes JotForm chatbot when Start Chat is clicked', () => {
    const mockInit = jest.fn();
    window.AgentInitializer = { init: mockInit };
    
    render(<Homepage />);
    const startChatButton = screen.getByText('Start Chat');
    fireEvent.click(startChatButton);
    
    expect(mockInit).toHaveBeenCalledWith(expect.objectContaining({
      agentRenderURL: expect.any(String),
      rootId: expect.any(String),
      formID: expect.any(String),
    }));
  });
}); 