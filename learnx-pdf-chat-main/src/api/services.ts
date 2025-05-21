
import api from './axios';
import {
  AuthLoginRequest,
  AuthRegisterRequest,
  AuthRegisterResponse,
  AuthLoginResponse,
  UserProfile,
  Document,
  Conversation,
  Message,
  ConversationPreferences,
  UserPreferences
} from './types';

// Auth services
export const registerUser = async (data: AuthRegisterRequest): Promise<AuthRegisterResponse> => {
  const response = await api.post('/auth/register', data);
  return response.data;
};

export const loginUser = async (data: AuthLoginRequest): Promise<AuthLoginResponse> => {
  // Convert to form data as required by the API
  const formData = new FormData();
  formData.append('username', data.username);
  formData.append('password', data.password);
  
  const response = await api.post('/auth/token', formData, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
  return response.data;
};

export const getCurrentUser = async (): Promise<UserProfile> => {
  const response = await api.get('/auth/me');
  return response.data;
};

// Document services
export const getDocuments = async (): Promise<Document[]> => {
  const response = await api.get('/documents');
  return response.data;
};

export const uploadDocument = async (file: File, title?: string): Promise<Document> => {
  const formData = new FormData();
  formData.append('file', file);
  if (title) {
    formData.append('title', title);
  }

  const response = await api.post('/documents', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
};

export const downloadDocument = async (id: string): Promise<Blob> => {
  const response = await api.get(`/documents/${id}/download`, {
    responseType: 'blob'
  });
  return response.data;
};

export const deleteDocument = async (id: string): Promise<void> => {
  await api.delete(`/documents/${id}`);
};

// Conversation services
export const createConversation = async (
  document_id: string,
  preferences?: ConversationPreferences
): Promise<Conversation> => {
  const response = await api.post('/conversations', { document_id, preferences });
  return response.data;
};

export const sendMessage = async (
  conversationId: string,
  content: string
): Promise<Message> => {
  const response = await api.post(`/conversations/${conversationId}/message`, { content });
  return response.data;
};

export const updateConversationPreferences = async (
  conversationId: string,
  preferences: ConversationPreferences
): Promise<ConversationPreferences> => {
  const response = await api.put(`/conversations/${conversationId}/preferences`, preferences);
  return response.data;
};

// User preferences services
export const getUserPreferences = async (): Promise<UserPreferences> => {
  const response = await api.get('/users/preferences');
  return response.data;
};

export const updateUserPreferences = async (
  preferences: UserPreferences
): Promise<UserPreferences> => {
  const response = await api.put('/users/preferences', preferences);
  return response.data;
};
