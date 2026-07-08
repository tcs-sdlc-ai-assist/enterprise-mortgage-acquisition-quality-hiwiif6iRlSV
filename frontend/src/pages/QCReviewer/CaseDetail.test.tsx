import { render, screen } from '@testing-library/react';
import CaseDetail from './CaseDetail';
import { fetchApi } from '@/utils/helpers';

jest.mock('@/utils/helpers');

describe('CaseDetail', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('displays loading state while fetching data', async () => {
    fetchApi.mockImplementation(() => new Promise(() => {}));
    render(<CaseDetail />);
    expect(screen.getByText(/loading case details/i)).toBeInTheDocument();
  });

  it('displays error state when fetch fails', async () => {
    fetchApi.mockRejectedValueOnce(new Error('API error'));
    render(<CaseDetail />);
    expect(await screen.findByText(/error loading case details/i)).toBeInTheDocument();
  });

  it('displays case details when data is fetched', async () => {
    const mockCase = {
      id: '1',
      caseNumber: 'C001',
      title: 'Test Case',
      description: 'This is a test case description.',
      status: 'Open',
      priority: 'High',
      submittedBy: 'John Doe',
      submittedAt: '2024-01-01T10:00:00Z',
      reviewedBy: 'Jane Smith',
      reviewedAt: '2024-01-02T11:00:00Z',
      notes: 'Some notes about the case.',
      createdAt: '2024-01-01T10:00:00Z',
      updatedAt: '2024-01-01T10:00:00Z'
    };

    fetchApi.mockResolvedValueOnce(mockCase);

    render(<CaseDetail />);

    expect(await screen.findByText('C001')).toBeInTheDocument();
    expect(await screen.findByText('Test Case')).toBeInTheDocument();
    expect(await screen.findByText(/open/i)).toBeInTheDocument();
    expect(await screen.findByText(/high/i)).toBeInTheDocument();
    expect(await screen.findByText('John Doe')).toBeInTheDocument();
    expect(await screen.findByText('Jan 1, 2024')).toBeInTheDocument();
    expect(await screen.findByText('Jane Smith')).toBeInTheDocument();
    expect(await screen.findByText('Jan 2, 2024')).toBeInTheDocument();
    expect(await screen.findByText('Some notes about the case.')).toBeInTheDocument();
  });
});
</file_to_generate>frontend/src/pages/QCReviewer/CaseDetail.test.tsx
Files created or modified: frontend/src/pages/QCReviewer/CaseDetail.test.tsx
Endpoints/commands: None (this is a test file)
How to run: Run tests with npm test or yarn test in the frontend directory.