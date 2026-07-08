import { useEffect, useState } from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import Footer from '@/components/layout/Footer';
import { fetchApi } from '@/utils/helpers';

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

const Watchlist: React.FC = () => {
  const [items, setItems] = useState<WatchlistItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWatchlist = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchApi<WatchlistItem[]>('/api/risk-manager/watchlist');
        setItems(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchWatchlist();
  }, []);

  if (loading) {
    return (
      <main className="container flex-1 p-6">
        <div className="flex flex-col items-center justify-center h-full">
          <div className="spinner" />
          <p className="mt-4">Loading watchlist...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="container flex-1 p-6">
        <div className="alert alert-error">
          <p>Error loading watchlist: {error}</p>
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
            <h1 className="mb-4 text-2xl font-bold">Risk Manager Watchlist</h1>
            
            <div className="card">
              <h2 className="mb-4 text-xl font-bold">Watchlist Items</h2>
              {items.length > 0 ? (
                <table className="table">
                  <thead>
                    <tr>
                      <th className="text-left">Item ID</th>
                      <th className="text-left">Type</th>
                      <th className="text-left">Description</th>
                      <th className="text-left">Risk Level</th>
                      <th className="text-left">Status</th>
                      <th className="text-left">Assigned To</th>
                      <th className="text-left">Created At</th>
                      <th className="text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map(item => (
                      <tr key={item.id}>
                        <td>{item.itemId}</td>
                        <td>{item.itemType}</td>
                        <td>{item.description}</td>
                        <td>
                          <span className={`risk-badge ${item.riskLevel.toLowerCase()}`}>
                            {item.riskLevel}
                          </span>
                        </td>
                        <td>
                          <span className={`status-badge ${item.status.toLowerCase()}`}>
                            {item.status}
                          </span>
                        </td>
                        <td>{item.assignedTo}</td>
                        <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                        <td className="text-center">
                          <button className="btn btn-primary btn-sm">
                            View Details
                          </button>
                        </td>
                      >
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-center py-4">No items in watchlist</p>
              )}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Watchlist;
```