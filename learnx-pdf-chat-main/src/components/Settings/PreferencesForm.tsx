
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { usePreferencesStore } from '@/state/preferencesStore';
import { toast } from 'sonner';

const PreferencesForm = () => {
  const { preferences: storePreferences, fetchPreferences, updatePreferences, isLoading } = usePreferencesStore();
  
  const [formValues, setFormValues] = useState({
    learning_style: storePreferences.learning_style || 'reading_writing',
    complexity: storePreferences.complexity || 'intermediate',
    tone: storePreferences.tone || 'neutral',
    follow_up_questions: storePreferences.follow_up_questions ?? true
  });
  
  // Fetch user preferences when component mounts
  useEffect(() => {
    fetchPreferences();
  }, [fetchPreferences]);
  
  // Update form when store preferences change
  useEffect(() => {
    setFormValues({
      learning_style: storePreferences.learning_style || 'reading_writing',
      complexity: storePreferences.complexity || 'intermediate',
      tone: storePreferences.tone || 'neutral',
      follow_up_questions: storePreferences.follow_up_questions ?? true
    });
  }, [storePreferences]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await updatePreferences(formValues);
      toast.success('Preferences saved successfully');
    } catch (error) {
      console.error('Failed to update preferences:', error);
      toast.error('Failed to save preferences');
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Global Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="learning_style">Default Learning Style</Label>
              <Select
                value={formValues.learning_style}
                onValueChange={(value) => 
                  setFormValues({ ...formValues, learning_style: value as any })
                }
                disabled={isLoading}
              >
                <SelectTrigger id="learning_style">
                  <SelectValue placeholder="Select learning style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="visual">Visual</SelectItem>
                  <SelectItem value="auditory">Auditory</SelectItem>
                  <SelectItem value="reading_writing">Reading/Writing</SelectItem>
                  <SelectItem value="kinesthetic">Kinesthetic</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-gray-500 mt-1">
                How you prefer to receive and process information.
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="complexity">Default Complexity</Label>
              <Select
                value={formValues.complexity}
                onValueChange={(value) => 
                  setFormValues({ ...formValues, complexity: value as any })
                }
                disabled={isLoading}
              >
                <SelectTrigger id="complexity">
                  <SelectValue placeholder="Select complexity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                  <SelectItem value="expert">Expert</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-gray-500 mt-1">
                How detailed and technical responses should be.
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="tone">Default Tone</Label>
              <Select
                value={formValues.tone}
                onValueChange={(value) => 
                  setFormValues({ ...formValues, tone: value as any })
                }
                disabled={isLoading}
              >
                <SelectTrigger id="tone">
                  <SelectValue placeholder="Select tone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="formal">Formal</SelectItem>
                  <SelectItem value="neutral">Neutral</SelectItem>
                  <SelectItem value="friendly">Friendly</SelectItem>
                  <SelectItem value="enthusiastic">Enthusiastic</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-gray-500 mt-1">
                The conversational style you prefer for responses.
              </p>
            </div>
            
            <div className="flex items-center justify-between pt-2">
              <div>
                <Label htmlFor="follow_up_questions">Suggest follow-up questions</Label>
                <p className="text-sm text-gray-500 mt-1">
                  AI will suggest related questions to continue the conversation.
                </p>
              </div>
              <Switch
                id="follow_up_questions"
                checked={formValues.follow_up_questions}
                onCheckedChange={(checked) => 
                  setFormValues({ ...formValues, follow_up_questions: checked })
                }
                disabled={isLoading}
              />
            </div>
          </div>
          
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Save Preferences'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default PreferencesForm;
