import axios from "axios";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "./constants";

const apiUrl = "http://127.0.0.1:8000/api/";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL : apiUrl,
});

// Attach access token before every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle expired access tokens
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If token expired and request wasn't retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refresh = localStorage.getItem(REFRESH_TOKEN);
        if (!refresh) {
          throw new Error("No refresh token found");
        }

        const response = await axios.post(
          `${apiUrl}token/refresh/`,
          { refresh }
        );

        // Save new access token
        localStorage.setItem(ACCESS_TOKEN, response.data.access);

        // Update headers and retry request
        api.defaults.headers.common["Authorization"] = `Bearer ${response.data.access}`;
        originalRequest.headers["Authorization"] = `Bearer ${response.data.access}`;

        return api(originalRequest);
      } catch (refreshError) {
        console.error("Refresh failed:", refreshError);
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(REFRESH_TOKEN);
        window.location.href = "/login"; // force re-login
      }
    }

    return Promise.reject(error);
  }
);

export default api;
