import { useEffect, useState } from 'react';
import { Box, Button, Heading, Text } from '@chakra-ui/react';
import DragDropUpload from '../../components/Dashboard/DragDropUpload';
import DocCard from '../../components/Dashboard/DocCard';
import DocCardSkeleton from '../../components/Dashboard/DocCardSkeleton';
import EmptyState from '../../components/Dashboard/EmptyState';
import { DocumentAddIcon } from '@heroicons/react/outline';
import { fetchDocuments } from '../../services/documents';

interface Document {
  id: string;
  name: string;
  lastOpened: string;
  progress?: number;
}

const DashboardPage = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);

  // This function will be passed to DragDropUpload to set its internal input ref
  // However, DragDropUpload itself doesn't expose its input ref directly.
  // A more robust way is to have DragDropUpload itself manage the click,
  // or pass a ref to the Box that *contains* the input and find it.
  // For now, the EmptyState and the Button above the fold will use a querySelector.

  const triggerUploadFunction = () => {
    // Attempt to find the specific input within DragDropUpload.
    // This assumes DragDropUpload renders an <input type="file">
    // It's generally better if DragDropUpload exposes a method or takes a ref.
    const fileInput = document.querySelector<HTMLInputElement>('input[type="file"][accept="application/pdf"]');
    fileInput?.click();
  };

  const loadDocuments = () => {
    setLoading(true);
    fetchDocuments()
      .then(apiDocs => {
        const displayDocs = apiDocs.map(doc => ({
          id: doc.id.toString(),
          name: doc.title || 'Untitled Document',
          lastOpened: "2 days ago", // Placeholder
          progress: Math.floor(Math.random() * 100), // Placeholder
        }));
        setDocuments(displayDocs);
      })
      .catch(() => {
        console.error("Failed to load documents");
        // Optionally set documents to an empty array or handle error state
        setDocuments([]); 
      })
      .finally(() => setLoading(false)); // Set loading to false after fetch completes
  };

  useEffect(() => {
    loadDocuments();
  }, []);

  return (
    // Using Box with Tailwind classes for max-w-7xl and centering
    <Box className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      {/* Above the Fold Content */}
      <Box className="text-center mb-12">
        <Heading as="h1" className="text-4xl font-bold text-primary mb-3">
          Welcome back, User
        </Heading>
        <Text className="text-lg text-gray-600 mb-6">
          Manage your documents and start new study sessions.
        </Text>
        <Button
          colorScheme="teal" // Corresponds to 'primary' color in Tailwind config
          size="lg"
          onClick={() => document.querySelector<HTMLInputElement>('input[type="file"]')?.click()} // Trigger file input
          className="bg-primary hover:bg-teal-700 text-white" // Tailwind classes for primary button
        >
          Upload your first PDF
        </Button>
      </Box>

      {/* DragDropUpload - might need more styling later */}
      <Box className="mb-12">
        <DragDropUpload onUpload={loadDocuments} />
      </Box>

      {/* Document List Title (Temporary, will be part of grid section) */}
      <Heading as="h2" className="text-2xl font-semibold text-gray-800 mb-6 text-left">
        {loading ? 'Loading Documents...' : 'Your Recent Documents'}
      </Heading>
      
      {/* Document Grid or Skeleton Loaders */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {loading ? (
          // Render 8 skeleton loaders, or adjust number as preferred
          Array.from({ length: 8 }).map((_, index) => (
            <DocCardSkeleton key={index} />
          ))
        ) : (
          documents.map((doc) => (
            <DocCard
              key={doc.id}
              title={doc.name}
              lastOpened={doc.lastOpened}
              progress={doc.progress}
            />
          ))
        )}
        {!loading && documents.length === 0 && (
          <div className="col-span-full"> {/* Ensure EmptyState can span full width */}
            <EmptyState 
              onUploadClick={triggerUploadFunction}
              iconElement={<DocumentAddIcon className="w-32 h-32 text-accent" />}
              headline="Unlock AI Tutoring for Your Courses"
              subtext="Drop a syllabus or any PDF to get started."
              buttonText="Upload Your First PDF"
            />
          </div>
        )}
      </div>
    </Box>
  );
};

export default DashboardPage;
