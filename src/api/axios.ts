import axios from 'axios';

const api = axios.create({
  baseURL: 'https://strapi.teetsh.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add interceptor for authentication
api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer 2dba999015fbc84a7d1f6dd11b85c4f72bec98b28c9cecac6986780bcdd8e0ee42827a263ed0b54ee5f1b9910dcda1cbcc4368edc2862b1b1bd8d0339967de45556d4e0d0da6c9c5d28d790fb4f3cd8115ee27e1cb95dc1ea705604aec863197857e8b0af3f4639fff8788cf6f5ba2f20b4c23048956e3891ab60aa703c5729f`;
  return config;
});

export default api;
