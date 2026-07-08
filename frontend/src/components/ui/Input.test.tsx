import { render, screen } from '@testing-library/react';
import Input from './Input';

describe('Input', () => {
  it('renders with default class', () => {
    render(<Input />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('form-control');
  });

  it('applies custom className', () => {
    render(<Input className="custom-input" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('custom-input');
  });

  it('renders as textarea when as prop is provided', () => {
    render(<Input as="textarea" />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toBeInTheDocument();
    expect(textarea.tagName.toLowerCase()).toBe('textarea');
  });
});