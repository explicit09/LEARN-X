import { useState } from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Select,
  Button,
  VStack
} from '@chakra-ui/react';
import { updatePreferences } from '../../services/preferences';

export interface Preferences {
  learningStyle: string;
  complexity: string;
  tone: string;
}

interface SettingsPanelProps {
  initial?: Preferences;
}

const SettingsPanel = ({ initial }: SettingsPanelProps) => {
  const [prefs, setPrefs] = useState<Preferences>(
    initial || { learningStyle: '', complexity: '', tone: '' }
  );

  const handleChange = (key: keyof Preferences) => (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setPrefs((p) => ({ ...p, [key]: e.target.value }));
  };

  const handleSave = () => {
    updatePreferences(prefs).catch(() => {
      console.error('Failed to save preferences');
    });
  };

  return (
    <Box p={4} borderWidth="1px" borderRadius="lg">
      <VStack spacing={4} align="stretch">
        <FormControl>
          <FormLabel>Learning Style</FormLabel>
          <Select
            placeholder="Select style"
            value={prefs.learningStyle}
            onChange={handleChange('learningStyle')}
          >
            <option value="visual">Visual</option>
            <option value="text">Text</option>
            <option value="example">Example-based</option>
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel>Complexity</FormLabel>
          <Select
            placeholder="Select complexity"
            value={prefs.complexity}
            onChange={handleChange('complexity')}
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel>Tone</FormLabel>
          <Select
            placeholder="Select tone"
            value={prefs.tone}
            onChange={handleChange('tone')}
          >
            <option value="casual">Casual</option>
            <option value="neutral">Neutral</option>
            <option value="formal">Formal</option>
          </Select>
        </FormControl>

        <Button colorScheme="teal" onClick={handleSave} width="full">
          Save Preferences
        </Button>
      </VStack>
    </Box>
  );
};

export default SettingsPanel;
