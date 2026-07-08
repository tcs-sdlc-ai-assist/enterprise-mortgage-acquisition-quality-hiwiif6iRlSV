import { api } from '@/services/api'
import { fetchApi } from '@/utils/helpers'

jest.mock('@/utils/helpers')

describe('api service', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('executiveDashboard', () => {
    describe('getSummary', () => {
      it('should call fetchApi with correct endpoint', async () => {
        const mockData = { totalUsers: 100, totalOrders: 50, totalRevenue: 1234.56, growthRate: 5.5 }
        fetchApi.mockResolvedValueOnce(mockData)

        const result = await api.executiveDashboard.getSummary()

        expect(fetchApi).toHaveBeenCalledWith('/api/executive-dashboard/summary')
        expect(result).toEqual(mockData)
      })
    })

    describe('getRecentActivities', () => {
      it('should call fetchApi with correct endpoint', async () => {
        const mockData = [
          { id: '1', type: 'Deposit', description: 'Test', timestamp: '2024-01-01T10:00:00Z', amount: 100 }
        ]
        fetchApi.mockResolvedValueOnce(mockData)

        const result = await api.executiveDashboard.getRecentActivities()

        expect(fetchApi).toHaveBeenCalledWith('/api/executive-dashboard/recent-activities')
        expect(result).toEqual(mockData)
      })
    })
  })

  describe('loanAnalyst', () => {
    describe('getLoans', () => {
      it('should call fetchApi with correct endpoint', async () => {
        const mockData = [
          { id: '1', loanNumber: 'LN001', borrowerName: 'John', amount: 10000, status: 'Approved', applicationDate: '2024-01-01T10:00:00Z' }
        ]
        fetchApi.mockResolvedValueOnce(mockData)

        const result = await api.loanAnalyst.getLoans()

        expect(fetchApi).toHaveBeenCalledWith('/api/loan-analyst/loans')
        expect(result).toEqual(mockData)
      })
    })

    describe('getLoanById', () => {
      it('should call fetchApi with correct endpoint', async () => {
        const mockData = { id: '1', loanNumber: 'LN001', borrowerName: 'John', amount: 10000, status: 'Approved', applicationDate: '2024-01-01T10:00:00Z' }
        fetchApi.mockResolvedValueOnce(mockData)

        const result = await api.loanAnalyst.getLoanById('1')

        expect(fetchApi).toHaveBeenCalledWith('/api/loan-analyst/loans/1')
        expect(result).toEqual(mockData)
      })
    })
  })

  describe('operationalDashboard', () => {
    describe('getSummary', () => {
      it('should call fetchApi with correct endpoint', async () => {
        const mockData = { totalOperations: 150, totalUsers: 75, activeSessions: 12, systemUptime: '5 days, 3 hours' }
        fetchApi.mockResolvedValueOnce(mockData)

        const result = await api.operationalDashboard.getSummary()

        expect(fetchApi).toHaveBeenCalledWith('/api/operational-dashboard/summary')
        expect(result).toEqual(mockData)
      })
    })

    describe('getRecentOperations', () => {
      it('should call fetchApi with correct endpoint', async () => {
        const mockData = [
          { id: '1', type: 'Login', description: 'Test', timestamp: '2024-01-01T10:00:00Z', userId: 'user123', status: 'Success' }
        ]
        fetchApi.mockResolvedValueOnce(mockData)

        const result = await api.operationalDashboard.getRecentOperations()

        expect(fetchApi).toHaveBeenCalledWith('/api/operational-dashboard/recent-operations')
        expect(result).toEqual(mockData)
      })
    })
  })

  describe('qcReviewer', () => {
    describe('getCaseDetail', () => {
      it('should call fetchApi with correct endpoint', async () => {
        const mockData = { id: '1', caseNumber: 'C001', title: 'Test Case', description: 'Test', status: 'Open', priority: 'High', submittedBy: 'John', submittedAt: '2024-01-01T10:00:00Z' }
        fetchApi.mockResolvedValueOnce(mockData)

        const result = await api.qcReviewer.getCaseDetail('1')

        expect(fetchApi).toHaveBeenCalledWith('/api/qc-reviewer/cases/1')
        expect(result).toEqual(mockData)
      })
    })

    describe('getQueue', () => {
      it('should call fetchApi with correct endpoint', async () => {
        const mockData = [
          { id: '1', itemType: 'Loan', itemId: 'LN001', submittedBy: 'John', submittedAt: '2024-01-01T10:00:00Z', priority: 'High', status: 'Pending' }
        ]
        fetchApi.mockResolvedValueOnce(mockData)

        const result = await api.qcReviewer.getQueue()

        expect(fetchApi).toHaveBeenCalledWith('/api/qc-reviewer/queue')
        expect(result).toEqual(mockData)
      })
    })
  })

  describe('remedySpecialist', () => {
    describe('getCaseDetail', () => {
      it('should call fetchApi with correct endpoint', async () => {
        const mockData = { id: '1', caseNumber: 'C001', title: 'Test Case', description: 'Test', status: 'Open', priority: 'High', submittedBy: 'John', submittedAt: '2024-01-01T10:00:00Z' }
        fetchApi.mockResolvedValueOnce(mockData)

        const result = await api.remedySpecialist.getCaseDetail('1')

        expect(fetchApi).toHaveBeenCalledWith('/api/remedy-specialist/cases/1')
        expect(result).toEqual(mockData)
      })
    })

    describe('getCaseList', () => {
      it('should call fetchApi with correct endpoint', async () => {
        const mockData = [
          { id: '1', caseNumber: 'C001', title: 'Test Case', status: 'Open', priority: 'High', submittedBy: 'John', submittedAt: '2024-01-01T10:00:00Z' }
        ]
        fetchApi.mockResolvedValueOnce(mockData)

        const result = await api.remedySpecialist.getCaseList()

        expect(fetchApi).toHaveBeenCalledWith('/api/remedy-specialist/cases')
        expect(result).toEqual(mockData)
      })
    })
  })

  describe('riskManager', () => {
    describe('getCounterpartyDetail', () => {
      it('should call fetchApi with correct endpoint', async () => {
        const mockData = { id: '1', counterpartyId: 'CP001', name: 'Test Counterparty', type: 'Bank', riskRating: 'Medium', exposure: 1000000, status: 'Active', contactPerson: 'John Doe', contactEmail: 'john@example.com', contactPhone: '123-456-7890', address: '123 Main St', city: 'Anytown', country: 'USA', industry: 'Finance', relationshipStartDate: '2023-01-01T00:00:00Z', lastReviewDate: '2024-01-01T00:00:00Z' }
        fetchApi.mockResolvedValueOnce(mockData)

        const result = await api.riskManager.getCounterpartyDetail('1')

        expect(fetchApi).toHaveBeenCalledWith('/api/risk-manager/counterparties/1')
        expect(result).toEqual(mockData)
      })
    })

    describe('getWatchlist', () => {
      it('should call fetchApi with correct endpoint', async () => {
        const mockData = [
          { id: '1', itemId: 'ITEM001', itemType: 'Stock', description: 'High volatility stock', riskLevel: 'High', status: 'Active', assignedTo: 'John Doe', createdAt: '2024-01-01T10:00:00Z', updatedAt: '2024-01-01T10:00:00Z' }
        ]
        fetchApi.mockResolvedValueOnce(mockData)

        const result = await api.riskManager.getWatchlist()

        expect(fetchApi).toHaveBeenCalledWith('/api/risk-manager/watchlist')
        expect(result).toEqual(mockData)
      })
    })
  })
})
```