import { Box, Container, Heading, Text } from '@chakra-ui/react'

function App() {
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
      </Box>
    </Container>
  )
}

export default App
