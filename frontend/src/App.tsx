import { Box, Button, Container, Flex, Heading, Text, Link as ChakraLink } from '@chakra-ui/react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'

import { LoginPage, RegisterPage } from './pages/Auth'
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
        <ChakraLink as={Link} to="/dashboard">
          <Button
            variant={location.pathname === '/dashboard' ? 'solid' : 'ghost'}
            mr={3}
            _hover={{ bg: 'teal.700' }}
          >
            Dashboard
          </Button>
        </ChakraLink>
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
        <ChakraLink as={Link} to="/settings">
          <Button
            variant={location.pathname === '/settings' ? 'solid' : 'ghost'}
            _hover={{ bg: 'teal.700' }}
          >
            Settings
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
