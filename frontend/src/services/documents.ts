import axios from 'axios';
import { DashboardDocument } from '../components/Dashboard/DocumentList';

const API_URL = '/api/v1';

export async function fetchDocuments(): Promise<DashboardDocument[]> {
  // TODO: fetch documents from backend
  const { data } = await axios.get(`${API_URL}/documents`);
  return data as DashboardDocument[];
}

export async function uploadDocument(file: File) {
  // TODO: upload document to backend
  const formData = new FormData();
  formData.append('file', file);
  await axios.post(`${API_URL}/documents`, formData);
}
