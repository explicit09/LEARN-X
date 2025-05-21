import axios from 'axios';

// Get the API URL from environment variables, with a fallback
const apiUrl = import.meta.env.VITE_API_URL || window.location.origin;

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