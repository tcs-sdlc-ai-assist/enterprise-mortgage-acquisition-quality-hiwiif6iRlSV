import { render, screen } from '@testing-library/react';
import Button from './Button';

describe('Button', () => {
  it('renders primary button by default', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('btn');
  });

  it('renders secondary button when variant is secondary', () => {
    render(<Button variant="secondary">Secondary</Button>);
    const button = screen.getByRole('button', { name: /secondary/i });
    expect(button).toHaveClass('btn-secondary');
  });

  it('renders outline button when variant is outline', () => {
    render(<Button variant="outline">Outline</Button>);
    const button = screen.getByRole('button', { name: /outline/i });
    expect(button).toHaveClass('btn-outline');
  });

  it('applies custom className', () => {
    render(<Button className="custom-class">Custom</Button>);
    const button = screen.getByRole('button', { name: /custom/i });
    expect(button).toHaveClass('custom-class');
  });

  it('renders as anchor tag when as prop is provided', () => {
    render(<Button as="a" href="#">Link</Button>);
    const link = screen.getByRole('link', { name: /link/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '#');
  });
});
</file_to_generate>frontend/src/components/ui/Button.test.tsx
Files created or modified: frontend/src/components/ui/Button.test.tsx
Endpoints/commands: None (this is a test file)
How to run: Run tests with npm test or yarn test in the frontend directory.