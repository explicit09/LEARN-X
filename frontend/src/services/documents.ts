import axios from 'axios';
import { DashboardDocument } from '../components/Dashboard/DocumentList';

const API_URL = '/api/v1';

export async function fetchDocuments(): Promise<DashboardDocument[]> {
  const { data } = await axios.get(`${API_URL}/documents`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
  return data as DashboardDocument[];
}

export async function uploadDocument(file: File) {
  const formData = new FormData();
  formData.append('file', file);
  await axios.post(`${API_URL}/documents`, formData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
}
