"use client";
import { useEffect, useState } from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import Footer from '@/components/layout/Footer';
import { fetchApi } from '@/utils/helpers';

interface Loan {
  id: string;
  loanNumber: string;
  borrowerName: string;
  amount: number;
  status: string;
  applicationDate: string;
  decisionDate?: string;
  analystName?: string;
}

const LoanList: React.FC = () => {
  const [loans, setLoans] = useState<Loan[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLoans = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchApi<Loan[]>('/api/loan-analyst/loans');
        setLoans(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchLoans();
  }, []);

  if (loading) {
    return (
      <main className="container flex-1 p-6">
        <div className="flex flex-col items-center justify-center h-full">
          <div className="spinner" />
          <p className="mt-4">Loading loans...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="container flex-1 p-6">
        <div className="alert alert-error">
          <p>Error loading loans: {error}</p>
        </div>
      </main>
    );
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6">
          <div className="space-y-6">
            <h1 className="mb-4 text-2xl font-bold">Loan Analyst - Loan List</h1>
            
            <div className="card">
              <h2 className="mb-4 text-xl font-bold">Loans</h2>
              {loans.length > 0 ? (
                <table className="table">
                  <thead>
                    <tr>
                      <th className="text-left">Loan Number</th>
                      <th className="text-left">Borrower</th>
                      <th className="text-right">Amount</th>
                      <th className="text-left">Status</th>
                      <th className="text-left">Application Date</th>
                      <th className="text-left">Decision Date</th>
                      <th className="text-left">Analyst</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loans.map(loan => (
                      <tr key={loan.id}>
                        <td>{loan.loanNumber}</td>
                        <td>{loan.borrowerName}</td>
                        <td className="text-right">${loan.amount.toFixed(2)}</td>
                        <td>
                          <span className={`status-badge ${loan.status.toLowerCase()}`}>
                            {loan.status}
                          </span>
                        </td>
                        <td>{new Date(loan.applicationDate).toLocaleDateString()}</td>
                        <td>
                          {loan.decisionDate ? (
                            new Date(loan.decisionDate).toLocaleDateString()
                          ) : (
                            '-'
                          )}
                        </td>
                        <td>{loan.analystName || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-center py-4">No loans found</p>
              )}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default LoanList;
</file_to_generate>