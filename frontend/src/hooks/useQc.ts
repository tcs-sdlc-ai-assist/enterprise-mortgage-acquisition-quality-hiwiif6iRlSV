import { useState, useEffect } from 'react';
import { qcService } from '@/services/qcService';

interface CaseDetail {
  id: string;
  caseNumber: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  submittedBy: string;
  submittedAt: string;
  reviewedBy?: string;
  reviewedAt?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

interface QueueItem {
  id: string;
  itemType: string;
  itemId: string;
  submittedBy: string;
  submittedAt: string;
  priority: string;
  status: string;
}

export function useQc() {
  const [caseDetail, setCaseDetail] = useState<CaseDetail | null>(null);
  const [queue, setQueue] = useState<QueueItem[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getCaseDetail = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await qcService.getCaseDetail(id);
      setCaseDetail(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  const getQueue = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await qcService.getQueue();
      setQueue(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  return { caseDetail, queue, loading, error, getCaseDetail, getQueue };
}