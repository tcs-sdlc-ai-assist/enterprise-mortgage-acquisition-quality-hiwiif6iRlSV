import { render, screen } from '@testing-library/react';
import CounterpartyDetail from './CounterpartyDetail';
import { fetchApi } from '@/utils/helpers';

jest.mock('@/utils/helpers');

describe('CounterpartyDetail', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('displays loading state while fetching data', async () => {
    fetchApi.mockImplementation(() => new Promise(() => {}));
    render(<CounterpartyDetail />);
    expect(screen.getByText(/loading counterparty details/i)).toBeInTheDocument();
  });

  it('displays error state when fetch fails', async () => {
    fetchApi.mockRejectedValueOnce(new Error('API error'));
    render(<CounterpartyDetail />);
    expect(await screen.findByText(/error loading counterparty details/i)).toBeInTheDocument();
  });

  it('displays counterparty details when data is fetched', async () => {
    const mockCounterparty = {
      id: '1',
      counterpartyId: 'CP001',
      name: 'Test Counterparty',
      type: 'Bank',
      riskRating: 'Medium',
      exposure: 1000000,
      status: 'Active',
      contactPerson: 'John Doe',
      contactEmail: 'john@example.com',
      contactPhone: '123-456-7890',
      address: '123 Main St',
      city: 'Anytown',
      country: 'USA',
      industry: 'Finance',
      relationshipStartDate: '2023-01-01T00:00:00Z',
      lastReviewDate: '2024-01-01T00:00:00Z',
      notes: 'Test notes',
      createdAt: '2023-01-01T00:00:00Z',
      updatedAt: '2023-01-01T00:00:00Z'
    };

    fetchApi.mockResolvedValueOnce(mockCounterparty);

    render(<CounterpartyDetail />);

    expect(await screen.findByText('CP001')).toBeInTheDocument();
    expect(await screen.findByText('Test Counterparty')).toBeInTheDocument();
    expect(await screen.findByText(/bank/i)).toBeInTheDocument();
    expect(await screen.findByText(/medium/i)).toBeInTheDocument();
    expect(await screen.findByText('$1000000.00')).toBeInTheDocument();
    expect(await screen.findByText(/active/i)).toBeInTheDocument();
    expect(await screen.findByText('John Doe')).toBeInTheDocument();
    expect(await screen.findByText('john@example.com')).toBeInTheDocument();
    expect(await screen.findByText('123-456-7890')).toBeInTheDocument();
    expect(await screen.findByText('123 Main St')).toBeInTheDocument();
    expect(await screen.findByText('Anytown')).toBeInTheDocument();
    expect(await screen.findByText('USA')).toBeInTheDocument();
    expect(await screen.findByText('Finance')).toBeInTheDocument();
    expect(await screen.findByText('Jan 1, 2023')).toBeInTheDocument();
    expect(await screen.findByText('Jan 1, 2024')).toBeInTheDocument();
    expect(await screen.findByText('Test notes')).toBeInTheDocument();
  });

  it('displays not found when counterparty is null', async () => {
    fetchApi.mockResolvedValueOnce(null);
    render(<CounterpartyDetail />);
    expect(await screen.findByText(/counterparty not found/i)).toBeInTheDocument();
  });
});
</file_to_generate>frontend/src/pages/RiskManager/CounterpartyDetail.test.tsx
Files created or modified: frontend/src/pages/RiskManager/CounterpartyDetail.test.tsx
Endpoints/commands: None (this is a test file)
How to run: Run tests with npm test or yarn test in the frontend directory.