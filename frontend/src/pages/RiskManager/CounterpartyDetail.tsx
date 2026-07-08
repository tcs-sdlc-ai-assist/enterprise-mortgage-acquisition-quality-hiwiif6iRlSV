import { useEffect, useState } from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import Footer from '@/components/layout/Footer';
import { fetchApi, formatDate } from '@/utils/helpers';

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

const CounterpartyDetail: React.FC = () => {
  const [counterparty, setCounterparty] = useState<Counterparty | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCounterparty = async () => {
      setLoading(true);
      setError(null);
      try {
        // In a real app, we would get the counterparty ID from route params
        // For now, we'll use a placeholder ID
        const data = await fetchApi<Counterparty>('/api/risk-manager/counterparties/placeholder');
        setCounterparty(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchCounterparty();
  }, []);

  if (loading) {
    return (
      <main className="container flex-1 p-6">
        <div className="flex flex-col items-center justify-center h-full">
          <div className="spinner" />
          <p className="mt-4">Loading counterparty details...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="container flex-1 p-6">
        <div className="alert alert-error">
          <p>Error loading counterparty details: {error}</p>
        </div>
      </main>
    );
  }

  if (!counterparty) {
    return (
      <main className="container flex-1 p-6">
        <div className="alert alert-error">
          <p>Counterparty not found</p>
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
            <div className="card">
              <h1 className="mb-4 text-2xl font-bold">Counterparty Details</h1>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Counterparty ID</p>
                    <p className="text-lg font-medium">{counterparty.counterpartyId}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Name</p>
                    <p className="text-lg font-medium">{counterparty.name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Type</p>
                    <p className="text-lg font-medium">{counterparty.type}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Risk Rating</p>
                    <p className={`text-lg font-medium risk-badge ${counterparty.riskRating.toLowerCase()}`}>
                      {counterparty.riskRating}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Exposure</p>
                    <p className="text-lg font-medium">${counterparty.exposure.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Status</p>
                    <p className={`text-lg font-medium status-badge ${counterparty.status.toLowerCase()}`}>
                      {counterparty.status}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Contact Person</p>
                    <p className="text-lg font-medium">{counterparty.contactPerson}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Contact Email</p>
                    <p className="text-lg font-medium">{counterparty.contactEmail}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Contact Phone</p>
                    <p className="text-lg font-medium">{counterparty.contactPhone}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Address</p>
                    <p className="text-lg font-medium">{counterparty.address}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">City</p>
                    <p className="text-lg font-medium">{counterparty.city}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Country</p>
                    <p className="text-lg font-medium">{counterparty.country}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Industry</p>
                    <p className="text-lg font-medium">{counterparty.industry}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Relationship Start Date</p>
                    <p className="text-lg font-medium">{formatDate(counterparty.relationshipStartDate)}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Last Review Date</p>
                    <p className="text-lg font-medium">{formatDate(counterparty.lastReviewDate)}</p>
                  </div>
                </div>
                
                {counterparty.notes && (
                  <div className="mt-6 pt-4 border-t">
                    <p className="text-sm font-medium text-gray-500 mb-2">Notes</p>
                    <p className="text-gray-700">{counterparty.notes}</p>
                  </div>
                )}
                
                <div className="mt-6 pt-4 border-t">
                  <p className="text-sm font-medium text-gray-500 mb-2">Timestamps</p>
                  <div className="space-y-2 text-sm text-gray-500">
                    <p>Created: {new Date(counterparty.createdAt).toLocaleString()}</p>
                    <p>Updated: {new Date(counterparty.updatedAt).toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default CounterpartyDetail;
```