import axios from 'axios';

const api = axios.create({
  baseURL: 'https://omnify-backend-495525526179.asia-south1.run.app/api/',
  withCredentials: true,
});

export default api;