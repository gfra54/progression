import axios from 'axios';

const api = axios.create({
  baseURL: 'https://strapi.teetsh.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add interceptor for authentication
api.interceptors.request.use((config) => {
  const token = process.env.REACT_APP_API_TOKEN;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
