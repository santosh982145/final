import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000',
  timeout: 5000
});

export const endpoints = {
  login: (payload) => api.post('/login', payload),
  signup: (payload) => api.post('/signup', payload),
  transactions: (params) => api.get('/transactions', { params }),
  addTransaction: (payload) => api.post('/transactions', payload),
  summary: () => api.get('/summary'),
  insights: () => api.get('/insights'),
  risk: () => api.get('/risk'),
  recommendations: () => api.get('/recommendations')
};

export default api;
