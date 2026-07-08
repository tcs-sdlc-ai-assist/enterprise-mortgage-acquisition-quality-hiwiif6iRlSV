import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useQc } from '@/hooks/useQc';
import { qcService } from '@/services/qcService';

jest.mock('@/services/qcService');

const TestComponent = () => {
  const { caseDetail, queue, loading, error, getCaseDetail, getQueue } = useQc();
  return (
    <div>
      {loading && <div data-testid="loading">Loading</div>}
      {error && <div data-testid="error">{error}</div>}
      {caseDetail && <div data-testid="caseDetail">{caseDetail.caseNumber}</div>}
      {queue && <div data-testid="queue">{queue.length}</div>}
      <button data-testid="get-case-detail-button" onClick={() => getCaseDetail('1')}>
        Get Case Detail
      </button>
      <button data-testid="get-queue-button" onClick={getQueue}>
        Get Queue
      </button>
    </div>
  );
};

describe('useQc', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('initial state', () => {
    it('should initialize with null caseDetail, queue, false loading, and null error', () => {
      render(<TestComponent />);
      expect(screen.getByTestId('loading')).not.toBeInTheDocument();
      expect(screen.getByTestId('error')).not.toBeInTheDocument();
      expect(screen.getByTestId('caseDetail')).not.toBeInTheDocument();
      expect(screen.getByTestId('queue')).not.toBeInTheDocument();
    });
  });

  describe('getCaseDetail', () => {
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
      qcService.getCaseDetail.mockResolvedValueOnce(mockCase);

      render(<TestComponent />);

      expect(screen.getByTestId('loading')).not.toBeInTheDocument();

      const getCaseDetailButton = screen.getByTestId('get-case-detail-button');
      fireEvent.click(getCaseDetailButton);

      expect(screen.getByTestId('loading')).toBeInTheDocument();

      await waitFor(() => {
        expect(screen.getByTestId('loading')).not.toBeInTheDocument();
      });

      expect(screen.getByTestId('caseDetail')).toHaveTextContent('C001');
    });

    it('should set error on failure', async () => {
      qcService.getCaseDetail.mockRejectedValueOnce(new Error('API error'));

      render(<TestComponent />);

      const getCaseDetailButton = screen.getByTestId('get-case-detail-button');
      fireEvent.click(getCaseDetailButton);

      expect(screen.getByTestId('loading')).toBeInTheDocument();

      await waitFor(() => {
        expect(screen.getByTestId('loading')).not.toBeInTheDocument();
      });

      expect(screen.getByTestId('error')).toHaveTextContent('API error');
    });
  });

  describe('getQueue', () => {
    it('should set loading and then queue on success', async () => {
      const mockQueue = [
        {
          id: '1',
          itemType: 'Loan',
          itemId: 'LN001',
          submittedBy: 'John Doe',
          submittedAt: '2024-01-01T10:00:00Z',
          priority: 'High',
          status: 'Pending'
        }
      ];
      qcService.getQueue.mockResolvedValueOnce(mockQueue);

      render(<TestComponent />);

      expect(screen.getByTestId('loading')).not.toBeInTheDocument();

      const getQueueButton = screen.getByTestId('get-queue-button');
      fireEvent.click(getQueueButton);

      expect(screen.getByTestId('loading')).toBeInTheDocument();

      await waitFor(() => {
        expect(screen.getByTestId('loading')).not.toBeInTheDocument();
      });

      expect(screen.getByTestId('queue')).toHaveTextContent('1');
    });

    it('should set error on failure', async () => {
      qcService.getQueue.mockRejectedValueOnce(new Error('API error'));

      render(<TestComponent />);

      const getQueueButton = screen.getByTestId('get-queue-button');
      fireEvent.click(getQueueButton);

      expect(screen.getByTestId('loading')).toBeInTheDocument();

      await waitFor(() => {
        expect(screen.getByTestId('loading')).not.toBeInTheDocument();
      });

      expect(screen.getByTestId('error')).toHaveTextContent('API error');
    });
  });
});
```