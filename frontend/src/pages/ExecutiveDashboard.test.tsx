import { render, screen } from '@testing-library/react';
import ExecutiveDashboard from './ExecutiveDashboard';
import { fetchApi } from '@/utils/helpers';

jest.mock('@/utils/helpers');

describe('ExecutiveDashboard', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('displays loading state while fetching data', async () => {
    fetchApi.mockImplementation(() => new Promise(() => {}));
    render(<ExecutiveDashboard />);
    expect(screen.getByText(/loading dashboard/i)).toBeInTheDocument();
  });

  it('displays error state when fetch fails', async () => {
    fetchApi.mockRejectedValueOnce(new Error('API error'));
    render(<ExecutiveDashboard />);
    expect(await screen.findByText(/error loading dashboard/i)).toBeInTheDocument();
  });

  it('displays summary and recent activities when data is fetched', async () => {
    const mockSummary = {
      totalUsers: 100,
      totalOrders: 50,
      totalRevenue: 1234.56,
      growthRate: 5.5
    };

    const mockActivities = [
      {
        id: '1',
        type: 'Deposit',
        description: 'User deposited funds',
        timestamp: '2024-01-01T10:00:00Z',
        amount: 100.0
      },
      {
        id: '2',
        type: 'Withdrawal',
        description: 'User withdrew funds',
        timestamp: '2024-01-02T11:00:00Z'
      }
    ];

    fetchApi
      .mockResolvedValueOnce(mockSummary)
      .mockResolvedValueOnce(mockActivities);

    render(<ExecutiveDashboard />);

    expect(await screen.findByText('100')).toBeInTheDocument();
    expect(await screen.findByText('50')).toBeInTheDocument();
    expect(await screen.findByText('$1234.56')).toBeInTheDocument();
    expect(await screen.findByText('5.5%')).toBeInTheDocument();

    expect(await screen.findByText(/user deposited funds/i)).toBeInTheDocument();
    expect(await screen.findByText('$100.00')).toBeInTheDocument();
    expect(await screen.findByText(/user withdrew funds/i)).toBeInTheDocument();
    expect(await screen.findByText('-')).toBeInTheDocument();
  });
});
</file_to_generate>frontend/src/pages/ExecutiveDashboard.test.tsx
Files created or modified: frontend/src/pages/ExecutiveDashboard.test.tsx
Endpoints/commands: None (this is a test file)
How to run: Run tests with npm test or yarn test in the frontend directory.