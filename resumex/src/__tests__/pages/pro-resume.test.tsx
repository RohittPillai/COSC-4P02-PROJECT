import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ResumePage from '../../app/pro-resume/page';

// Mock the Header and Footer components
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

// Mock the fetch function for AI calls
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ result: 'AI generated content' }),
  })
) as jest.Mock;

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
    };
  },
}));

// Mock html2pdf.js
jest.mock('html2pdf.js', () => ({
  __esModule: true,
  default: () => ({
    from: () => ({
      set: () => ({
        save: jest.fn(),
      }),
    }),
  }),
}));

// Mock next-auth
jest.mock('next-auth/react', () => ({
  useSession: () => ({
    data: { user: { name: 'Test User' } },
    status: 'authenticated'
  }),
  signOut: jest.fn()
}));

describe('Pro Resume Page', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  it('renders the pro resume page with initial state', () => {
    render(<ResumePage />);
    
    // Check if basic elements are present
    expect(screen.getByText('Edit Resume')).toBeInTheDocument();
    expect(screen.getByLabelText('Select Theme')).toBeInTheDocument();
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Phone')).toBeInTheDocument();
  });

  it('allows theme selection', async () => {
    render(<ResumePage />);
    const themeSelect = screen.getByLabelText('Select Theme');
    
    // Test changing theme
    await userEvent.selectOptions(themeSelect, 'classic');
    expect(themeSelect).toHaveValue('classic');
    
    await userEvent.selectOptions(themeSelect, 'compact');
    expect(themeSelect).toHaveValue('compact');
  });

  it('updates form inputs correctly', async () => {
    render(<ResumePage />);
    
    // Test name input
    const nameInput = screen.getByLabelText('Name');
    await userEvent.clear(nameInput);
    await userEvent.type(nameInput, 'Jane Smith');
    expect(nameInput).toHaveValue('Jane Smith');
    
    // Test email input
    const emailInput = screen.getByLabelText('Email');
    await userEvent.clear(emailInput);
    await userEvent.type(emailInput, 'jane@example.com');
    expect(emailInput).toHaveValue('jane@example.com');
  });

  it('allows section reordering', () => {
    render(<ResumePage />);
    
    // Get all section headings
    const sections = screen.getAllByRole('heading');
    const initialOrder = sections.map(section => section.textContent);
    
    // Find the skills section and its up button
    const skillsSection = screen.getByText('Skills (comma separated)');
    const upButton = skillsSection.parentElement?.querySelector('button[aria-label="Move section up"]');
    
    // Click the up button
    if (upButton) {
      fireEvent.click(upButton);
      
      // Get the new order of sections
      const newSections = screen.getAllByRole('heading');
      const newOrder = newSections.map(section => section.textContent);
      
      // Verify that the order has changed
      expect(newOrder).not.toEqual(initialOrder);
      
      // Find the index of Skills in both orders
      const oldSkillsIndex = initialOrder.findIndex(text => text?.includes('Skills'));
      const newSkillsIndex = newOrder.findIndex(text => text?.includes('Skills'));
      
      // Verify Skills section moved up
      expect(newSkillsIndex).toBeLessThan(oldSkillsIndex);
    }
  });

  it('handles AI integration correctly', async () => {
    render(<ResumePage />);
    
    // Find and click the AI enhancement button for summary
    const aiButton = screen.getByText(/Improve Summary with AI/i);
    await userEvent.click(aiButton);
    
    // Verify the fetch call was made
    expect(fetch).toHaveBeenCalledWith('/api/ai-tool', expect.any(Object));
    
    // Wait for the AI response to be processed
    await waitFor(() => {
      const summaryTextarea = screen.getByLabelText('Summary');
      expect(summaryTextarea).toHaveValue('AI generated content');
    });
  });
}); 