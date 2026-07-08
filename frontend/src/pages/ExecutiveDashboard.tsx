"use client";
import { useEffect, useState } from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import Footer from '@/components/layout/Footer';
import { fetchApi, formatDate } from '@/utils/helpers';

interface SummaryData {
  totalUsers: number;
  totalOrders: number;
  totalRevenue: number;
  growthRate: number;
}

interface RecentActivity {
  id: string;
  type: string;
  description: string;
  timestamp: string;
  amount?: number;
}

const ExecutiveDashboard: React.FC = () => {
  const [summary, setSummary] = useState<SummaryData | null>(null);
  const [activities, setActivities] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [summaryRes, activitiesRes] = await Promise.all([
          fetchApi<SummaryData>('/api/executive-dashboard/summary'),
          fetchApi<RecentActivity[]>('/api/executive-dashboard/recent-activities')
        ]);
        setSummary(summaryRes);
        setActivities(activitiesRes);
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
          <p className="mt-4">Loading dashboard...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="container flex-1 p-6">
        <div className="alert alert-error">
          <p>Error loading dashboard: {error}</p>
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
            <h1 className="mb-4 text-2xl font-bold">Executive Dashboard</h1>
            
            {/* Summary Section */}
            <div>
              <h2 className="mb-4 text-xl font-bold">Summary</h2>
              <div className="space-y-4">
                {/* Total Users */}
                <div className="card">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Total Users</p>
                      <p className="text-2xl font-bold">{summary?.totalUsers}</p>
                    </div>
                  </div>
                </div>
                
                {/* Total Orders */}
                <div className="mt-4 card">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Total Orders</p>
                      <p className="text-2xl font-bold">{summary?.totalOrders}</p>
                    </div>
                  </div>
                </div>
                
                {/* Total Revenue */}
                <div className="mt-4 card">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Total Revenue</p>
                      <p className="text-2xl font-bold">${summary?.totalRevenue?.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
                
                {/* Growth Rate */}
                <div className="mt-4 card">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Growth Rate</p>
                      <p className="text-2xl font-bold">{summary?.growthRate}%</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Recent Activities Section */}
            <div>
              <h2 className="mb-4 text-xl font-bold">Recent Activities</h2>
              <div className="card">
                {activities.length > 0 ? (
                  <table className="table">
                    <thead>
                      <tr>
                        <th className="text-left">Time</th>
                        <th className="text-left">Type</th>
                        <th className="text-left">Description</th>
                        <th className="text-right">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {activities.map(activity => (
                        <tr key={activity.id}>
                          <td>{formatDate(activity.timestamp)}</td>
                          <td>{activity.type}</td>
                          <td>{activity.description}</td>
                          <td className="text-right">
                            {activity.amount !== undefined ? `$${activity.amount.toFixed(2)}` : '-'}
                          </td>
                        >
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p className="text-center py-4">No recent activities</p>
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

export default ExecutiveDashboard;