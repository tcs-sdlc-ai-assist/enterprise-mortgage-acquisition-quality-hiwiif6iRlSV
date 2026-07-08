import { render, screen } from '@testing-library/react';
import Header from './Header';

describe('Header', () => {
  it('renders logo and navigation links', () => {
    render(<Header />);
    
    // Check logo
    const logoImg = screen.getByAltText('Logo');
    expect(logoImg).toBeInTheDocument();
    
    // Check navigation links
    const homeLink = screen.getByRole('link', { name: /home/i });
    expect(homeLink).toBeInTheDocument();
    
    const aboutLink = screen.getByRole('link', { name: /about/i });
    expect(aboutLink).toBeInTheDocument();
    
    const contactLink = screen.getByRole('link', { name: /contact/i });
    expect(contactLink).toBeInTheDocument();
  });
});
</file_to_generate>