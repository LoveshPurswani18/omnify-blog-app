import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://omnify-backend-495525526179.asia-south1.run.app/api/",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;