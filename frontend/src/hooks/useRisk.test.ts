import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useRisk } from '@/hooks/useRisk';
import { riskService } from '@/services/riskService';

jest.mock('@/services/riskService');

const TestComponent = () => {
  const { counterparty, watchlist, loading, error, getCounterpartyDetail, getWatchlist } = useRisk();
  return (
    <div>
      {loading && <div data-testid="loading">Loading</div>}
      {error && <div data-testid="error">{error}</div>}
      {counterparty && <div data-testid="counterparty">{counterparty.name}</div>}
      {watchlist && <div data-testid="watchlist">{watchlist.length}</div>}
      <button data-testid="get-counterparty-button" onClick={() => getCounterpartyDetail('1')}>
        Get Counterparty
      </button>
      <button data-testid="get-watchlist-button" onClick={getWatchlist}>
        Get Watchlist
      </button>
    </div>
  );
};

describe('useRisk', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('initial state', () => {
    it('should initialize with null counterparty, watchlist, false loading, and null error', () => {
      render(<TestComponent />);
      expect(screen.getByTestId('loading')).not.toBeInTheDocument();
      expect(screen.getByTestId('error')).not.toBeInTheDocument();
      expect(screen.getByTestId('counterparty')).not.toBeInTheDocument();
      expect(screen.getByTestId('watchlist')).not.toBeInTheDocument();
    });
  });

  describe('getCounterpartyDetail', () => {
    it('should set loading and then counterparty on success', async () => {
      const mockCounterparty = {
        id: '1',
        counterpartyId: 'CP001',
        name: 'Test Counterparty',
        type: 'Bank',
        riskRating: 'Medium',
        exposure: 1000000,
        status: 'Active',
        contactPerson: 'John Doe',
        contactEmail: 'john@example.com',
        contactPhone: '123-456-7890',
        address: '123 Main St',
        city: 'Anytown',
        country: 'USA',
        industry: 'Finance',
        relationshipStartDate: '2023-01-01T00:00:00Z',
        lastReviewDate: '2024-01-01T00:00:00Z',
        notes: 'Test notes',
        createdAt: '2023-01-01T00:00:00Z',
        updatedAt: '2023-01-01T00:00:00Z'
      };
      riskService.getCounterpartyDetail.mockResolvedValueOnce(mockCounterparty);

      render(<TestComponent />);

      const getCounterpartyButton = screen.getByTestId('get-counterparty-button');
      fireEvent.click(getCounterpartyButton);

      expect(screen.getByTestId('loading')).toBeInTheDocument();

      await waitFor(() => {
        expect(screen.getByTestId('loading')).not.toBeInTheDocument();
      });

      expect(screen.getByTestId('counterparty')).toHaveTextContent('Test Counterparty');
    });

    it('should set error on failure', async () => {
      riskService.getCounterpartyDetail.mockRejectedValueOnce(new Error('API error'));

      render(<TestComponent />);

      const getCounterpartyButton = screen.getByTestId('get-counterparty-button');
      fireEvent.click(getCounterpartyButton);

      expect(screen.getByTestId('loading')).toBeInTheDocument();

      await waitFor(() => {
        expect(screen.getByTestId('loading')).not.toBeInTheDocument();
      });

      expect(screen.getByTestId('error')).toHaveTextContent('API error');
    });
  });

  describe('getWatchlist', () => {
    it('should set loading and then watchlist on success', async () => {
      const mockWatchlist = [
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
        }
      ];
      riskService.getWatchlist.mockResolvedValueOnce(mockWatchlist);

      render(<TestComponent />);

      const getWatchlistButton = screen.getByTestId('get-watchlist-button');
      fireEvent.click(getWatchlistButton);

      expect(screen.getByTestId('loading')).toBeInTheDocument();

      await waitFor(() => {
        expect(screen.getByTestId('loading')).not.toBeInTheDocument();
      });

      expect(screen.getByTestId('watchlist')).toHaveTextContent('1');
    });

    it('should set error on failure', async () => {
      riskService.getWatchlist.mockRejectedValueOnce(new Error('API error'));

      render(<TestComponent />);

      const getWatchlistButton = screen.getByTestId('get-watchlist-button');
      fireEvent.click(getWatchlistButton);

      expect(screen.getByTestId('loading')).toBeInTheDocument();

      await waitFor(() => {
        expect(screen.getByTestId('loading')).not.toBeInTheDocument();
      });

      expect(screen.getByTestId('error')).toHaveTextContent('API error');
    });
  });
});
```