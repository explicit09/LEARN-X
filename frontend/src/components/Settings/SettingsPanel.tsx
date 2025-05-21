import { useState, useEffect } from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Select,
  Button,
  VStack,
  Switch,
  useToast,
  Spinner,
  Text,
  Heading,
  HStack
} from '@chakra-ui/react';
import { updatePreferences, getPreferences } from '../../services/preferences';

export type LearningStyle = 'visual' | 'auditory' | 'read_write' | 'kinesthetic';
export type ComplexityLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';
export type TonePreference = 'formal' | 'casual' | 'professional' | 'friendly';

export interface Preferences {
  learning_style?: LearningStyle;
  complexity?: ComplexityLevel;
  tone?: TonePreference;
  follow_ups?: boolean;
}

interface SettingsPanelProps {
  onSave?: (prefs: Preferences) => void;
}

const SettingsPanel = ({ onSave }: SettingsPanelProps) => {
  const [prefs, setPrefs] = useState<Preferences>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const toast = useToast();

  useEffect(() => {
    const loadPreferences = async () => {
      try {
        const savedPrefs = await getPreferences();
        setPrefs(savedPrefs);
      } catch (error) {
        toast({
          title: 'Error loading preferences',
          description: 'Could not load your preferences. Using default settings.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadPreferences();
  }, [toast]);

  const handleChange = (key: keyof Preferences) => (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const value = e.target.type === 'checkbox' 
      ? (e.target as HTMLInputElement).checked 
      : e.target.value;
    
    setPrefs((p) => ({ ...p, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      await updatePreferences(prefs);
      onSave?.(prefs);
      toast({
        title: 'Preferences saved',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Failed to save preferences',
        description: 'Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <Box p={4} display="flex" justifyContent="center" alignItems="center" minH="200px">
        <Spinner size="xl" />
      </Box>
    );
  }

  return (
    <Box p={6} borderWidth="1px" borderRadius="lg" bg="white" boxShadow="sm">
      <Heading as="h2" size="md" mb={6} color="gray.700">
        Learning Preferences
      </Heading>
      
      <form onSubmit={handleSubmit}>
        <VStack spacing={5} align="stretch">
          <FormControl>
            <FormLabel fontWeight="medium">Learning Style</FormLabel>
            <Select
              placeholder="Select your preferred learning style"
              value={prefs.learning_style || ''}
              onChange={handleChange('learning_style')}
              bg="white"
              borderColor="gray.300"
              _hover={{ borderColor: 'gray.400' }}
              focusBorderColor="teal.400"
            >
              <option value="visual">Visual (Diagrams, charts, videos)</option>
              <option value="auditory">Auditory (Listening, discussions)</option>
              <option value="read_write">Reading/Writing (Text-based materials)</option>
              <option value="kinesthetic">Kinesthetic (Hands-on, practice)</option>
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel fontWeight="medium">Content Complexity</FormLabel>
            <Select
              placeholder="Select your preferred complexity level"
              value={prefs.complexity || ''}
              onChange={handleChange('complexity')}
              bg="white"
              borderColor="gray.300"
              _hover={{ borderColor: 'gray.400' }}
              focusBorderColor="teal.400"
            >
              <option value="beginner">Beginner (Basic concepts, no prior knowledge needed)</option>
              <option value="intermediate">Intermediate (Some experience recommended)</option>
              <option value="advanced">Advanced (In-depth, technical details)</option>
              <option value="expert">Expert (Cutting-edge concepts, research level)</option>
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel fontWeight="medium">Tone</FormLabel>
            <Select
              placeholder="Select your preferred tone"
              value={prefs.tone || ''}
              onChange={handleChange('tone')}
              bg="white"
              borderColor="gray.300"
              _hover={{ borderColor: 'gray.400' }}
              focusBorderColor="teal.400"
            >
              <option value="casual">Casual (Conversational, friendly)</option>
              <option value="friendly">Friendly (Approachable but professional)</option>
              <option value="professional">Professional (Formal, business-appropriate)</option>
              <option value="formal">Formal (Academic, highly structured)</option>
            </Select>
          </FormControl>

          <FormControl display="flex" alignItems="center">
            <HStack spacing={4}>
              <Switch
                id="follow-ups"
                isChecked={prefs.follow_ups || false}
                onChange={(e) => setPrefs(p => ({ ...p, follow_ups: e.target.checked }))}
                colorScheme="teal"
                size="lg"
              />
              <Box>
                <FormLabel htmlFor="follow-ups" mb="0" fontWeight="medium">
                  Follow-up Questions
                </FormLabel>
                <Text fontSize="sm" color="gray.600">
                  Enable AI to suggest follow-up questions and related topics
                </Text>
              </Box>
            </HStack>
          </FormControl>

          <Button
            type="submit"
            colorScheme="teal"
            size="lg"
            width="full"
            mt={4}
            isLoading={isSaving}
            loadingText="Saving..."
          >
            Save Preferences
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default SettingsPanel;
