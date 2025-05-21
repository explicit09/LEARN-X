
import { create } from 'zustand';
import { Document } from '../api/types';
import { getDocuments, uploadDocument, deleteDocument } from '../api/services';

interface DocumentsState {
  documents: Document[];
  isLoading: boolean;
  error: string | null;
  uploadProgress: number | null;
  fetchDocuments: () => Promise<void>;
  uploadNewDocument: (file: File, title?: string) => Promise<Document>;
  removeDocument: (id: string) => Promise<void>;
  setUploadProgress: (progress: number | null) => void;
}

export const useDocumentsStore = create<DocumentsState>((set, get) => ({
  documents: [],
  isLoading: false,
  error: null,
  uploadProgress: null,
  
  fetchDocuments: async () => {
    set({ isLoading: true, error: null });
    try {
      const docs = await getDocuments();
      set({ documents: docs, isLoading: false });
    } catch (error) {
      console.error('Fetch documents error:', error);
      set({ 
        isLoading: false, 
        error: 'Failed to load documents' 
      });
    }
  },
  
  uploadNewDocument: async (file: File, title?: string) => {
    set({ isLoading: true, error: null, uploadProgress: 0 });
    try {
      // Mock upload progress (actual progress would require custom XMLHttpRequest)
      const mockProgress = setInterval(() => {
        const currentProgress = get().uploadProgress || 0;
        if (currentProgress < 90) {
          set({ uploadProgress: currentProgress + 10 });
        }
      }, 300);

      const newDoc = await uploadDocument(file, title);
      
      clearInterval(mockProgress);
      set({ 
        uploadProgress: 100,
        documents: [...get().documents, newDoc],
        isLoading: false 
      });
      
      // Reset progress after a delay
      setTimeout(() => {
        set({ uploadProgress: null });
      }, 1000);
      
      return newDoc;
    } catch (error) {
      console.error('Upload document error:', error);
      set({ 
        isLoading: false, 
        error: 'Failed to upload document',
        uploadProgress: null
      });
      throw error;
    }
  },
  
  removeDocument: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      await deleteDocument(id);
      set({ 
        documents: get().documents.filter(doc => doc.id !== id), 
        isLoading: false 
      });
    } catch (error) {
      console.error('Delete document error:', error);
      set({ 
        isLoading: false, 
        error: 'Failed to delete document' 
      });
      throw error;
    }
  },
  
  setUploadProgress: (progress) => set({ uploadProgress: progress })
}));
