import { loanService } from '@/services/loanService'
import { fetchApi } from '@/utils/helpers'

jest.mock('@/utils/helpers')

describe('loanService', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('getLoans', () => {
    it('should call fetchApi with correct endpoint', async () => {
      const mockData = [
        { id: '1', loanNumber: 'LN001', borrowerName: 'John', amount: 10000, status: 'Approved', applicationDate: '2024-01-01T10:00:00Z' }
      ]
      fetchApi.mockResolvedValueOnce(mockData)

      const result = await loanService.getLoans()

      expect(fetchApi).toHaveBeenCalledWith('/api/loan-analyst/loans')
      expect(result).toEqual(mockData)
    })
  })

  describe('getLoanById', () => {
    it('should call fetchApi with correct endpoint', async () => {
      const mockData = { id: '1', loanNumber: 'LN001', borrowerName: 'John', amount: 10000, status: 'Approved', applicationDate: '2024-01-01T10:00:00Z' }
      fetchApi.mockResolvedValueOnce(mockData)

      const result = await loanService.getLoanById('1')

      expect(fetchApi).toHaveBeenCalledWith('/api/loan-analyst/loans/1')
      expect(result).toEqual(mockData)
    })
  })
})