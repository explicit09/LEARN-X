import { VStack, Button, Box } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

export interface DashboardDocument {
  id: number;
  title: string;
}

interface DocumentListProps {
  documents: DashboardDocument[];
}

const DocumentList = ({ documents }: DocumentListProps) => {
  return (
    <VStack align="stretch" spacing={2} mt={4}>
      {documents.map((doc) => (
        <Button
          key={doc.id}
          as={RouterLink}
          to={`/study/${doc.id}`}
          variant="ghost"
          justifyContent="flex-start"
        >
          {doc.title}
        </Button>
      ))}
      {documents.length === 0 && (
        <Box color="gray.500" textAlign="center">No documents yet</Box>
      )}
    </VStack>
  );
};

export default DocumentList;
