"use client";
import { useEffect, useState } from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import Footer from '@/components/layout/Footer';
import { fetchApi, formatDate } from '@/utils/helpers';

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

const CaseDetail: React.FC = () => {
  const [caseDetail, setCaseDetail] = useState<CaseDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCaseDetail = async () => {
      setLoading(true);
      setError(null);
      try {
        // In a real app, we would get the case ID from route params
        // For now, we'll use a placeholder ID
        const data = await fetchApi<CaseDetail>('/api/qc-reviewer/cases/placeholder');
        setCaseDetail(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchCaseDetail();
  }, []);

  if (loading) {
    return (
      <main className="container flex-1 p-6">
        <div className="flex flex-col items-center justify-center h-full">
          <div className="spinner" />
          <p className="mt-4">Loading case details...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="container flex-1 p-6">
        <div className="alert alert-error">
          <p>Error loading case details: {error}</p>
        </div>
      </main>
    );
  }

  if (!caseDetail) {
    return (
      <main className="container flex-1 p-6">
        <div className="alert alert-error">
          <p>Case not found</p>
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
              <h1 className="mb-4 text-2xl font-bold">Case Details</h1>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Case Number</p>
                    <p className="text-lg font-medium">{caseDetail.caseNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Title</p>
                    <p className="text-lg font-medium">{caseDetail.title}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Status</p>
                    <p className={`text-lg font-medium status-badge ${caseDetail.status.toLowerCase()}`}>
                      {caseDetail.status}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Priority</p>
                    <p className={`text-lg font-medium priority-badge ${caseDetail.priority.toLowerCase()}`}>
                      {caseDetail.priority}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Submitted By</p>
                    <p className="text-lg font-medium">{caseDetail.submittedBy}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Submitted At</p>
                    <p className="text-lg font-medium">{formatDate(caseDetail.submittedAt)}</p>
                  </div>
                  {caseDetail.reviewedBy && (
                    <div>
                      <p className="text-sm font-medium text-gray-500">Reviewed By</p>
                      <p className="text-lg font-medium">{caseDetail.reviewedBy}</p>
                    </div>
                  )}
                  {caseDetail.reviewedAt && (
                    <div>
                      <p className="text-sm font-medium text-gray-500">Reviewed At</p>
                      <p className="text-lg font-medium">{formatDate(caseDetail.reviewedAt)}</p>
                    </div>
                  )}
                </div>
                
                <div className="mt-6 pt-4 border-t">
                  <p className="text-sm font-medium text-gray-500 mb-2">Description</p>
                  <p className="text-gray-700">{caseDetail.description}</p>
                </div>
                
                {caseDetail.notes && (
                  <div className="mt-6 pt-4 border-t">
                    <p className="text-sm font-medium text-gray-500 mb-2">Notes</p>
                    <p className="text-gray-700">{caseDetail.notes}</p>
                  </div>
                )}
                
                <div className="mt-6 pt-4 border-t">
                  <p className="text-sm font-medium text-gray-500 mb-2">Timestamps</p>
                  <div className="space-y-2 text-sm text-gray-500">
                    <p>Created: {new Date(caseDetail.createdAt).toLocaleString()}</p>
                    <p>Updated: {new Date(caseDetail.updatedAt).toLocaleString()}</p>
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

export default CaseDetail;
</file_to_generate>