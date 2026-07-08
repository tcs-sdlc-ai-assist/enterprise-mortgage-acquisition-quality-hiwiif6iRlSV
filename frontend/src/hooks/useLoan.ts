import { useState } from 'react';
import { loanService } from '@/services/loanService';

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

interface LoanDetail extends Loan {
  purpose?: string;
  termMonths?: number;
  interestRate?: number;
  monthlyPayment?: number;
  createdAt: string;
  updatedAt: string;
}

export function useLoan() {
  const [loans, setLoans] = useState<Loan[] | null>(null);
  const [loan, setLoan] = useState<LoanDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getLoans = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await loanService.getLoans();
      setLoans(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  const getLoanById = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await loanService.getLoanById(id);
      setLoan(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  return { loans, loan, loading, error, getLoans, getLoanById };
}