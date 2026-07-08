import { useEffect, useState } from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import Footer from '@/components/layout/Footer';
import { fetchApi } from '@/utils/helpers';

interface Case {
  id: string;
  caseNumber: string;
  title: string;
  status: string;
  priority: string;
  submittedBy: string;
  submittedAt: string;
}

const CaseList: React.FC = () => {
  const [cases, setCases] = useState<Case[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCases = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchApi<Case[]>('/api/remedy-specialist/cases');
        setCases(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchCases();
  }, []);

  if (loading) {
    return (
      <main className="container flex-1 p-6">
        <div className="flex flex-col items-center justify-center h-full">
          <div className="spinner" />
          <p className="mt-4">Loading cases...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="container flex-1 p-6">
        <div className="alert alert-error">
          <p>Error loading cases: {error}</p>
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
            <h1 className="mb-4 text-2xl font-bold">Remedy Specialist - Case List</h1>
            
            <div className="card">
              <h2 className="mb-4 text-xl font-bold">Cases</h2>
              {cases.length > 0 ? (
                <table className="table">
                  <thead>
                    <tr>
                      <th className="text-left">Case Number</th>
                      <th className="text-left">Title</th>
                      <th className="text-left">Status</th>
                      <th className="text-left">Priority</th>
                      <th className="text-left">Submitted By</th>
                      <th className="text-left">Submitted At</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cases.map(caseItem => (
                      <tr key={caseItem.id}>
                        <td>{caseItem.caseNumber}</td>
                        <td>{caseItem.title}</td>
                        <td>
                          <span className={`status-badge ${caseItem.status.toLowerCase()}`}>
                            {caseItem.status}
                          </span>
                        </td>
                        <td>
                          <span className={`priority-badge ${caseItem.priority.toLowerCase()}`}>
                            {caseItem.priority}
                          </span>
                        </td>
                        <td>{caseItem.submittedBy}</td>
                        <td>{new Date(caseItem.submittedAt).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-center py-4">No cases found</p>
              )}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default CaseList;