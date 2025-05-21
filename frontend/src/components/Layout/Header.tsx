import { Link as ChakraLink, Button, Flex, Heading, Box } from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1rem"
      bg="teal.500" // This corresponds to primary color in many themes
      color="white"
      className="shadow-md" // Added a subtle shadow for better separation
    >
      <Flex align="center" mr={5}>
        <ChakraLink as={Link} to="/">
          <Heading as="h1" size="xl" letterSpacing="tight">
            LEARN-X
          </Heading>
        </ChakraLink>
      </Flex>

      <Box display={{ base: 'block', md: 'flex' }} alignItems="center">
        <ChakraLink as={Link} to="/login" _hover={{ textDecoration: 'none' }}>
          <Button
            variant={location.pathname === '/login' ? 'solid' : 'ghost'}
            colorScheme={location.pathname === '/login' ? 'whiteAlpha' : undefined}
            mr={3}
            _hover={{ bg: 'teal.700' }} // Darker teal for hover
          >
            Login
          </Button>
        </ChakraLink>
        <ChakraLink as={Link} to="/register" _hover={{ textDecoration: 'none' }}>
          <Button
            variant={location.pathname === '/register' ? 'solid' : 'ghost'}
            colorScheme={location.pathname === '/register' ? 'whiteAlpha' : undefined}
            _hover={{ bg: 'teal.700' }} // Darker teal for hover
          >
            Register
          </Button>
        </ChakraLink>
      </Box>
    </Flex>
  );
};

export default Header;
