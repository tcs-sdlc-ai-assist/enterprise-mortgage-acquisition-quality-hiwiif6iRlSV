import { render, screen } from '@testing-library/react';
import Sidebar from './Sidebar';

describe('Sidebar', () => {
  it('renders logo, brand text, and navigation links', () => {
    render(<Sidebar />);
    
    // Check logo
    const logoImg = screen.getByAltText('Logo');
    expect(logoImg).toBeInTheDocument();
    
    // Check brand text
    const brandText = screen.getByText('MakqCRP');
    expect(brandText).toBeInTheDocument();
    
    // Check navigation links
    const homeLink = screen.getByRole('link', { name: /home/i });
    expect(homeLink).toBeInTheDocument();
    
    const aboutLink = screen.getByRole('link', { name: /about/i });
    expect(aboutLink).toBeInTheDocument();
    
    const contactLink = screen.getByRole('link', { name: /contact/i });
    expect(contactLink).toBeInTheDocument();
  });
});
```