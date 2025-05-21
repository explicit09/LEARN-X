
import { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter
} from '@/components/ui/dialog';
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
import { useChatStore } from '@/state/chatStore';
import { toast } from 'sonner';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsModal = ({ isOpen, onClose }: SettingsModalProps) => {
  const { conversationPreferences, updatePreferences } = useChatStore();
  
  const [preferences, setPreferences] = useState({
    learning_style: conversationPreferences.learning_style || 'reading_writing',
    complexity: conversationPreferences.complexity || 'intermediate',
    tone: conversationPreferences.tone || 'neutral',
    follow_up_questions: conversationPreferences.follow_up_questions ?? true
  });
  
  // Update local state when conversation preferences change
  useEffect(() => {
    setPreferences({
      learning_style: conversationPreferences.learning_style || 'reading_writing',
      complexity: conversationPreferences.complexity || 'intermediate',
      tone: conversationPreferences.tone || 'neutral',
      follow_up_questions: conversationPreferences.follow_up_questions ?? true
    });
  }, [conversationPreferences]);
  
  const handleSave = async () => {
    try {
      await updatePreferences(preferences);
      toast.success('Settings updated');
      onClose();
    } catch (error) {
      console.error('Failed to update preferences:', error);
      toast.error('Failed to update settings');
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Conversation Settings</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="learning_style">Learning Style</Label>
            <Select
              value={preferences.learning_style}
              onValueChange={(value) => 
                setPreferences({ ...preferences, learning_style: value as any })
              }
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
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="complexity">Complexity</Label>
            <Select
              value={preferences.complexity}
              onValueChange={(value) => 
                setPreferences({ ...preferences, complexity: value as any })
              }
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
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="tone">Tone</Label>
            <Select
              value={preferences.tone}
              onValueChange={(value) => 
                setPreferences({ ...preferences, tone: value as any })
              }
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
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="follow_up_questions">Suggest follow-up questions</Label>
            <Switch
              id="follow_up_questions"
              checked={preferences.follow_up_questions}
              onCheckedChange={(checked) => 
                setPreferences({ ...preferences, follow_up_questions: checked })
              }
            />
          </div>
        </div>
        
        <DialogFooter className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsModal;
