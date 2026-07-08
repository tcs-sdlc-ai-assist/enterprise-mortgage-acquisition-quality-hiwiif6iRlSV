import { useEffect, useState } from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import Footer from '@/components/layout/Footer';
import { fetchApi, formatDate } from '@/utils/helpers';

interface QueueItem {
  id: string;
  itemType: string;
  itemId: string;
  submittedBy: string;
  submittedAt: string;
  priority: string;
  status: string;
}

const Queue: React.FC = () => {
  const [items, setItems] = useState<QueueItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQueue = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchApi<QueueItem[]>('/api/qc-reviewer/queue');
        setItems(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchQueue();
  }, []);

  if (loading) {
    return (
      <main className="container flex-1 p-6">
        <div className="flex flex-col items-center justify-center h-full">
          <div className="spinner" />
          <p className="mt-4">Loading QC queue...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="container flex-1 p-6">
        <div className="alert alert-error">
          <p>Error loading QC queue: {error}</p>
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
            <h1 className="mb-4 text-2xl font-bold">QC Reviewer Queue</h1>
            
            <div className="card">
              <h2 className="mb-4 text-xl font-bold">Items in Queue</h2>
              {items.length > 0 ? (
                <table className="table">
                  <thead>
                    <tr>
                      <th className="text-left">Item ID</th>
                      <th className="text-left">Type</th>
                      <th className="text-left">Submitted By</th>
                      <th className="text-left">Submitted At</th>
                      <th className="text-left">Priority</th>
                      <th className="text-left">Status</th>
                      <th className="text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map(item => (
                      <tr key={item.id}>
                        <td>{item.itemId}</td>
                        <td>{item.itemType}</td>
                        <td>{item.submittedBy}</td>
                        <td>{formatDate(item.submittedAt)}</td>
                        <td>
                          <span className={`priority-badge ${item.priority.toLowerCase()}`}>
                            {item.priority}
                          </span>
                        </td>
                        <td>
                          <span className={`status-badge ${item.status.toLowerCase()}`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="text-center">
                          <button className="btn btn-primary btn-sm">
                            Review
                          </button>
                        </td>
                      >
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-center py-4">No items in queue</p>
              )}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Queue;
</file_to_generate>