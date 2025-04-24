import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { LoginForm } from '~/components/login-form';

// Mocking next-auth's signIn function to track login attempts during tests
jest.mock('next-auth/react', () => ({
  signIn: jest.fn(),
}));

// Mocking useRouter to prevent actual navigation during tests
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

// Mocking the global fetch function to simulate API login requests
const mockFetch = jest.fn(() =>
  Promise.resolve({
    ok: false,
    json: () => Promise.resolve({ message: 'Invalid credentials' }),
  })
);
global.fetch = mockFetch as jest.Mock;

// Mocking localStorage to simulate user login/logout without real browser storage
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
    // Reset all mocks before each test
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    mockLocalStorage.getItem.mockReturnValue(null);
  });

  // Test: The login form should render with email and login button when no user is logged in
  it('renders login form when user is not logged in', async () => {
    await act(async () => {
      render(<LoginForm />);
    });
    expect(screen.getByPlaceholderText('abc@example.com')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /^login$/i })).toBeInTheDocument();
  });

  // Test: Google and Discord login buttons should be visible
  it('shows social login buttons', async () => {
    await act(async () => {
      render(<LoginForm />);
    });
    expect(screen.getByRole('button', { name: /login with google/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login with discord/i })).toBeInTheDocument();
  });

  // Test: Clicking "Login with Google" should call signIn with provider "google"
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

  // Test: Clicking "Login with Discord" should call signIn with provider "discord"
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

  // Test: Submitting the email/password form should trigger a fetch call to login endpoint
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

  // Test: Shows error message if the login fetch call returns an error
  it('shows error message on failed login', async () => {
    mockFetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ message: 'Invalid credentials' }),
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

  // Test: If a user is already stored in localStorage, the logout button should appear
  it('shows logout option when user is logged in', async () => {
    mockLocalStorage.getItem.mockReturnValueOnce(JSON.stringify({ name: 'Test User' }));
    await act(async () => {
      render(<LoginForm />);
    });
    expect(screen.getByRole('button', { name: /logout/i })).toBeInTheDocument();
  });

  // Test: Clicking the logout button should remove user data from localStorage
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

  // Test: Clicking "Forgot your password?" should show a message and close button
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

  // Test: Clicking the close button in forgot password popup should hide the popup
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
