// React and Testing Library imports
import React from 'react';
import { render, screen } from '@testing-library/react'; // Used to render components and search the DOM
import '@testing-library/jest-dom'; // Adds custom matchers like toBeInTheDocument, toHaveClass
import userEvent from '@testing-library/user-event'; // Simulates user interactions (click, type, etc.)

// Import Button component and types
import { Button } from '~/app/_components/Button';
import type { ButtonProps } from '~/app/_components/Button';
import { buttonVariants } from '~/app/_components/Button'; // Not directly used, but could be used for class validation

// Grouping all tests for the Button component
describe('Button Component', () => {
  // Common Tailwind classes used across all Button variants
  const baseClasses = 'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0';

  // Test: default button rendering
  it('renders button with default variant and size', () => {
    render(<Button>Click me</Button>); // Render default Button
    const buttonElement = screen.getByRole('button', { name: /click me/i }); // Find button by text
    expect(buttonElement).toBeInTheDocument(); // Check it's in the DOM
    expect(buttonElement).toHaveClass(baseClasses); // Check base classes
    expect(buttonElement).toHaveClass('bg-primary', 'text-primary-foreground', 'shadow', 'hover:bg-primary/90'); // Check default style classes
  });

  // Test: destructive variant
  it('applies destructive variant correctly', () => {
    render(<Button variant="destructive">Delete</Button>);
    const buttonElement = screen.getByRole('button', { name: /delete/i });
    expect(buttonElement).toHaveClass(baseClasses);
    expect(buttonElement).toHaveClass('bg-destructive', 'text-destructive-foreground', 'shadow-sm', 'hover:bg-destructive/90');
  });

  // Test: outline variant
  it('applies outline variant correctly', () => {
    render(<Button variant="outline">Outline</Button>);
    const buttonElement = screen.getByRole('button', { name: /outline/i });
    expect(buttonElement).toHaveClass(baseClasses);
    expect(buttonElement).toHaveClass('border', 'border-input', 'bg-background', 'shadow-sm', 'hover:bg-accent', 'hover:text-accent-foreground');
  });

  // Test: different size variants
  it('applies different sizes correctly', () => {
    const { rerender } = render(<Button size="sm">Small</Button>); // First test small size
    let buttonElement = screen.getByRole('button', { name: /small/i });
    expect(buttonElement).toHaveClass('h-8', 'rounded-md', 'px-3', 'text-xs');

    rerender(<Button size="lg">Large</Button>); // Then test large size
    buttonElement = screen.getByRole('button', { name: /large/i });
    expect(buttonElement).toHaveClass('h-10', 'rounded-md', 'px-8');
  });

  // Test: click handler is called when button is clicked
  it('handles click events', async () => {
    const handleClick = jest.fn(); // Mock function to test if it gets called
    const user = userEvent.setup(); // Setup user interaction simulator
    render(<Button onClick={handleClick}>Click me</Button>);
    const buttonElement = screen.getByRole('button', { name: /click me/i });

    await user.click(buttonElement); // Simulate click
    expect(handleClick).toHaveBeenCalledTimes(1); // Verify function was called once
  });

  // Test: custom className is applied
  it('applies custom className correctly', () => {
    const customClass = 'custom-class';
    render(<Button className={customClass}>Custom</Button>);
    const buttonElement = screen.getByRole('button', { name: /custom/i });
    expect(buttonElement).toHaveClass(customClass);
  });

  // Test: render as another element using asChild prop
  it('renders as a different element when asChild is true', () => {
    render(
      <Button asChild>
        <a href="/test">Link Button</a>
      </Button>
    );
    const linkElement = screen.getByRole('link', { name: /link button/i }); // Get <a> instead of <button>
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', '/test'); // Verify href is set
  });

  // Test: disabled button
  it('handles disabled state correctly', () => {
    render(<Button disabled>Disabled</Button>);
    const buttonElement = screen.getByRole('button', { name: /disabled/i });
    expect(buttonElement).toBeDisabled(); // Check disabled behavior
    expect(buttonElement).toHaveClass('disabled:pointer-events-none'); // Ensure visual indication is correct
  });
});
