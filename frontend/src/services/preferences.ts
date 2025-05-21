import axios from 'axios';
import { Preferences } from '../components/Settings/SettingsPanel';

const API_URL = '/api/v1';

/**
 * Fetches the current user's preferences from the server
 */
export async function getPreferences(): Promise<Preferences> {
  const response = await axios.get(`${API_URL}/users/preferences`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
  return response.data || {};
}

/**
 * Updates the user's preferences on the server
 * @param prefs The preferences to update
 */
export async function updatePreferences(prefs: Partial<Preferences>): Promise<void> {
  await axios.put(`${API_URL}/users/preferences`, prefs, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
}
