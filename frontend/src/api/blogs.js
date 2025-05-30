import axiosInstance from '../utils/axiosInstance';

const API_URL = 'https://omnify-backend-495525526179.asia-south1.run.app/api/blogs/';

const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem('access')}`,
  }
});

export const fetchBlogs = () => axiosInstance.get(API_URL);
export const fetchBlog = (id) => axiosInstance.get(`${API_URL}${id}/`);
export const createBlog = (data) => axiosInstance.post(API_URL, data, authHeader());
export const updateBlog = (id, data) => axiosInstance.put(`${API_URL}${id}/`, data, authHeader());
export const deleteBlog = (id) => axiosInstance.delete(`${API_URL}${id}/`, authHeader());