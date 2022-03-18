import axios from "axios";

import Cookies from "js-cookie";
import apiConfig from "./apiConfig";

const axiosClient = axios.create({
  baseURL: apiConfig.baseUrl,
  headers: {
    "Content-Type": `application/json`,
  },
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  config.headers["Authorization"] = "Bearer " + token;
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }

    return response;
  },
  async (error) => {
    const originalConfig = error.config;
    if (error.response.status === 401 && !originalConfig._retry) {
      originalConfig._retry = true;
      try {
        const rs = await axiosClient.post("/auth/refresh", {
          refreshToken: Cookies.get("refresh_token"),
        });
        const newAccessToken = rs.accessToken;
        const newRefreshToken = rs.refreshToken;
        localStorage.setItem("access_token", newAccessToken);
        Cookies.set("refresh_token", newRefreshToken);
        return axiosClient(originalConfig);
      } catch (error) {
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);
export default axiosClient;