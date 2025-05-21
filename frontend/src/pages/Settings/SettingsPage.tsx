import { Container, Heading } from '@chakra-ui/react';
import SettingsPanel from '../../components/Settings/SettingsPanel';

const SettingsPage = () => {
  return (
    <Container maxW="container.sm" py={8}>
      <Heading size="lg" mb={4}>Preferences</Heading>
      <SettingsPanel />
    </Container>
  );
};

export default SettingsPage;
