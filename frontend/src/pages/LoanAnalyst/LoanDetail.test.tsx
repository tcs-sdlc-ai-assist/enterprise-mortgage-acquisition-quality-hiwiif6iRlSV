import { render, screen } from '@testing-library/react';
import LoanDetail from './LoanDetail';
import { fetchApi } from '@/utils/helpers';

jest.mock('@/utils/helpers');

describe('LoanDetail', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('displays loading state while fetching data', async () => {
    fetchApi.mockImplementation(() => new Promise(() => {}));
    render(<LoanDetail />);
    expect(screen.getByText(/loading loan details/i)).toBeInTheDocument();
  });

  it('displays error state when fetch fails', async () => {
    fetchApi.mockRejectedValueOnce(new Error('API error'));
    render(<LoanDetail />);
    expect(await screen.findByText(/error loading loan details/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /back to loan list/i })).toBeInTheDocument();
  });

  it('displays loan details when data is fetched', async () => {
    const mockLoan = {
      id: '1',
      loanNumber: 'LN001',
      borrowerName: 'John Doe',
      amount: 10000,
      status: 'Approved',
      applicationDate: '2024-01-01T10:00:00Z',
      decisionDate: '2024-01-02T11:00:00Z',
      analystName: 'Jane Smith',
      purpose: 'Home purchase',
      termMonths: 360,
      interestRate: 5.5,
      monthlyPayment: 567.79,
      createdAt: '2024-01-01T10:00:00Z',
      updatedAt: '2024-01-01T10:00:00Z'
    };

    fetchApi.mockResolvedValueOnce(mockLoan);

    render(<LoanDetail />);

    expect(await screen.findByText('LN001')).toBeInTheDocument();
    expect(await screen.findByText('John Doe')).toBeInTheDocument();
    expect(await screen.findByText('$10000.00')).toBeInTheDocument();
    expect(await screen.findByText(/approved/i)).toBeInTheDocument();
    expect(await screen.findByText('01/01/2024')).toBeInTheDocument();
    expect(await screen.findByText('01/02/2024')).toBeInTheDocument();
    expect(await screen.findByText('Jane Smith')).toBeInTheDocument();
    expect(await screen.findByText('Home purchase')).toBeInTheDocument();
    expect(await screen.findByText('360')).toBeInTheDocument();
    expect(await screen.findByText('5.5%')).toBeInTheDocument();
    expect(await screen.findByText('$567.79')).toBeInTheDocument();
    expect(await screen.findByText(/back to loan list/i)).toBeInTheDocument();
  });

  it('displays not found when loan is null', async () => {
    fetchApi.mockResolvedValueOnce(null);
    render(<LoanDetail />);
    expect(await screen.findByText(/loan not found/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /back to loan list/i })).toBeInTheDocument();
  });
});
</file_to_generate>frontend/src/pages/LoanAnalyst/LoanDetail.test.tsx
Files created or modified: frontend/src/pages/LoanAnalyst/LoanDetail.test.tsx
Endpoints/commands: None (this is a test file)
How to run: Run tests with npm test or yarn test in the frontend directory.