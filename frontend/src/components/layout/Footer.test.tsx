import { render, screen } from '@testing-library/react';
import Footer from './Footer';

describe('Footer', () => {
  it('renders copyright text and navigation links', () => {
    render(<Footer />);
    
    // Check copyright text
    const currentYear = new Date().getFullYear();
    const copyrightText = screen.getByText(`© ${currentYear} MakqCRP. All rights reserved.`);
    expect(copyrightText).toBeInTheDocument();
    
    // Check navigation links
    const aboutLink = screen.getByRole('link', { name: /about/i });
    expect(aboutLink).toBeInTheDocument();
    
    const contactLink = screen.getByRole('link', { name: /contact/i });
    expect(contactLink).toBeInTheDocument();
  });
});
</file_to_generate>