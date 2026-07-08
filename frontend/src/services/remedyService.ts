import { fetchApi } from '@/utils/helpers'

interface CaseListItem {
  id: string
  caseNumber: string
  title: string
  status: string
  priority: string
  submittedBy: string
  submittedAt: string
}

interface CaseDetail extends CaseListItem {
  description: string
  reviewedBy?: string
  reviewedAt?: string
  notes?: string
  createdAt: string
  updatedAt: string
}

export const remedyService = {
  getCaseDetail: (id: string) => fetchApi<CaseDetail>(`/api/remedy-specialist/cases/${id}`),
  getCaseList: () => fetchApi<CaseListItem[]>('/api/remedy-specialist/cases')
}