import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { Input } from '~/app/_components/input';
import { cn } from '~/lib/utils';

const baseInputClasses = 'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm';

describe('Input Component', () => {
  it('renders input with default props', () => {
    render(<Input placeholder="Enter text" />);
    const inputElement = screen.getByPlaceholderText('Enter text');
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveClass(baseInputClasses);
  });

  it('handles different input types', () => {
    const { rerender } = render(<Input type="text" placeholder="Text" />);
    expect(screen.getByPlaceholderText('Text')).toHaveAttribute('type', 'text');

    rerender(<Input type="password" placeholder="Password" />);
    expect(screen.getByPlaceholderText('Password')).toHaveAttribute('type', 'password');

    rerender(<Input type="email" placeholder="Email" />);
    expect(screen.getByPlaceholderText('Email')).toHaveAttribute('type', 'email');
  });

  it('applies custom className correctly', () => {
    const customClass = 'custom-class';
    render(<Input className={customClass} placeholder="Custom" />);
    const inputElement = screen.getByPlaceholderText('Custom');
    expect(inputElement).toHaveClass(cn(baseInputClasses, customClass));
  });

  it('handles value changes', async () => {
    const user = userEvent.setup();
    render(<Input placeholder="Type here" />);
    const inputElement = screen.getByPlaceholderText('Type here');
    
    await user.type(inputElement, 'Hello World');
    expect(inputElement).toHaveValue('Hello World');
  });

  it('handles disabled state', () => {
    render(<Input disabled placeholder="Disabled" />);
    const inputElement = screen.getByPlaceholderText('Disabled');
    expect(inputElement).toBeDisabled();
    expect(inputElement).toHaveClass('disabled:cursor-not-allowed');
    expect(inputElement).toHaveClass('disabled:opacity-50');
  });

  it('handles required attribute', () => {
    render(<Input required placeholder="Required" />);
    const inputElement = screen.getByPlaceholderText('Required');
    expect(inputElement).toBeRequired();
  });

  it('handles readonly attribute', () => {
    render(<Input readOnly value="Readonly" placeholder="Readonly" />);
    const inputElement = screen.getByPlaceholderText('Readonly');
    expect(inputElement).toHaveAttribute('readonly');
  });

  it('applies focus styles', async () => {
    const user = userEvent.setup();
    render(<Input placeholder="Focus" />);
    const inputElement = screen.getByPlaceholderText('Focus');
    
    await user.click(inputElement);
    expect(inputElement).toHaveClass('focus-visible:ring-1');
    expect(inputElement).toHaveClass('focus-visible:ring-ring');
  });
}); 