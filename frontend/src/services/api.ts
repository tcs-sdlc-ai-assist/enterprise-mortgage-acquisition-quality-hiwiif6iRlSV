import { fetchApi } from '@/utils/helpers'

export const api = {
  executiveDashboard: {
    getSummary: () => fetchApi<{ totalUsers: number; totalOrders: number; totalRevenue: number; growthRate: number }>('/api/executive-dashboard/summary'),
    getRecentActivities: () => fetchApi<{ id: string; type: string; description: string; timestamp: string; amount?: number }[]>('/api/executive-dashboard/recent-activities')
  },
  loanAnalyst: {
    getLoans: () => fetchApi<{ id: string; loanNumber: string; borrowerName: string; amount: number; status: string; applicationDate: string; decisionDate?: string; analystName?: string }[]>('/api/loan-analyst/loans'),
    getLoanById: (id: string) => fetchApi<{ id: string; loanNumber: string; borrowerName: string; amount: number; status: string; applicationDate: string; decisionDate?: string; analystName?: string; purpose?: string; termMonths?: number; interestRate?: number; monthlyPayment?: number; createdAt: string; updatedAt: string }>(`/api/loan-analyst/loans/${id}`)
  },
  operationalDashboard: {
    getSummary: () => fetchApi<{ totalOperations: number; totalUsers: number; activeSessions: number; systemUptime: string }>('/api/operational-dashboard/summary'),
    getRecentOperations: () => fetchApi<{ id: string; type: string; description: string; timestamp: string; userId: string; status: string }[]>('/api/operational-dashboard/recent-operations')
  },
  qcReviewer: {
    getCaseDetail: (id: string) => fetchApi<{ id: string; caseNumber: string; title: string; description: string; status: string; priority: string; submittedBy: string; submittedAt: string; reviewedBy?: string; reviewedAt?: string; notes?: string; createdAt: string; updatedAt: string }>(`/api/qc-reviewer/cases/${id}`),
    getQueue: () => fetchApi<{ id: string; itemType: string; itemId: string; submittedBy: string; submittedAt: string; priority: string; status: string }[]>('/api/qc-reviewer/queue')
  },
  remedySpecialist: {
    getCaseDetail: (id: string) => fetchApi<{ id: string; caseNumber: string; title: string; description: string; status: string; priority: string; submittedBy: string; submittedAt: string; reviewedBy?: string; reviewedAt?: string; notes?: string; createdAt: string; updatedAt: string }>(`/api/remedy-specialist/cases/${id}`),
    getCaseList: () => fetchApi<{ id: string; caseNumber: string; title: string; status: string; priority: string; submittedBy: string; submittedAt: string }[]>('/api/remedy-specialist/cases')
  },
  riskManager: {
    getCounterpartyDetail: (id: string) => fetchApi<{ id: string; counterpartyId: string; name: string; type: string; riskRating: string; exposure: number; status: string; contactPerson: string; contactEmail: string; contactPhone: string; address: string; city: string; country: string; industry: string; relationshipStartDate: string; lastReviewDate: string; notes?: string; createdAt: string; updatedAt: string }>(`/api/risk-manager/counterparties/${id}`),
    getWatchlist: () => fetchApi<{ id: string; itemId: string; itemType: string; description: string; riskLevel: string; status: string; assignedTo: string; createdAt: string; updatedAt: string }[]>('/api/risk-manager/watchlist')
  }
}