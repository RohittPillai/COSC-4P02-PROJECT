import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { Button } from '~/app/_components/Button';
import type { ButtonProps } from '~/app/_components/Button';
import { buttonVariants } from '~/app/_components/Button';

describe('Button Component', () => {
  const baseClasses = 'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0';

  it('renders button with default variant and size', () => {
    render(<Button>Click me</Button>);
    const buttonElement = screen.getByRole('button', { name: /click me/i });
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass(baseClasses);
    expect(buttonElement).toHaveClass('bg-primary', 'text-primary-foreground', 'shadow', 'hover:bg-primary/90');
  });

  it('applies destructive variant correctly', () => {
    render(<Button variant="destructive">Delete</Button>);
    const buttonElement = screen.getByRole('button', { name: /delete/i });
    expect(buttonElement).toHaveClass(baseClasses);
    expect(buttonElement).toHaveClass('bg-destructive', 'text-destructive-foreground', 'shadow-sm', 'hover:bg-destructive/90');
  });

  it('applies outline variant correctly', () => {
    render(<Button variant="outline">Outline</Button>);
    const buttonElement = screen.getByRole('button', { name: /outline/i });
    expect(buttonElement).toHaveClass(baseClasses);
    expect(buttonElement).toHaveClass('border', 'border-input', 'bg-background', 'shadow-sm', 'hover:bg-accent', 'hover:text-accent-foreground');
  });

  it('applies different sizes correctly', () => {
    const { rerender } = render(<Button size="sm">Small</Button>);
    let buttonElement = screen.getByRole('button', { name: /small/i });
    expect(buttonElement).toHaveClass('h-8', 'rounded-md', 'px-3', 'text-xs');

    rerender(<Button size="lg">Large</Button>);
    buttonElement = screen.getByRole('button', { name: /large/i });
    expect(buttonElement).toHaveClass('h-10', 'rounded-md', 'px-8');
  });

  it('handles click events', async () => {
    const handleClick = jest.fn();
    const user = userEvent.setup();
    render(<Button onClick={handleClick}>Click me</Button>);
    const buttonElement = screen.getByRole('button', { name: /click me/i });

    await user.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies custom className correctly', () => {
    const customClass = 'custom-class';
    render(<Button className={customClass}>Custom</Button>);
    const buttonElement = screen.getByRole('button', { name: /custom/i });
    expect(buttonElement).toHaveClass(customClass);
  });

  it('renders as a different element when asChild is true', () => {
    render(
      <Button asChild>
        <a href="/test">Link Button</a>
      </Button>
    );
    const linkElement = screen.getByRole('link', { name: /link button/i });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', '/test');
  });

  it('handles disabled state correctly', () => {
    render(<Button disabled>Disabled</Button>);
    const buttonElement = screen.getByRole('button', { name: /disabled/i });
    expect(buttonElement).toBeDisabled();
    expect(buttonElement).toHaveClass('disabled:pointer-events-none');
  });
}); 