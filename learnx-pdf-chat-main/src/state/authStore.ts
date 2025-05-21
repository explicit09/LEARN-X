
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserProfile } from '../api/types';
import { loginUser, getCurrentUser } from '../api/services';

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  user: UserProfile | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  fetchUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      token: null,
      user: null,
      isLoading: false,
      error: null,
      
      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
          const response = await loginUser({
            username: email,  // API expects username but we'll use email
            password
          });
          
          localStorage.setItem('token', response.access_token);
          set({
            isAuthenticated: true,
            token: response.access_token,
            isLoading: false
          });
          
          // Fetch user profile after successful login
          await get().fetchUser();
        } catch (error) {
          console.error('Login error:', error);
          set({
            isAuthenticated: false,
            token: null,
            isLoading: false,
            error: 'Invalid email or password'
          });
        }
      },
      
      logout: () => {
        localStorage.removeItem('token');
        set({
          isAuthenticated: false,
          token: null,
          user: null
        });
      },
      
      fetchUser: async () => {
        set({ isLoading: true });
        try {
          const user = await getCurrentUser();
          set({
            user,
            isLoading: false
          });
        } catch (error) {
          console.error('Fetch user error:', error);
          set({
            isLoading: false,
            error: 'Failed to fetch user profile'
          });
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ token: state.token, isAuthenticated: state.isAuthenticated }),
    }
  )
);
