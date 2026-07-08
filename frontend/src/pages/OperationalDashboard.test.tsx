import { render, screen } from '@testing-library/react';
import OperationalDashboard from './OperationalDashboard';
import { fetchApi } from '@/utils/helpers';

jest.mock('@/utils/helpers');

describe('OperationalDashboard', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('displays loading state while fetching data', async () => {
    fetchApi.mockImplementation(() => new Promise(() => {}));
    render(<OperationalDashboard />);
    expect(screen.getByText(/loading operational dashboard/i)).toBeInTheDocument();
  });

  it('displays error state when fetch fails', async () => {
    fetchApi.mockRejectedValueOnce(new Error('API error'));
    render(<OperationalDashboard />);
    expect(await screen.findByText(/error loading operational dashboard/i)).toBeInTheDocument();
  });

  it('displays summary and recent operations when data is fetched', async () => {
    const mockSummary = {
      totalOperations: 150,
      totalUsers: 75,
      activeSessions: 12,
      systemUptime: '5 days, 3 hours'
    };

    const mockOperations = [
      {
        id: '1',
        type: 'Login',
        description: 'User logged in',
        timestamp: '2024-01-01T10:00:00Z',
        userId: 'user123',
        status: 'Success'
      },
      {
        id: '2',
        type: 'Transaction',
        description: 'Funds transferred',
        timestamp: '2024-01-02T11:00:00Z',
        userId: 'user456',
        status: 'Pending'
      }
    ];

    fetchApi
      .mockResolvedValueOnce(mockSummary)
      .mockResolvedValueOnce(mockOperations);

    render(<OperationalDashboard />);

    expect(await screen.findByText('150')).toBeInTheDocument();
    expect(await screen.findByText('75')).toBeInTheDocument();
    expect(await screen.findByText('12')).toBeInTheDocument();
    expect(await screen.findByText('5 days, 3 hours')).toBeInTheDocument();

    expect(await screen.findByText(/user logged in/i)).toBeInTheDocument();
    expect(await screen.findByText(/funds transferred/i)).toBeInTheDocument();
    expect(await screen.findByText(/user123/)).toBeInTheDocument();
    expect(await screen.findByText(/user456/)).toBeInTheDocument();
    expect(await screen.findByText(/success/i)).toBeInTheDocument();
    expect(await screen.findByText(/pending/i)).toBeInTheDocument();
  });
});
</file_to_generate>frontend/src/pages/OperationalDashboard.test.tsx
Files created or modified: frontend/src/pages/OperationalDashboard.test.tsx
Endpoints/commands: None (this is a test file)
How to run: Run tests with npm test or yarn test in the frontend directory.