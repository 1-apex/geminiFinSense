import axios from 'axios';

// Create an Axios instance with default configurations
const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api', // Django backend URL
  headers: {
    'Content-Type': 'application/json', // Default content type for requests
    'X-Requested-With': 'XMLHttpRequest', // For CSRF protection with Django
  },
});

// Add a request interceptor to attach tokens (if needed)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token'); // Retrieve token from local storage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Attach token to Authorization header
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error('Unauthorized! Redirecting to login...');
      // Optionally handle logout or token refresh here
    }
    return Promise.reject(error);
  }
);

export default api; // Export the configured Axios instance
