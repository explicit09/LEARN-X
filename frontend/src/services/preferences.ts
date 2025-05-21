import axios from 'axios';
import { Preferences } from '../components/Settings/SettingsPanel';

const API_URL = '/api/v1';

export async function updatePreferences(prefs: Preferences) {
  await axios.put(`${API_URL}/users/preferences`, prefs, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
}
