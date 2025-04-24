import React from 'react';
// Renders components and allows us to test what's on screen
import { render, screen } from '@testing-library/react';
// Extends Jest's expect with DOM-specific assertions
import '@testing-library/jest-dom';
// Imports the component pieces we are testing
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '~/app/_components/card';
// Utility for merging classNames
import { cn } from '~/lib/utils';

// Expected base classnames for styling checks
const baseCardClasses = 'rounded-xl border bg-card text-card-foreground shadow';
const baseHeaderClasses = 'flex flex-col space-y-1.5 p-6';
const baseTitleClasses = 'font-semibold leading-none tracking-tight';
const baseDescriptionClasses = 'text-sm text-muted-foreground';
const baseContentClasses = 'p-6 pt-0';
const baseFooterClasses = 'flex items-center p-6 pt-0';

describe('Card Components', () => {
  
  // Test 1: Does the base <Card> render with default classes?
  it('renders Card with default props', () => {
    render(<Card data-testid="card">Card Content</Card>);
    const cardElement = screen.getByTestId('card');
    expect(cardElement).toBeInTheDocument();
    expect(cardElement).toHaveClass(...baseCardClasses.split(' '));
  });

  // Test 2: Can the Card render all expected subcomponents?
  it('renders Card with all subcomponents', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>Main Content</CardContent>
        <CardFooter>Footer Content</CardFooter>
      </Card>
    );
    expect(screen.getByText('Card Title')).toBeInTheDocument();
    expect(screen.getByText('Card Description')).toBeInTheDocument();
    expect(screen.getByText('Main Content')).toBeInTheDocument();
    expect(screen.getByText('Footer Content')).toBeInTheDocument();
  });

  // Test 3: Does custom className merge with default styles?
  it('applies custom className to Card', () => {
    const customClass = 'custom-card';
    render(<Card className={customClass} data-testid="card">Content</Card>);
    const cardElement = screen.getByTestId('card');
    expect(cardElement).toHaveClass('custom-card');
    expect(cardElement).toHaveClass(...baseCardClasses.split(' '));
  });

  // Test 4: Is CardHeader styled as expected?
  it('applies correct styles to CardHeader', () => {
    render(<Card><CardHeader data-testid="header">Header Content</CardHeader></Card>);
    const headerElement = screen.getByTestId('header');
    expect(headerElement).toHaveClass(...baseHeaderClasses.split(' '));
  });

  // Test 5: Does CardTitle render with proper font settings?
  it('applies correct styles to CardTitle', () => {
    render(<Card><CardTitle data-testid="title">Title</CardTitle></Card>);
    const titleElement = screen.getByTestId('title');
    expect(titleElement).toHaveClass(...baseTitleClasses.split(' '));
  });

  // Test 6: Does CardDescription show with muted styles?
  it('applies correct styles to CardDescription', () => {
    render(<Card><CardDescription data-testid="desc">Description</CardDescription></Card>);
    const descElement = screen.getByTestId('desc');
    expect(descElement).toHaveClass(...baseDescriptionClasses.split(' '));
  });

  // Test 7: Proper spacing and padding in CardContent?
  it('applies correct styles to CardContent', () => {
    render(<Card><CardContent data-testid="content">Content</CardContent></Card>);
    const contentElement = screen.getByTestId('content');
    expect(contentElement).toHaveClass(...baseContentClasses.split(' '));
  });

  // Test 8: Are CardFooter layout and padding correct?
  it('applies correct styles to CardFooter', () => {
    render(<Card><CardFooter data-testid="footer">Footer</CardFooter></Card>);
    const footerElement = screen.getByTestId('footer');
    expect(footerElement).toHaveClass(...baseFooterClasses.split(' '));
  });

  // Test 9: Can nested components render correctly inside the Card?
  it('handles nested content correctly', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Main Title</CardTitle>
          <CardDescription>Main Description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Paragraph 1</p>
          <p>Paragraph 2</p>
        </CardContent>
        <CardFooter>
          <button>Action</button>
        </CardFooter>
      </Card>
    );
    expect(screen.getByText('Main Title')).toBeInTheDocument();
    expect(screen.getByText('Main Description')).toBeInTheDocument();
    expect(screen.getByText('Paragraph 1')).toBeInTheDocument();
    expect(screen.getByText('Paragraph 2')).toBeInTheDocument();
    expect(screen.getByText('Action')).toBeInTheDocument();
  });
});
