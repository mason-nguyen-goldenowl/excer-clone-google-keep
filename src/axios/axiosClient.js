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
  const sub = localStorage.getItem("sub");
  config.headers["Authorization"] = "Bearer " + token;
  config.headers["Subcription"] = sub;
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
    if (error.response.status === 401) {
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
        Cookies.remove("isLogged");
        Cookies.remove("refresh_token");
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);
export default axiosClient;
