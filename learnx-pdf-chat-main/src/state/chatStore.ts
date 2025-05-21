import { create } from "zustand";
import { Conversation, Message, ConversationPreferences } from "../api/types";
import {
  createConversation,
  sendMessage,
  updateConversationPreferences,
  regenerateMessage,
} from "../api/services";

interface ChatState {
  currentConversation: Conversation | null;
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  conversationPreferences: ConversationPreferences;

  startConversation: (
    documentId: string,
    preferences?: ConversationPreferences,
  ) => Promise<Conversation>;
  sendUserMessage: (content: string) => Promise<void>;
  updatePreferences: (preferences: ConversationPreferences) => Promise<void>;
  regenerateLastResponse: () => Promise<void>;
  setConversation: (conversation: Conversation) => void;
  setMessages: (messages: Message[]) => void;
  addMessage: (message: Message) => void;
}

export const useChatStore = create<ChatState>((set, get) => ({
  currentConversation: null,
  messages: [],
  isLoading: false,
  error: null,
  conversationPreferences: {},

  startConversation: async (
    documentId: string,
    preferences?: ConversationPreferences,
  ) => {
    set({ isLoading: true, error: null });
    try {
      const conversation = await createConversation(documentId, preferences);
      set({
        currentConversation: conversation,
        messages: [],
        isLoading: false,
        conversationPreferences: preferences || {},
      });
      return conversation;
    } catch (error) {
      console.error("Start conversation error:", error);
      set({
        isLoading: false,
        error: "Failed to start conversation",
      });
      throw error;
    }
  },

  sendUserMessage: async (content: string) => {
    const { currentConversation } = get();
    if (!currentConversation) {
      set({ error: "No active conversation" });
      return;
    }

    // Add the user's message immediately
    const userMessage: Message = {
      id: `temp-${Date.now()}`,
      conversation_id: currentConversation.id,
      content,
      role: "user",
      created_at: new Date().toISOString(),
    };

    set({
      messages: [...get().messages, userMessage],
      isLoading: true,
    });

    try {
      // Send the message to the API
      const response = await sendMessage(currentConversation.id, content);

      // Add the assistant's response
      set({
        messages: [...get().messages, response],
        isLoading: false,
      });
    } catch (error) {
      console.error("Send message error:", error);
      set({
        isLoading: false,
        error: "Failed to send message",
      });
    }
  },

  regenerateLastResponse: async () => {
    const { currentConversation, messages } = get();
    if (!currentConversation) {
      set({ error: "No active conversation" });
      return;
    }

    const lastMessage = messages[messages.length - 1];
    let updatedMessages = messages;
    if (lastMessage && lastMessage.role === "assistant") {
      updatedMessages = messages.slice(0, -1);
    }

    set({ messages: updatedMessages, isLoading: true });

    try {
      const response = await regenerateMessage(currentConversation.id);
      set({ messages: [...updatedMessages, response], isLoading: false });
    } catch (error) {
      console.error("Regenerate message error:", error);
      set({ isLoading: false, error: "Failed to regenerate message" });
    }
  },

  updatePreferences: async (preferences: ConversationPreferences) => {
    const { currentConversation } = get();
    if (!currentConversation) {
      set({ error: "No active conversation" });
      return;
    }

    set({ isLoading: true, error: null });
    try {
      const updatedPrefs = await updateConversationPreferences(
        currentConversation.id,
        preferences,
      );

      set({
        conversationPreferences: updatedPrefs,
        isLoading: false,
      });
    } catch (error) {
      console.error("Update preferences error:", error);
      set({
        isLoading: false,
        error: "Failed to update preferences",
      });
    }
  },

  setConversation: (conversation) => set({ currentConversation: conversation }),
  setMessages: (messages) => set({ messages }),
  addMessage: (message) => set({ messages: [...get().messages, message] }),
}));
