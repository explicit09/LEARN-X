
import { create } from 'zustand';
import { UserPreferences } from '../api/types';
import { getUserPreferences, updateUserPreferences } from '../api/services';

interface PreferencesState {
  preferences: UserPreferences;
  isLoading: boolean;
  error: string | null;
  fetchPreferences: () => Promise<void>;
  updatePreferences: (preferences: UserPreferences) => Promise<void>;
}

export const usePreferencesStore = create<PreferencesState>((set, get) => ({
  preferences: {
    learning_style: 'reading_writing',
    complexity: 'intermediate',
    tone: 'neutral',
    follow_up_questions: true
  },
  isLoading: false,
  error: null,
  
  fetchPreferences: async () => {
    set({ isLoading: true, error: null });
    try {
      const preferences = await getUserPreferences();
      set({
        preferences,
        isLoading: false
      });
    } catch (error) {
      console.error('Fetch preferences error:', error);
      set({ 
        isLoading: false, 
        error: 'Failed to load preferences' 
      });
    }
  },
  
  updatePreferences: async (preferences: UserPreferences) => {
    set({ isLoading: true, error: null });
    try {
      const updatedPreferences = await updateUserPreferences(preferences);
      set({
        preferences: updatedPreferences,
        isLoading: false
      });
    } catch (error) {
      console.error('Update preferences error:', error);
      set({ 
        isLoading: false, 
        error: 'Failed to update preferences' 
      });
    }
  }
}));
