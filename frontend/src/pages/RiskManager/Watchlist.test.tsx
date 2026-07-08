import { render, screen } from '@testing-library/react';
import Watchlist from './Watchlist';
import { fetchApi } from '@/utils/helpers';

jest.mock('@/utils/helpers');

describe('Watchlist', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('displays loading state while fetching data', async () => {
    fetchApi.mockImplementation(() => new Promise(() => {}));
    render(<Watchlist />);
    expect(screen.getByText(/loading watchlist/i)).toBeInTheDocument();
  });

  it('displays error state when fetch fails', async () => {
    fetchApi.mockRejectedValueOnce(new Error('API error'));
    render(<Watchlist />);
    expect(await screen.findByText(/error loading watchlist/i)).toBeInTheDocument();
  });

  it('displays watchlist items when data is fetched', async () => {
    const mockItems = [
      {
        id: '1',
        itemId: 'ITEM001',
        itemType: 'Stock',
        description: 'High volatility stock',
        riskLevel: 'High',
        status: 'Active',
        assignedTo: 'John Doe',
        createdAt: '2024-01-01T10:00:00Z',
        updatedAt: '2024-01-01T10:00:00Z'
      },
      {
        id: '2',
        itemId: 'ITEM002',
        itemType: 'Bond',
        description: 'Low yield bond',
        riskLevel: 'Low',
        status: 'Inactive',
        assignedTo: 'Jane Smith',
        createdAt: '2024-01-02T11:00:00Z',
        updatedAt: '2024-01-02T11:00:00Z'
      }
    ];

    fetchApi.mockResolvedValueOnce(mockItems);

    render(<Watchlist />);

    expect(await screen.findByText('ITEM001')).toBeInTheDocument();
    expect(await screen.findByText('John Doe')).toBeInTheDocument();
    expect(await screen.findByText(/high/i)).toBeInTheDocument();
    expect(await screen.findByText(/active/i)).toBeInTheDocument();
    expect(await screen.findByText('ITEM002')).toBeInTheDocument();
    expect(await screen.findByText('Jane Smith')).toBeInTheDocument();
    expect(await screen.findByText(/low/i)).toBeInTheDocument();
    expect(await screen.findByText(/inactive/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /view details/i })).toBeInTheDocument();
  });

  it('displays message when no items are in watchlist', async () => {
    fetchApi.mockResolvedValueOnce([]);

    render(<Watchlist />);

    expect(await screen.findByText(/no items in watchlist/i)).toBeInTheDocument();
  });
});