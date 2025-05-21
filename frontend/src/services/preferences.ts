import axios from 'axios';
import { Preferences } from '../components/Settings/SettingsPanel';

const API_URL = '/api/v1';

export async function updatePreferences(prefs: Preferences) {
  // TODO: implement API call to persist user preferences
  await axios.put(`${API_URL}/users/preferences`, prefs);
}
