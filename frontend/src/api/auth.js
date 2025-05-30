import axios from 'axios';

const API_URL = 'https://omnify-backend-495525526179.asia-south1.run.app/api';

export const registerUser = (userData) => {
  return axios.post(`${API_URL}/register/`, userData);
};

export const loginUser = (credentials) => {
  return axios.post(`${API_URL}/token/`, credentials);
};

export const getCurrentUser = (accessToken) => {
  return axios.get(`${API_URL}/me/`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
};