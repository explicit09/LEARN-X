import { Box, Container, Flex, Heading, Text, Link as ChakraLink } from '@chakra-ui/react'; // Removed Button
import { Routes, Route, Link, useLocation } from 'react-router-dom';

import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header'; // Import Header
import { LoginPage, RegisterPage } from './pages/Auth';
import { DashboardPage } from './pages/Dashboard'
import { SettingsPage } from './pages/Settings'
import { StudyPage } from './pages/Study'

// Import our components

// Home component
const Home = () => {
  return (
    <Container maxW="container.xl" py={8}>
      <Box textAlign="center" py={10} px={6}>
        <Heading
          display="inline-block"
          as="h1"
          size="3xl"
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

// Main App
function App() {
  const location = useLocation();
  const authenticatedRoutes = ['/dashboard', '/study', '/settings'];
  // Check if the current path starts with any of the authenticated routes
  const isAuthenticathedRoute = authenticatedRoutes.some(route => location.pathname.startsWith(route));

  return (
    <Box>
      {isAuthenticathedRoute ? <Sidebar /> : <Header />} {/* Use Header component */}
      <Box
        pt={isAuthenticathedRoute ? 0 : 2} // Restored original padding logic
        px={2}
        maxW={isAuthenticathedRoute ? "7xl" : "4xl"}
        mx="auto"
        className={`transition-all duration-300 ease-in-out ${isAuthenticathedRoute ? 'sm:ml-64' : 'ml-0'}`} // ml-64 only on sm+ screens
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/study" element={<StudyPage />} />
          <Route path="/study/:docId" element={<StudyPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </Box>
    </Box>
  )
}

export default App
