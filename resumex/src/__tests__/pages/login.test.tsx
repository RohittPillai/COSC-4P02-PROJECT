import React from 'react';
import { render, screen } from '@testing-library/react';
import LoginPage from '~/app/login/page';

// Mock the components used in the login page
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

jest.mock('~/components/login-form', () => {
  return {
    LoginForm: () => <div data-testid="mock-login-form">Login Form</div>,
  };
});

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: { src: string; alt: string; width: number; height: number; className?: string; style?: React.CSSProperties }) => 
    <img {...props} />,
}));

describe('LoginPage', () => {
  it('renders the login page with all components', () => {
    render(<LoginPage />);

    // Check if header is rendered
    expect(screen.getByTestId('mock-header')).toBeInTheDocument();

    // Check if footer is rendered
    expect(screen.getByTestId('mock-footer')).toBeInTheDocument();

    // Check if login form is rendered
    expect(screen.getByTestId('mock-login-form')).toBeInTheDocument();

    // Check if logo is rendered
    const logo = screen.getByAltText('ResumeX');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', '/transparent_black_main_logo.png');
    expect(logo).toHaveAttribute('width', '200');
    expect(logo).toHaveAttribute('height', '200');
  });

  it('has correct layout classes', () => {
    render(<LoginPage />);

    // Check if the main container has the correct classes
    const mainContainer = screen.getByTestId('mock-login-form').parentElement?.parentElement;
    expect(mainContainer).toHaveClass('flex', 'min-h-screen', 'flex-col', 'items-center', 'justify-center', 'gap-8', 'bg-muted', 'p-6', 'md:p-10');

    // Check if the inner container has the correct classes
    const innerContainer = screen.getByTestId('mock-login-form').parentElement;
    expect(innerContainer).toHaveClass('flex', 'w-full', 'max-w-sm', 'flex-col', 'items-center', 'self-center', 'gap-10');
  });
}); 