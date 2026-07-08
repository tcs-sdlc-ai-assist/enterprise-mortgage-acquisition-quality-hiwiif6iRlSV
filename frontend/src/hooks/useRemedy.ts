interface CaseListItem {
  id: string;
  caseNumber: string;
  title: string;
  status: string;
  priority: string;
  submittedBy: string;
  submittedAt: string;
}

interface CaseDetail extends CaseListItem {
  description: string;
  reviewedBy?: string;
  reviewedAt?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

import { useState } from 'react';
import { remedyService } from '@/services/remedyService';

export function useRemedy() {
  const [cases, setCases] = useState<CaseListItem[] | null>(null);
  const [caseDetail, setCaseDetail] = useState<CaseDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getCases = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await remedyService.getCaseList();
      setCases(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  const getCaseById = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await remedyService.getCaseDetail(id);
      setCaseDetail(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  return { cases, caseDetail, loading, error, getCases, getCaseById };
}