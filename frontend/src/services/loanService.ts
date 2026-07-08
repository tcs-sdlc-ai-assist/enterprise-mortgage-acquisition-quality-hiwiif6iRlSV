import { fetchApi } from '@/utils/helpers'

interface LoanBase {
  id: string
  loanNumber: string
  borrowerName: string
  amount: number
  status: string
  applicationDate: string
  decisionDate?: string
  analystName?: string
}

interface LoanListItem extends LoanBase {}
interface LoanDetail extends LoanBase {
  purpose?: string
  termMonths?: number
  interestRate?: number
  monthlyPayment?: number
  createdAt: string
  updatedAt: string
}

export const loanService = {
  getLoans: () => fetchApi<LoanListItem[]>('/api/loan-analyst/loans'),
  getLoanById: (id: string) => fetchApi<LoanDetail>(`/api/loan-analyst/loans/${id}`)
}
```