import { fetchApi } from '@/utils/helpers'

interface Counterparty {
  id: string
  counterpartyId: string
  name: string
  type: string
  riskRating: string
  exposure: number
  status: string
  contactPerson: string
  contactEmail: string
  contactPhone: string
  address: string
  city: string
  country: string
  industry: string
  relationshipStartDate: string
  lastReviewDate: string
  notes?: string
  createdAt: string
  updatedAt: string
}

interface WatchlistItem {
  id: string
  itemId: string
  itemType: string
  description: string
  riskLevel: string
  status: string
  assignedTo: string
  createdAt: string
  updatedAt: string
}

export const riskService = {
  getCounterpartyDetail: (id: string) => fetchApi<Counterparty>(`/api/risk-manager/counterparties/${id}`),
  getWatchlist: () => fetchApi<WatchlistItem[]>('/api/risk-manager/watchlist')
}