import { render, screen } from '@testing-library/react';
import CaseList from './CaseList';
import { fetchApi } from '@/utils/helpers';

jest.mock('@/utils/helpers');

describe('CaseList', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('displays loading state while fetching data', async () => {
    fetchApi.mockImplementation(() => new Promise(() => {}));
    render(<CaseList />);
    expect(screen.getByText(/loading cases/i)).toBeInTheDocument();
  });

  it('displays error state when fetch fails', async () => {
    fetchApi.mockRejectedValueOnce(new Error('API error'));
    render(<CaseList />);
    expect(await screen.findByText(/error loading cases/i)).toBeInTheDocument();
  });

  it('displays case list when data is fetched', async () => {
    const mockCases = [
      {
        id: '1',
        caseNumber: 'C001',
        title: 'Test Case 1',
        status: 'Open',
        priority: 'High',
        submittedBy: 'John Doe',
        submittedAt: '2024-01-01T10:00:00Z'
      },
      {
        id: '2',
        caseNumber: 'C002',
        title: 'Test Case 2',
        status: 'Closed',
        priority: 'Low',
        submittedBy: 'Jane Smith',
        submittedAt: '2024-01-02T11:00:00Z'
      }
    ];

    fetchApi.mockResolvedValueOnce(mockCases);

    render(<CaseList />);

    expect(await screen.findByText('C001')).toBeInTheDocument();
    expect(await screen.findByText('Test Case 1')).toBeInTheDocument();
    expect(await screen.findByText(/open/i)).toBeInTheDocument();
    expect(await screen.findByText(/high/i)).toBeInTheDocument();
    expect(await screen.findByText('John Doe')).toBeInTheDocument();
    expect(await screen.findByText('Jan 1, 2024')).toBeInTheDocument();

    expect(await screen.findByText('C002')).toBeInTheDocument();
    expect(await screen.findByText('Test Case 2')).toBeInTheDocument();
    expect(await screen.findByText(/closed/i)).toBeInTheDocument();
    expect(await screen.findByText(/low/i)).toBeInTheDocument();
    expect(await screen.findByText('Jane Smith')).toBeInTheDocument();
    expect(await screen.findByText('Jan 2, 2024')).toBeInTheDocument();
  });

  it('displays message when no cases are found', async () => {
    fetchApi.mockResolvedValueOnce([]);

    render(<CaseList />);

    expect(await screen.findByText(/no cases found/i)).toBeInTheDocument();
  });
});
```