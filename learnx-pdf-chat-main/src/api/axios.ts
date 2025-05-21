
import axios from 'axios';
import { toast } from 'sonner';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to inject the JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle token expiry
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      toast.error('Session expired. Please log in again.');
      window.location.href = '/login';
    } else if (error.response?.status === 400 || error.response?.status === 413) {
      toast.error(error.response.data.detail || error.response.data.message || 'Bad request');
    } else if (error.response?.status === 500) {
      toast.error('Something went wrong—try again.');
    }
    return Promise.reject(error);
  }
);

export default api;
