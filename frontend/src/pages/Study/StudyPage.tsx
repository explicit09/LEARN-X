import { useState, useEffect } from 'react';
import {
  Box, 
  Button, 
  Container,
  Heading, 
  Text, 
  VStack,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Input
} from '@chakra-ui/react';
import { SplitScreenLayout } from '../../components/Layout';
import { PDFViewer } from '../../components/DocumentViewer';
import { ChatInterface } from '../../components/Chat';
import { useParams } from 'react-router-dom';

const StudyPage = () => {
  const [documentUrl, setDocumentUrl] = useState<string>('');
  const [hasDocument, setHasDocument] = useState<boolean>(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { docId } = useParams<{ docId?: string }>();

  useEffect(() => {
    if (docId) {
      setDocumentUrl(`/api/v1/documents/${docId}/download`);
      setHasDocument(true);
    }
  }, [docId]);

  // For demo purposes, we'll use a sample PDF URL when the user clicks "Load Sample"
  const handleLoadSample = () => {
    setDocumentUrl('https://arxiv.org/pdf/2307.09288.pdf');
    setHasDocument(true);
    onClose();
  };

  const handleSubmitUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (documentUrl) {
      setHasDocument(true);
      onClose();
    }
  };

  // Document upload modal content
  const documentPrompt = (
    <Container centerContent maxW="container.md" py={10}>
      <VStack spacing={8}>
        <Heading as="h1" size="xl">Start Studying</Heading>
        <Text>Upload a document or enter a PDF URL to begin</Text>
        <Button colorScheme="teal" onClick={onOpen} size="lg">
          Upload Document
        </Button>
      </VStack>
      
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Load Document</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack spacing={4} mb={4}>
              <form onSubmit={handleSubmitUrl} style={{ width: '100%' }}>
                <VStack spacing={4}>
                  <Input 
                    placeholder="Enter PDF URL" 
                    value={documentUrl}
                    onChange={(e) => setDocumentUrl(e.target.value)}
                  />
                  <Button type="submit" colorScheme="blue" width="full">
                    Load from URL
                  </Button>
                </VStack>
              </form>
              
              <Text textAlign="center" fontSize="sm">or</Text>
              
              <Button 
                colorScheme="teal" 
                width="full"
                onClick={handleLoadSample}
              >
                Load Sample Document
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Container>
  );

  // If no document is loaded yet, show the document prompt
  if (!hasDocument) {
    return documentPrompt;
  }

  // Split screen layout with document viewer and chat interface
  return (
    <Box h="100vh">
      <SplitScreenLayout
        leftContent={<PDFViewer fileUrl={documentUrl} />}
        rightContent={<ChatInterface />}
        initialLeftSize={60}
      />
    </Box>
  );
};

export default StudyPage;
