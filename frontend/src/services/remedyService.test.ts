import { remedyService } from '@/services/remedyService'
import { fetchApi } from '@/utils/helpers'

jest.mock('@/utils/helpers')

describe('remedyService', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('getCaseDetail', () => {
    it('should call fetchApi with correct endpoint', async () => {
      const mockData = {
        id: '1',
        caseNumber: 'C001',
        title: 'Test Case',
        description: 'Test description',
        status: 'Open',
        priority: 'High',
        submittedBy: 'John Doe',
        submittedAt: '2024-01-01T10:00:00Z',
        createdAt: '2024-01-01T10:00:00Z',
        updatedAt: '2024-01-01T10:00:00Z'
      }
      fetchApi.mockResolvedValueOnce(mockData)

      const result = await remedyService.getCaseDetail('1')

      expect(fetchApi).toHaveBeenCalledWith('/api/remedy-specialist/cases/1')
      expect(result).toEqual(mockData)
    })
  })

  describe('getCaseList', () => {
    it('should call fetchApi with correct endpoint', async () => {
      const mockData = [
        {
          id: '1',
          caseNumber: 'C001',
          title: 'Test Case',
          status: 'Open',
          priority: 'High',
          submittedBy: 'John Doe',
          submittedAt: '2024-01-01T10:00:00Z'
        }
      ]
      fetchApi.mockResolvedValueOnce(mockData)

      const result = await remedyService.getCaseList()

      expect(fetchApi).toHaveBeenCalledWith('/api/remedy-specialist/cases')
      expect(result).toEqual(mockData)
    })
  })
})