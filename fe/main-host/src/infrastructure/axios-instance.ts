import axios from "axios";
import type { IAuthResponse } from "./auth/auth.types";

export const VITE_API_URL = window.VITE_API_URL;


const instance = axios.create({
  baseURL: VITE_API_URL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    Accept: "application/json; charset=UTF-8",
    "Content-Type": "application/json; charset=UTF-8",
    "X-Request-ID": new Date().getTime(),
  },
});

instance.interceptors.request.use((config) => {
  config.params = config.params || {};

  if (localStorage.getItem("token")) {
    config.headers.Authorization = `Token ${localStorage.getItem("token") || ""}`;
  }

  return config;
}, function (error) {
  return Promise.reject(error);
});

instance.interceptors.response.use(function (response) {
  return response;
}, async function (error) {
  const originalRequest = error.config;

  if (error.response.status === 401) {
    try {
      const refreshTokenResponse = await axios.get<IAuthResponse>(`${VITE_API_URL}/refresh`, { withCredentials: true });

      localStorage.setItem("token", refreshTokenResponse.data.accessToken);

      return instance.request(originalRequest);
    } catch (error) {
      return Promise.reject("Пользователь не авторизован");
    }
  }

  return Promise.reject(error);
});

export default instance;
