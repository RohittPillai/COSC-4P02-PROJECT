import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '@/app/page';

describe('Home Page', () => {
  it('renders the main heading', () => {
    render(<Home />);
    expect(screen.getByRole('heading', { name: /welcome to resumex/i })).toBeInTheDocument();
  });

  it('renders the Google Gemini section with correct content', () => {
    render(<Home />);
    
    const geminiSection = screen.getByTestId('gemini-section');
    expect(geminiSection).toBeInTheDocument();
    
    const geminiHeading = screen.getAllByText(/Google Gemini/)[0];
    expect(geminiHeading).toBeInTheDocument();
    expect(geminiHeading.closest('h3')).toBeTruthy();
    
    expect(screen.getByText(/ResumeX leverages Google Gemini to provide intelligent/)).toBeInTheDocument();
  });

  it('renders features section', () => {
    render(<Home />);
    expect(screen.getByTestId('features-section')).toBeInTheDocument();
  });

  it('displays call-to-action button', () => {
    render(<Home />);
    expect(screen.getByRole('button', { name: /get started/i })).toBeInTheDocument();
  });

  test('renders Google Gemini section', () => {
    render(<Home />);
    
    // Check for the heading text
    expect(screen.getByText('Powered by')).toBeInTheDocument();
    
    // Check for the Gemini logo image
    expect(screen.getByAltText('Gemini Logo')).toBeInTheDocument();
    
    // Check for the description text
    expect(screen.getByText(/ResumeX leverages Google Gemini to provide intelligent, real-time resume suggestions and improvements./)).toBeInTheDocument();
  });
});