import { riskService } from '@/services/riskService'
import { fetchApi } from '@/utils/helpers'

jest.mock('@/utils/helpers')

describe('riskService', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('getCounterpartyDetail', () => {
    it('should call fetchApi with correct endpoint', async () => {
      const mockData = {
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
      }
      fetchApi.mockResolvedValueOnce(mockData)

      const result = await riskService.getCounterpartyDetail('1')

      expect(fetchApi).toHaveBeenCalledWith('/api/risk-manager/counterparties/1')
      expect(result).toEqual(mockData)
    })
  })

  describe('getWatchlist', () => {
    it('should call fetchApi with correct endpoint', async () => {
      const mockData = [
        {
          id: '1',
          itemId: 'ITEM001',
          itemType: 'Stock',
          description: 'High volatility stock',
          riskLevel: 'High',
          status: 'Active',
          assignedTo: 'John Doe',
          createdAt: '2024-01-01T10:00:00Z',
          updatedAt: '2024-01-01T10:00:00Z'
        }
      ]
      fetchApi.mockResolvedValueOnce(mockData)

      const result = await riskService.getWatchlist()

      expect(fetchApi).toHaveBeenCalledWith('/api/risk-manager/watchlist')
      expect(result).toEqual(mockData)
    })
  })
})