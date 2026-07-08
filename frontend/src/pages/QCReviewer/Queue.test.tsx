import { render, screen } from '@testing-library/react';
import Queue from './Queue';
import { fetchApi } from '@/utils/helpers';

jest.mock('@/utils/helpers');

describe('Queue', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('displays loading state while fetching data', async () => {
    fetchApi.mockImplementation(() => new Promise(() => {}));
    render(<Queue />);
    expect(screen.getByText(/loading qc queue/i)).toBeInTheDocument();
  });

  it('displays error state when fetch fails', async () => {
    fetchApi.mockRejectedValueOnce(new Error('API error'));
    render(<Queue />);
    expect(await screen.findByText(/error loading qc queue/i)).toBeInTheDocument();
  });

  it('displays queue items when data is fetched', async () => {
    const mockItems = [
      {
        id: '1',
        itemType: 'Loan',
        itemId: 'LN001',
        submittedBy: 'John Doe',
        submittedAt: '2024-01-01T10:00:00Z',
        priority: 'High',
        status: 'Pending'
      },
      {
        id: '2',
        itemType: 'Case',
        itemId: 'C001',
        submittedBy: 'Jane Smith',
        submittedAt: '2024-01-02T11:00:00Z',
        priority: 'Medium',
        status: 'In Progress'
      }
    ];

    fetchApi.mockResolvedValueOnce(mockItems);

    render(<Queue />);

    expect(await screen.findByText('LN001')).toBeInTheDocument();
    expect(await screen.findByText('John Doe')).toBeInTheDocument();
    expect(await screen.findByText(/high/i)).toBeInTheDocument();
    expect(await screen.findByText(/pending/i)).toBeInTheDocument();
    expect(await screen.findByText('C001')).toBeInTheDocument();
    expect(await screen.findByText('Jane Smith')).toBeInTheDocument();
    expect(await screen.findByText(/medium/i)).toBeInTheDocument();
    expect(await screen.findByText(/in progress/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /review/i })).toBeInTheDocument();
  });

  it('displays message when no items are in queue', async () => {
    fetchApi.mockResolvedValueOnce([]);

    render(<Queue />);

    expect(await screen.findByText(/no items in queue/i)).toBeInTheDocument();
  });
});