
import { formatDistanceToNow } from 'date-fns';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Document } from '@/api/types';
import { useDocumentsStore } from '@/state/documentsStore';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

interface DocCardProps {
  document: Document;
}

const DocCard = ({ document }: DocCardProps) => {
  const navigate = useNavigate();
  const { removeDocument } = useDocumentsStore();
  
  // Convert bytes to MB with 2 decimal places
  const fileSizeMB = (document.file_size / 1024 / 1024).toFixed(2);
  
  // Format created_at as relative time
  const timeAgo = formatDistanceToNow(new Date(document.created_at), { 
    addSuffix: true 
  });
  
  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (confirm('Are you sure you want to delete this document?')) {
      try {
        await removeDocument(document.id);
        toast.success('Document deleted');
      } catch (error) {
        toast.error('Failed to delete document');
      }
    }
  };
  
  const handleStudy = () => {
    navigate(`/study/${document.id}`);
  };
  
  return (
    <Card 
      className="cursor-pointer transition-shadow hover:shadow-md"
      onClick={handleStudy}
    >
      <CardHeader className="p-4 pb-2">
        <div className="flex items-start justify-between">
          <div className="p-2 bg-primary/10 rounded-md">
            <svg 
              className="w-6 h-6 text-primary" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
              />
            </svg>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <h3 className="font-medium text-lg line-clamp-1">{document.title}</h3>
        <div className="flex justify-between text-sm text-gray-500 mt-2">
          <span>{fileSizeMB} MB</span>
          <span>{timeAgo}</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between">
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full"
          onClick={handleStudy}
        >
          Study Now
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-red-500 hover:text-red-700 hover:bg-red-50"
          onClick={handleDelete}
        >
          <svg 
            className="w-4 h-4" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
            />
          </svg>
          <span className="sr-only">Delete</span>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DocCard;
