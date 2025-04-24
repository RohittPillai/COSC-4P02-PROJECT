import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PricingPage from '~/app/pricing/page';
import { useRouter } from 'next/navigation';

// Mock window.alert
window.alert = jest.fn();

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

// Mock framer-motion
jest.mock('framer-motion', () => {
  const originalModule = jest.requireActual('react');
  return {
    __esModule: true,
    motion: {
      div: (props) => React.createElement('div', props),
      h1: (props) => React.createElement('h1', props),
      p: (props) => React.createElement('p', props),
    },
  };
});

// Mock next/image
jest.mock('next/image', () => {
  return {
    __esModule: true,
    default: (props) => {
      return React.createElement('img', { ...props, alt: props.alt || '' });
    }
  };
});

// Mock FAQ component
jest.mock('~/app/pricing/faq', () => {
  return {
    __esModule: true,
    default: () => React.createElement('div', { 'data-testid': 'mock-faq' }, 'FAQ Section')
  };
});

// Mock Header and Footer components
jest.mock('~/app/_components/Header', () => {
  return {
    __esModule: true,
    default: () => React.createElement('div', { 'data-testid': 'mock-header' }, 'Header')
  };
});

jest.mock('~/app/_components/Footer', () => {
  return {
    __esModule: true,
    default: () => React.createElement('div', { 'data-testid': 'mock-footer' }, 'Footer')
  };
});

// Mock fetch
const mockFetch = jest.fn();
global.fetch = mockFetch;

// Mock window.location.href
Object.defineProperty(window, 'location', {
  writable: true,
  value: { href: '' }
});

describe('Pricing Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockFetch.mockReset();
    window.location.href = '';
  });

  it('renders the pricing page with all sections', () => {
    render(<PricingPage />);
    
    // Check hero section
    expect(screen.getByText('Create a powerful resume')).toBeInTheDocument();
    expect(screen.getByText('trusted by top recruiters')).toBeInTheDocument();
    expect(screen.getByText('Choose a plan that fits your career goals. Upgrade anytime.')).toBeInTheDocument();
    
    // Check pricing toggle
    expect(screen.getByText('Monthly')).toBeInTheDocument();
    expect(screen.getByText('Yearly (Save 15%)')).toBeInTheDocument();
    
    // Check pricing plans
    expect(screen.getByText('FREE PLAN')).toBeInTheDocument();
    expect(screen.getByText('PRO PLAN')).toBeInTheDocument();
    
    // Check payment methods
    expect(screen.getByText('We accept:')).toBeInTheDocument();
    
    // Check universities section
    expect(screen.getByText('Trusted by Universities and Colleges')).toBeInTheDocument();
  });

  it('toggles between monthly and yearly pricing', () => {
    render(<PricingPage />);
    
    const toggle = screen.getByRole('checkbox');
    expect(toggle).not.toBeChecked();
    
    fireEvent.click(toggle);
    expect(toggle).toBeChecked();
    
    // Check if price updates correctly
    const yearlyPriceElement = screen.getByText((content, element) => {
      return element?.tagName.toLowerCase() === 'h2' && content.includes('190');
    });
    expect(yearlyPriceElement).toBeInTheDocument();
    expect(screen.getByText('$190.99 billed yearly')).toBeInTheDocument();
    
    fireEvent.click(toggle);
    expect(toggle).not.toBeChecked();
    const monthlyPriceElement = screen.getByText((content, element) => {
      return element?.tagName.toLowerCase() === 'h2' && content.includes('19');
    });
    expect(monthlyPriceElement).toBeInTheDocument();
    expect(screen.getByText('$59.97 billed every 3 months')).toBeInTheDocument();
  });

  it('handles pro plan checkout successfully', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ url: 'https://stripe.com/checkout' }),
    });

    render(<PricingPage />);
    
    const subscribeButton = screen.getByText('Subscribe to Pro Plan');
    fireEvent.click(subscribeButton);
    
    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId: 'price_1R4AIbP4fL01NYku1dphhh55' }),
      });
    });
  });

  it('handles pro plan checkout failure', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      text: () => Promise.resolve('Payment failed'),
    });

    const mockAlert = jest.spyOn(window, 'alert').mockImplementation(() => {});
    
    render(<PricingPage />);
    
    const subscribeButton = screen.getByText('Subscribe to Pro Plan');
    fireEvent.click(subscribeButton);
    
    await waitFor(() => {
      expect(mockAlert).toHaveBeenCalledWith('Payment failed: Checkout failed: undefined - Payment failed');
    });
    
    mockAlert.mockRestore();
  });

  it('displays loading state during checkout', async () => {
    mockFetch.mockImplementationOnce(() => new Promise(() => {}));
    
    render(<PricingPage />);
    
    const subscribeButton = screen.getByText('Subscribe to Pro Plan');
    fireEvent.click(subscribeButton);
    
    expect(screen.getByText('Processing...')).toBeInTheDocument();
  });

  it('renders all free plan features', () => {
    render(<PricingPage />);
    
    const freeFeatures = [
      'Access to basic resume templates',
      'Edit profile, experience, education, skills, and interests',
      'Auto-save feature',
      'Resume Save and Share',
      'No AI enhancements',
      'Valid for 7 days only',
    ];
    
    freeFeatures.forEach(feature => {
      expect(screen.getByText(feature)).toBeInTheDocument();
    });
  });

  it('renders all pro plan features', () => {
    render(<PricingPage />);
    
    const proFeatures = [
      'Access all premium templates and themes',
      'Use AI to improve summary, skills, and experience',
      'Customise extra sections: Projects, Certifications, Awards, Volunteering',
      'Reorder, rename, and toggle visibility of any section',
      'Export as PDF',
    ];
    
    proFeatures.forEach(feature => {
      expect(screen.getByText(feature)).toBeInTheDocument();
    });
  });
}); 