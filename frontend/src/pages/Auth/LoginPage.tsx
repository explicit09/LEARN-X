import { useState } from 'react';
import { Box, Button, Container, FormControl, FormLabel, Input, Heading, VStack, Alert, AlertIcon } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/auth';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await login(email, password);
      localStorage.setItem('token', data.access_token);
      navigate('/study');
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <Container maxW="sm" py={10}>
      <Box p={6} borderWidth="1px" borderRadius="lg" boxShadow="md">
        <Heading mb={4} size="md">Login</Heading>
        {error && (
          <Alert status="error" mb={4}>
            <AlertIcon />
            {error}
          </Alert>
        )}
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </FormControl>
            <Button type="submit" colorScheme="teal" width="full">Login</Button>
          </VStack>
        </form>
      </Box>
    </Container>
  );
};

export default LoginPage;
