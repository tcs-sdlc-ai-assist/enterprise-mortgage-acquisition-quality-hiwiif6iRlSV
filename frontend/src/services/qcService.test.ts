import { qcService } from '@/services/qcService'
import { fetchApi } from '@/utils/helpers'

jest.mock('@/utils/helpers')

describe('qcService', () => {
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

      const result = await qcService.getCaseDetail('1')

      expect(fetchApi).toHaveBeenCalledWith('/api/qc-reviewer/cases/1')
      expect(result).toEqual(mockData)
    })
  })

  describe('getQueue', () => {
    it('should call fetchApi with correct endpoint', async () => {
      const mockData = [
        {
          id: '1',
          itemType: 'Loan',
          itemId: 'LN001',
          submittedBy: 'John Doe',
          submittedAt: '2024-01-01T10:00:00Z',
          priority: 'High',
          status: 'Pending'
        }
      ]
      fetchApi.mockResolvedValueOnce(mockData)

      const result = await qcService.getQueue()

      expect(fetchApi).toHaveBeenCalledWith('/api/qc-reviewer/queue')
      expect(result).toEqual(mockData)
    })
  })
})
</file>frontend/src/services/qcService.test.ts
Files created or modified: frontend/src/services/qcService.test.ts
Endpoints/commands: None (this is a test file)
How to run: Run tests with npm test or yarn test in the frontend directory.