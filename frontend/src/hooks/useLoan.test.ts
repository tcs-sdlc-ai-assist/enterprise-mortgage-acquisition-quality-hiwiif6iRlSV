import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useLoan } from '@/hooks/useLoan';
import { loanService } from '@/services/loanService';

jest.mock('@/services/loanService');

const TestComponent = () => {
  const { loans, loan, loading, error, getLoans, getLoanById } = useLoan();
  return (
    <div>
      {loading && <div data-testid="loading">Loading</div>}
      {error && <div data-testid="error">{error}</div>}
      {loans && <div data-testid="loans">{loans.length}</div>}
      {loan && <div data-testid="loan">{loan.loanNumber}</div>}
      <button data-testid="get-loans-button" onClick={getLoans}>
        Get Loans
      </button>
      <button data-testid="get-loan-by-id-button" onClick={() => getLoanById('1')}>
        Get Loan by ID
      </button>
    </div>
  );
};

describe('useLoan', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('initial state', () => {
    it('should initialize with null loans, loan, false loading, and null error', () => {
      render(<TestComponent />);
      expect(screen.getByTestId('loading')).not.toBeInTheDocument();
      expect(screen.getByTestId('error')).not.toBeInTheDocument();
      expect(screen.getByTestId('loans')).not.toBeInTheDocument();
      expect(screen.getByTestId('loan')).not.toBeInTheDocument();
    });
  });

  describe('getLoans', () => {
    it('should set loading and then loans on success', async () => {
      const mockLoans = [
        { id: '1', loanNumber: 'LN001', borrowerName: 'John', amount: 10000, status: 'Approved', applicationDate: '2024-01-01T10:00:00Z' }
      ];
      loanService.getLoans.mockResolvedValueOnce(mockLoans);

      render(<TestComponent />);

      expect(screen.getByTestId('loading')).not.toBeInTheDocument();

      const getLoansButton = screen.getByTestId('get-loans-button');
      fireEvent.click(getLoansButton);

      expect(screen.getByTestId('loading')).toBeInTheDocument();

      await waitFor(() => {
        expect(screen.getByTestId('loading')).not.toBeInTheDocument();
      });

      expect(screen.getByTestId('loans')).toHaveTextContent('1');
    });

    it('should set error on failure', async () => {
      loanService.getLoans.mockRejectedValueOnce(new Error('API error'));

      render(<TestComponent />);

      const getLoansButton = screen.getByTestId('get-loans-button');
      fireEvent.click(getLoansButton);

      expect(screen.getByTestId('loading')).toBeInTheDocument();

      await waitFor(() => {
        expect(screen.getByTestId('loading')).not.toBeInTheDocument();
      });

      expect(screen.getByTestId('error')).toHaveTextContent('API error');
    });
  });

  describe('getLoanById', () => {
    it('should set loading and then loan on success', async () => {
      const mockLoan = {
        id: '1',
        loanNumber: 'LN001',
        borrowerName: 'John',
        amount: 10000,
        status: 'Approved',
        applicationDate: '2024-01-01T10:00:00Z',
        purpose: 'Home purchase',
        termMonths: 360,
        interestRate: 5.5,
        monthlyPayment: 567.79,
        createdAt: '2024-01-01T10:00:00Z',
        updatedAt: '2024-01-01T10:00:00Z'
      };
      loanService.getLoanById.mockResolvedValueOnce(mockLoan);

      render(<TestComponent />);

      const getLoanByIdButton = screen.getByTestId('get-loan-by-id-button');
      fireEvent.click(getLoanByIdButton);

      expect(screen.getByTestId('loading')).toBeInTheDocument();

      await waitFor(() => {
        expect(screen.getByTestId('loading')).not.toBeInTheDocument();
      });

      expect(screen.getByTestId('loan')).toHaveTextContent('LN001');
    });

    it('should set error on failure', async () => {
      loanService.getLoanById.mockRejectedValueOnce(new Error('API error'));

      render(<TestComponent />);

      const getLoanByIdButton = screen.getByTestId('get-loan-by-id-button');
      fireEvent.click(getLoanByIdButton);

      expect(screen.getByTestId('loading')).toBeInTheDocument();

      await waitFor(() => {
        expect(screen.getByTestId('loading')).not.toBeInTheDocument();
      });

      expect(screen.getByTestId('error')).toHaveTextContent('API error');
    });
  });
});
</file_to_generate>frontend/src/hooks/useLoan.test.ts
Files created or modified: frontend/src/hooks/useLoan.test.ts
Endpoints/commands: None (this is a test file)
How to run: Run tests with npm test or yarn test in the frontend directory.