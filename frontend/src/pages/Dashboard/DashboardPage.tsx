import { useEffect, useState } from 'react';
import { Container, Heading } from '@chakra-ui/react';
import DragDropUpload from '../../components/Dashboard/DragDropUpload';
import DocumentList, { DashboardDocument } from '../../components/Dashboard/DocumentList';
import { fetchDocuments } from '../../services/documents';

const DashboardPage = () => {
  const [documents, setDocuments] = useState<DashboardDocument[]>([]);

  useEffect(() => {
    // TODO: handle loading state and errors
    fetchDocuments().then(setDocuments).catch(() => {});
  }, []);

  return (
    <Container maxW="container.lg" py={8}>
      <Heading size="lg" mb={4}>Your Documents</Heading>
      <DragDropUpload />
      <DocumentList documents={documents} />
    </Container>
  );
};

export default DashboardPage;
