import { Box, Button, Container, Flex, Heading, Text, Link as ChakraLink, VStack } from '@chakra-ui/react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import { useState } from 'react'

import { LoginPage, RegisterPage } from './pages/Auth'

// Import our components
import { SplitScreenLayout } from './components/Layout'
import { PDFViewer } from './components/DocumentViewer'
import { ChatInterface } from './components/Chat'

const StudyPage = () => {
  const [documentUrl, setDocumentUrl] = useState('');
  const [hasDocument, setHasDocument] = useState(false);
  
  // For demo purposes, load a sample PDF
  const handleLoadSample = () => {
    setDocumentUrl('https://arxiv.org/pdf/2307.09288.pdf');
    setHasDocument(true);
  };
  
  // If no document is loaded yet, show the document prompt
  if (!hasDocument) {
    return (
      <Container centerContent maxW="container.md" py={10}>
        <VStack spacing={8}>
          <Heading as="h1" size="xl">Start Studying</Heading>
          <Text>Load a sample document to begin</Text>
          <Button colorScheme="teal" onClick={handleLoadSample} size="lg">
            Load Sample Document
          </Button>
        </VStack>
      </Container>
    );
  }
  
  // Split screen layout with document viewer and chat interface
  return (
    <Box h="calc(100vh - 60px)">
      <SplitScreenLayout
        leftContent={<PDFViewer fileUrl={documentUrl} />}
        rightContent={<ChatInterface />}
        initialLeftSize={60}
      />
    </Box>
  );
};

// Home component
const Home = () => {
  return (
    <Container maxW="container.xl" py={8}>
      <Box textAlign="center" py={10} px={6}>
        <Heading
          display="inline-block"
          as="h1"
          size="2xl"
          bgGradient="linear(to-r, teal.400, teal.600)"
          backgroundClip="text"
        >
          LEARN-X
        </Heading>
        <Text fontSize="lg" mt={6} mb={2}>
          Your AI-powered learning assistant
        </Text>
        <Text color={'gray.500'} mb={6}>
          Upload PDFs and interact with your study materials through AI-assisted learning
        </Text>
        <Button
          as={Link}
          to="/study"
          colorScheme="teal"
          size="lg"
          mt={8}
        >
          Start Learning
        </Button>
      </Box>
    </Container>
  )
}

// Navigation component
const Navigation = () => {
  const location = useLocation();
  
  return (
    <Flex 
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1rem"
      bg="teal.500"
      color="white"
    >
      <Flex align="center" mr={5}>
        <ChakraLink as={Link} to="/">
          <Heading as="h1" size="lg" letterSpacing="tight">
            LEARN-X
          </Heading>
        </ChakraLink>
      </Flex>

      <Box display={{ base: 'block', md: 'flex' }}>
        <ChakraLink as={Link} to="/study">
          <Button
            variant={location.pathname === '/study' ? 'solid' : 'ghost'}
            mr={3}
            _hover={{ bg: 'teal.700' }}
          >
            Study
          </Button>
        </ChakraLink>
        <ChakraLink as={Link} to="/login">
          <Button
            variant={location.pathname === '/login' ? 'solid' : 'ghost'}
            mr={3}
            _hover={{ bg: 'teal.700' }}
          >
            Login
          </Button>
        </ChakraLink>
        <ChakraLink as={Link} to="/register">
          <Button
            variant={location.pathname === '/register' ? 'solid' : 'ghost'}
            _hover={{ bg: 'teal.700' }}
          >
            Register
          </Button>
        </ChakraLink>
      </Box>
    </Flex>
  )
}

// Main App
function App() {
  return (
    <Box>
      <Navigation />
      <Box pt={2} px={2}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/study" element={<StudyPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </Box>
    </Box>
  )
}

export default App
