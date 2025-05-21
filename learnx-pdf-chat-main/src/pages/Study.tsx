
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '@/components/Layout/MainLayout';
import PdfViewer from '@/components/Study/PdfViewer';
import ChatWindow from '@/components/Study/Chat/ChatWindow';
import { useDocumentsStore } from '@/state/documentsStore';
import { toast } from 'sonner';

const Study = () => {
  const { docId } = useParams<{ docId: string }>();
  const navigate = useNavigate();
  const { documents, fetchDocuments } = useDocumentsStore();
  const [document, setDocument] = useState(null);
  
  useEffect(() => {
    if (!docId) {
      navigate('/');
      return;
    }
    
    // If documents are not loaded yet, fetch them
    if (documents.length === 0) {
      fetchDocuments();
    } else {
      // Find the current document
      const currentDoc = documents.find(doc => doc.id === docId);
      
      if (!currentDoc) {
        toast.error('Document not found');
        navigate('/');
      } else {
        setDocument(currentDoc);
      }
    }
  }, [docId, documents, fetchDocuments, navigate]);
  
  if (!docId) return null;
  
  return (
    <MainLayout>
      <div className="flex flex-col h-[calc(100vh-140px)]">
        <div className="mb-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold truncate">
            {document?.title || 'Loading document...'}
          </h1>
          
          <button
            onClick={() => navigate('/')}
            className="text-sm text-gray-700 flex items-center hover:text-primary"
          >
            <svg 
              className="w-4 h-4 mr-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M10 19l-7-7m0 0l7-7m-7 7h18" 
              />
            </svg>
            Back to Dashboard
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
          <div className="bg-white rounded-lg border overflow-hidden">
            <PdfViewer documentId={docId} />
          </div>
          
          <div className="bg-white rounded-lg border overflow-hidden">
            <ChatWindow documentId={docId} />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Study;
