
// Types for API requests and responses

export interface AuthRegisterRequest {
  email: string;
  password: string;
}

export interface AuthRegisterResponse {
  message: string;
}

export interface AuthLoginRequest {
  username: string;  // API expects username but we'll use email
  password: string;
}

export interface AuthLoginResponse {
  access_token: string;
  token_type: string;
}

export interface UserProfile {
  id: string;
  email: string;
  created_at: string;
}

export interface Document {
  id: string;
  title: string;
  created_at: string;
  file_size: number; // in bytes
}

export interface Conversation {
  id: string;
  document_id: string;
  created_at: string;
}

export interface Message {
  id: string;
  conversation_id: string;
  content: string;
  role: 'user' | 'assistant';
  created_at: string;
  citations?: Citation[];
}

export interface Citation {
  id: string;
  text: string;
  page: number;
}

export interface ConversationPreferences {
  learning_style?: 'visual' | 'auditory' | 'reading_writing' | 'kinesthetic';
  complexity?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  tone?: 'formal' | 'neutral' | 'friendly' | 'enthusiastic';
  follow_up_questions?: boolean;
}

export interface UserPreferences extends ConversationPreferences {
  // Same fields as ConversationPreferences for now
}
