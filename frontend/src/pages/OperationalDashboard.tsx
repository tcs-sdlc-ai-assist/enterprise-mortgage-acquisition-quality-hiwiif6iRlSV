"use client";
import { useEffect, useState } from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import Footer from '@/components/layout/Footer';
import { fetchApi, formatDate } from '@/utils/helpers';

interface OperationalSummary {
  totalOperations: number;
  totalUsers: number;
  activeSessions: number;
  systemUptime: string;
}

interface RecentOperation {
  id: string;
  type: string;
  description: string;
  timestamp: string;
  userId: string;
  status: string;
}

const OperationalDashboard: React.FC = () => {
  const [summary, setSummary] = useState<OperationalSummary | null>(null);
  const [operations, setOperations] = useState<RecentOperation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [summaryRes, operationsRes] = await Promise.all([
          fetchApi<OperationalSummary>('/api/operational-dashboard/summary'),
          fetchApi<RecentOperation[]>('/api/operational-dashboard/recent-operations')
        ]);
        setSummary(summaryRes);
        setOperations(operationsRes);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <main className="container flex-1 p-6">
        <div className="flex flex-col items-center justify-center h-full">
          <div className="spinner" />
          <p className="mt-4">Loading operational dashboard...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="container flex-1 p-6">
        <div className="alert alert-error">
          <p>Error loading operational dashboard: {error}</p>
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
            <h1 className="mb-4 text-2xl font-bold">Operational Dashboard</h1>
            
            {/* Summary Section */}
            <div>
              <h2 className="mb-4 text-xl font-bold">System Overview</h2>
              <div className="space-y-4">
                {/* Total Operations */}
                <div className="card">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Total Operations</p>
                      <p className="text-2xl font-bold">{summary?.totalOperations}</p>
                    </div>
                  </div>
                </div>
                
                {/* Total Users */}
                <div className="mt-4 card">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Total Users</p>
                      <p className="text-2xl font-bold">{summary?.totalUsers}</p>
                    </div>
                  </div>
                </div>
                
                {/* Active Sessions */}
                <div className="mt-4 card">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Active Sessions</p>
                      <p className="text-2xl font-bold">{summary?.activeSessions}</p>
                    </div>
                  </div>
                </div>
                
                {/* System Uptime */}
                <div className="mt-4 card">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">System Uptime</p>
                      <p className="text-2xl font-bold">{summary?.systemUptime}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Recent Operations Section */}
            <div>
              <h2 className="mb-4 text-xl font-bold">Recent Operations</h2>
              <div className="card">
                {operations.length > 0 ? (
                  <table className="table">
                    <thead>
                      <tr>
                        <th className="text-left">Time</th>
                        <th className="text-left">Type</th>
                        <th className="text-left">Description</th>
                        <th className="text-left">User</th>
                        <th className="text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {operations.map(op => (
                        <tr key={op.id}>
                          <td>{formatDate(op.timestamp)}</td>
                          <td>{op.type}</td>
                          <td>{op.description}</td>
                          <td>{op.userId}</td>
                          <td className="text-center">
                            <span className={`status-badge ${op.status.toLowerCase()}`}>
                              {op.status}
                            </span>
                          </td>
                        >
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p className="text-center py-4">No recent operations</p>
                )}
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default OperationalDashboard;
</file_to_generate>