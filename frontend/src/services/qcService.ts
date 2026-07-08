import { fetchApi } from '@/utils/helpers'

interface CaseDetail {
  id: string
  caseNumber: string
  title: string
  description: string
  status: string
  priority: string
  submittedBy: string
  submittedAt: string
  reviewedBy?: string
  reviewedAt?: string
  notes?: string
  createdAt: string
  updatedAt: string
}

interface QueueItem {
  id: string
  itemType: string
  itemId: string
  submittedBy: string
  submittedAt: string
  priority: string
  status: string
}

export const qcService = {
  getCaseDetail: (id: string) => fetchApi<CaseDetail>(`/api/qc-reviewer/cases/${id}`),
  getQueue: () => fetchApi<QueueItem[]>('/api/qc-reviewer/queue')
}