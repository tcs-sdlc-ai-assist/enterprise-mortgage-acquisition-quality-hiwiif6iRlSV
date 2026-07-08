export const routes = {
  executiveDashboard: '/executive-dashboard',
  loanAnalyst: {
    loans: '/loan-analyst/loans',
    loanDetail: (id: string) => `/loan-analyst/loans/${id}`
  },
  operationalDashboard: '/operational-dashboard',
  qcReviewer: {
    caseDetail: (id: string) => `/qc-reviewer/cases/${id}`,
    queue: '/qc-reviewer/queue'
  },
  remedySpecialist: {
    caseList: '/remedy-specialist/cases',
    caseDetail: (id: string) => `/remedy-specialist/cases/${id}`
  },
  riskManager: {
    counterpartyDetail: (id: string) => `/risk-manager/counterparties/${id}`,
    watchlist: '/risk-manager/watchlist'
  }
};

export type RoutePaths = typeof routes;