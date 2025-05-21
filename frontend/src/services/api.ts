import axios from 'axios';

// Get the API URL from environment variables
// In development, use the full URL to the backend (http://localhost:8000)
// In production, use relative URLs that will be resolved against the current origin
const isDevelopment = import.meta.env.MODE === 'development';
const apiUrl = isDevelopment 
  ? import.meta.env.VITE_API_URL || 'http://localhost:8000'
  : ''; // In production, use relative URLs

// Log the API URL for debugging
console.log('API URL:', apiUrl);

// Configure axios defaults
axios.defaults.baseURL = apiUrl;

// Add a request interceptor to include auth token
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axios; 