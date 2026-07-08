import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useRemedy } from '@/hooks/useRemedy';
import { remedyService } from '@/services/remedyService';

jest.mock('@/services/remedyService');

const TestComponent = () => {
  const { cases, caseDetail, loading, error, getCases, getCaseById } = useRemedy();
  return (
    <div>
      {loading && <div data-testid="loading">Loading</div>}
      {error && <div data-testid="error">{error}</div>}
      {cases && <div data-testid="cases">{cases.length}</div>}
      {caseDetail && <div data-testid="caseDetail">{caseDetail.caseNumber}</div>}
      <button data-testid="get-cases-button" onClick={getCases}>
        Get Cases
      </button>
      <button data-testid="get-case-by-id-button" onClick={() => getCaseById('1')}>
        Get Case by ID
      </button>
    </div>
  );
};

describe('useRemedy', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('initial state', () => {
    it('should initialize with null cases, caseDetail, false loading, and null error', () => {
      render(<TestComponent />);
      expect(screen.getByTestId('loading')).not.toBeInTheDocument();
      expect(screen.getByTestId('error')).not.toBeInTheDocument();
      expect(screen.getByTestId('cases')).not.toBeInTheDocument();
      expect(screen.getByTestId('caseDetail')).not.toBeInTheDocument();
    });
  });

  describe('getCases', () => {
    it('should set loading and then cases on success', async () => {
      const mockCases = [
        { id: '1', caseNumber: 'C001', title: 'Test Case 1', status: 'Open', priority: 'High', submittedBy: 'John Doe', submittedAt: '2024-01-01T10:00:00Z' },
        { id: '2', caseNumber: 'C002', title: 'Test Case 2', status: 'Closed', priority: 'Low', submittedBy: 'Jane Smith', submittedAt: '2024-01-02T11:00:00Z' }
      ];
      remedyService.getCaseList.mockResolvedValueOnce(mockCases);

      render(<TestComponent />);

      expect(screen.getByTestId('loading')).not.toBeInTheDocument();

      const getCasesButton = screen.getByTestId('get-cases-button');
      fireEvent.click(getCasesButton);

      expect(screen.getByTestId('loading')).toBeInTheDocument();

      await waitFor(() => {
        expect(screen.getByTestId('loading')).not.toBeInTheDocument();
      });

      expect(screen.getByTestId('cases')).toHaveTextContent('2');
    });

    it('should set error on failure', async () => {
      remedyService.getCaseList.mockRejectedValueOnce(new Error('API error'));

      render(<TestComponent />);

      const getCasesButton = screen.getByTestId('get-cases-button');
      fireEvent.click(getCasesButton);

      expect(screen.getByTestId('loading')).toBeInTheDocument();

      await waitFor(() => {
        expect(screen.getByTestId('loading')).not.toBeInTheDocument();
      });

      expect(screen.getByTestId('error')).toHaveTextContent('API error');
    });
  });

  describe('getCaseById', () => {
    it('should set loading and then caseDetail on success', async () => {
      const mockCase = {
        id: '1',
        caseNumber: 'C001',
        title: 'Test Case',
        description: 'Test description',
        status: 'Open',
        priority: 'High',
        submittedBy: 'John Doe',
        submittedAt: '2024-01-01T10:00:00Z',
        reviewedBy: 'Jane Smith',
        reviewedAt: '2024-01-02T11:00:00Z',
        notes: 'Some notes',
        createdAt: '2024-01-01T10:00:00Z',
        updatedAt: '2024-01-01T10:00:00Z'
      };
      remedyService.getCaseDetail.mockResolvedValueOnce(mockCase);

      render(<TestComponent />);

      const getCaseByIdButton = screen.getByTestId('get-case-by-id-button');
      fireEvent.click(getCaseByIdButton);

      expect(screen.getByTestId('loading')).toBeInTheDocument();

      await waitFor(() => {
        expect(screen.getByTestId('loading')).not.toBeInTheDocument();
      });

      expect(screen.getByTestId('caseDetail')).toHaveTextContent('C001');
    });

    it('should set error on failure', async () => {
      remedyService.getCaseDetail.mockRejectedValueOnce(new Error('API error'));

      render(<TestComponent />);

      const getCaseByIdButton = screen.getByTestId('get-case-by-id-button');
      fireEvent.click(getCaseByIdButton);

      expect(screen.getByTestId('loading')).toBeInTheDocument();

      await waitFor(() => {
        expect(screen.getByTestId('loading')).not.toBeInTheDocument();
      });

      expect(screen.getByTestId('error')).toHaveTextContent('API error');
    });
  });
});