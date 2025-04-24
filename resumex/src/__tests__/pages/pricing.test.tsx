import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PricingPage from '~/app/pricing/page';
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

// Mock fetch
const mockFetch = jest.fn();
global.fetch = mockFetch;

describe('Pricing Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockFetch.mockReset();
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
      'Two resumes',
      'Few resume templates',
      'Basic resume sections',
      'resumeX branding',
      'Up to 2 years of experience',
      'Access to few design tools',
    ];
    
    freeFeatures.forEach(feature => {
      expect(screen.getByText(feature)).toBeInTheDocument();
    });
  });

  it('renders all pro plan features', () => {
    render(<PricingPage />);
    
    const proFeatures = [
      '150 resumes',
      'All resume templates',
      'Real-time content suggestions',
      'ATS Check (Applicant Tracking System)',
      'Pro resume sections',
      'No branding',
      'Unlimited section items',
      'Thousands of design options',
    ];
    
    proFeatures.forEach(feature => {
      expect(screen.getByText(feature)).toBeInTheDocument();
    });
  });
}); 