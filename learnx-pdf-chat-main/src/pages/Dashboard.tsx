
import { useEffect } from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import UploadArea from '@/components/Dashboard/UploadArea';
import DocCard from '@/components/Dashboard/DocCard';
import { useDocumentsStore } from '@/state/documentsStore';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { documents, fetchDocuments, isLoading } = useDocumentsStore();
  const navigate = useNavigate();
  
  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">My Documents</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <UploadArea />
          </div>
          
          <div className="md:col-span-2 space-y-4">
            {isLoading && documents.length === 0 ? (
              <div className="flex items-center justify-center h-64 bg-white rounded-lg border">
                <div className="text-center">
                  <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
                  <p className="mt-4 text-sm text-gray-500">Loading documents...</p>
                </div>
              </div>
            ) : documents.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 bg-white rounded-lg border">
                <svg
                  className="w-12 h-12 text-gray-400 mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                  />
                </svg>
                <h3 className="text-lg font-medium text-gray-900">No documents yet</h3>
                <p className="text-sm text-gray-500 text-center mt-1">
                  Upload your first PDF document to get started
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {documents.map((doc) => (
                  <DocCard key={doc.id} document={doc} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
