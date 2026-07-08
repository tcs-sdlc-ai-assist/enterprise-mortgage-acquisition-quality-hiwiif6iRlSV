import { useState } from 'react';
import { riskService } from '@/services/riskService';

interface Counterparty {
  id: string;
  counterpartyId: string;
  name: string;
  type: string;
  riskRating: string;
  exposure: number;
  status: string;
  contactPerson: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  city: string;
  country: string;
  industry: string;
  relationshipStartDate: string;
  lastReviewDate: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

interface WatchlistItem {
  id: string;
  itemId: string;
  itemType: string;
  description: string;
  riskLevel: string;
  status: string;
  assignedTo: string;
  createdAt: string;
  updatedAt: string;
}

export function useRisk() {
  const [counterparty, setCounterparty] = useState<Counterparty | null>(null);
  const [watchlist, setWatchlist] = useState<WatchlistItem[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getCounterpartyDetail = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await riskService.getCounterpartyDetail(id);
      setCounterparty(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  const getWatchlist = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await riskService.getWatchlist();
      setWatchlist(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  return { counterparty, watchlist, loading, error, getCounterpartyDetail, getWatchlist };
}