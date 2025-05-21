import { VStack, Button, Box } from '@chakra-ui/react';

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
        <Button key={doc.id} variant="ghost" justifyContent="flex-start">
          {/* TODO: link to open document viewer */}
          {doc.title}
        </Button>
      ))}
      {documents.length === 0 && (
        <Box color="gray.500" textAlign="center">
          {/* TODO: fetch documents from API */}
          No documents yet
        </Box>
      )}
    </VStack>
  );
};

export default DocumentList;
