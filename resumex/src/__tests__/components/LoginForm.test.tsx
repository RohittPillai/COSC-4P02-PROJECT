import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { LoginForm } from '~/components/login-form';

// Mock next-auth
jest.mock('next-auth/react', () => ({
  signIn: jest.fn(),
}));

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

// Mock fetch
const mockFetch = jest.fn(() => 
  Promise.resolve({
    ok: false,
    json: () => Promise.resolve({ message: 'Invalid credentials' })
  })
);
global.fetch = mockFetch as jest.Mock;

// Mock localStorage
const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
};
Object.defineProperty(window, 'localStorage', { value: mockLocalStorage });

describe('LoginForm', () => {
  const mockRouter = {
    push: jest.fn(),
    refresh: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    mockLocalStorage.getItem.mockReturnValue(null);
  });

  it('renders login form when user is not logged in', async () => {
    await act(async () => {
      render(<LoginForm />);
    });
    expect(screen.getByPlaceholderText('abc@example.com')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /^login$/i })).toBeInTheDocument();
  });

  it('shows social login buttons', async () => {
    await act(async () => {
      render(<LoginForm />);
    });
    expect(screen.getByRole('button', { name: /login with google/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login with discord/i })).toBeInTheDocument();
  });

  it('handles Google sign in', async () => {
    await act(async () => {
      render(<LoginForm />);
    });
    const googleButton = screen.getByRole('button', { name: /login with google/i });
    await act(async () => {
      await userEvent.click(googleButton);
    });
    expect(signIn).toHaveBeenCalledWith('google');
  });

  it('handles Discord sign in', async () => {
    await act(async () => {
      render(<LoginForm />);
    });
    const discordButton = screen.getByRole('button', { name: /login with discord/i });
    await act(async () => {
      await userEvent.click(discordButton);
    });
    expect(signIn).toHaveBeenCalledWith('discord');
  });

  it('handles email/password submission', async () => {
    await act(async () => {
      render(<LoginForm />);
    });
    
    const emailInput = screen.getByPlaceholderText('abc@example.com');
    const passwordInput = screen.getByLabelText('Password');
    const submitButton = screen.getByRole('button', { name: /^login$/i });

    await act(async () => {
      await userEvent.type(emailInput, 'test@example.com');
      await userEvent.type(passwordInput, 'password123');
      await userEvent.click(submitButton);
    });

    expect(fetch).toHaveBeenCalledWith('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'test@example.com', password: 'password123' }),
    });
  });

  it('shows error message on failed login', async () => {
    mockFetch.mockImplementationOnce(() => 
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ message: 'Invalid credentials' })
      })
    );

    await act(async () => {
      render(<LoginForm />);
    });
    
    const emailInput = screen.getByPlaceholderText('abc@example.com');
    const passwordInput = screen.getByLabelText('Password');
    const submitButton = screen.getByRole('button', { name: /^login$/i });

    await act(async () => {
      await userEvent.type(emailInput, 'test@example.com');
      await userEvent.type(passwordInput, 'wrongpassword');
      await userEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
    });
  });

  it('shows logout option when user is logged in', async () => {
    mockLocalStorage.getItem.mockReturnValueOnce(JSON.stringify({ name: 'Test User' }));
    await act(async () => {
      render(<LoginForm />);
    });
    expect(screen.getByRole('button', { name: /logout/i })).toBeInTheDocument();
  });

  it('handles logout correctly', async () => {
    mockLocalStorage.getItem.mockReturnValueOnce(JSON.stringify({ name: 'Test User' }));
    await act(async () => {
      render(<LoginForm />);
    });
    const logoutButton = screen.getByRole('button', { name: /logout/i });
    await act(async () => {
      await userEvent.click(logoutButton);
    });
    expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('userData');
  });

  it('shows forgot password popup', async () => {
    await act(async () => {
      render(<LoginForm />);
    });
    
    const forgotPasswordLink = screen.getByText('Forgot your password?');
    await act(async () => {
      await userEvent.click(forgotPasswordLink);
    });
    
    expect(screen.getByText('Please check your inbox for a password reset link')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
  });

  it('closes forgot password popup', async () => {
    await act(async () => {
      render(<LoginForm />);
    });
    
    const forgotPasswordLink = screen.getByText('Forgot your password?');
    await act(async () => {
      await userEvent.click(forgotPasswordLink);
    });
    
    const closeButton = screen.getByRole('button', { name: /close/i });
    await act(async () => {
      await userEvent.click(closeButton);
    });
    
    expect(screen.queryByText('Please check your inbox for a password reset link')).not.toBeInTheDocument();
  });
}); 