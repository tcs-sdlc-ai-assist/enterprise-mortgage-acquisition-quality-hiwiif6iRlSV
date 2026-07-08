import { render, screen } from '@testing-library/react';
import LoanList from './LoanList';
import { fetchApi } from '@/utils/helpers';

jest.mock('@/utils/helpers');

describe('LoanList', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('displays loading state while fetching data', async () => {
    fetchApi.mockImplementation(() => new Promise(() => {}));
    render(<LoanList />);
    expect(screen.getByText(/loading loans/i)).toBeInTheDocument();
  });

  it('displays error state when fetch fails', async () => {
    fetchApi.mockRejectedValueOnce(new Error('API error'));
    render(<LoanList />);
    expect(await screen.findByText(/error loading loans/i)).toBeInTheDocument();
  });

  it('displays loan list when data is fetched', async () => {
    const mockLoans = [
      {
        id: '1',
        loanNumber: 'LN001',
        borrowerName: 'John Doe',
        amount: 10000,
        status: 'Approved',
        applicationDate: '2024-01-01T10:00:00Z',
        decisionDate: '2024-01-02T11:00:00Z',
        analystName: 'Jane Smith'
      },
      {
        id: '2',
        loanNumber: 'LN002',
        borrowerName: 'Jane Doe',
        amount: 15000,
        status: 'Pending',
        applicationDate: '2024-01-03T12:00:00Z',
        decisionDate: undefined,
        analystName: undefined
      }
    ];

    fetchApi.mockResolvedValueOnce(mockLoans);

    render(<LoanList />);

    expect(await screen.findByText('LN001')).toBeInTheDocument();
    expect(await screen.findByText('John Doe')).toBeInTheDocument();
    expect(await screen.findByText('$10000.00')).toBeInTheDocument();
    expect(await screen.findByText(/approved/i)).toBeInTheDocument();
    expect(await screen.findByText('01/01/2024')).toBeInTheDocument();
    expect(await screen.findByText('01/02/2024')).toBeInTheDocument();
    expect(await screen.findByText('Jane Smith')).toBeInTheDocument();

    expect(await screen.findByText('LN002')).toBeInTheDocument();
    expect(await screen.findByText('Jane Doe')).toBeInTheDocument();
    expect(await screen.findByText('$15000.00')).toBeInTheDocument();
    expect(await screen.findByText(/pending/i)).toBeInTheDocument();
    expect(await screen.findByText('01/03/2024')).toBeInTheDocument();
    expect(await screen.findByText('-')).toBeInTheDocument();
    expect(await screen.findByText('-')).toBeInTheDocument();
  });

  it('displays message when no loans are found', async () => {
    fetchApi.mockResolvedValueOnce([]);

    render(<LoanList />);

    expect(await screen.findByText(/no loans found/i)).toBeInTheDocument();
  });
});