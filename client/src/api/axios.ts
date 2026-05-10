import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env['VITE_API_URL'] || 'http://localhost:5000/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response?.status === 401 || 
      (error.response?.status === 404 && error.response?.data?.message === 'User not found') ||
      (error.response?.status === 404 && error.response?.data?.message === 'Email is not registered. Please use a registered email.') // if token was cleared but still somehow triggered
    ) {
      localStorage.removeItem('token');
      // If we are already on the home page, just reload, else redirect
      if (window.location.pathname !== '/') {
        window.location.href = '/';
      } else {
        window.location.reload();
      }
    }
    return Promise.reject(error);
  }
);

export default api;