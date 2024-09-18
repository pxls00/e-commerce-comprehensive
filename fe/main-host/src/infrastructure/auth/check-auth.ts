import axios from "axios";
import { VITE_API_URL } from "../axios-instance";
import type { IAuthResponse } from "./auth.types";

export function checkAuth (): Promise<IAuthResponse> {
  return axios.get<IAuthResponse>(`${VITE_API_URL}/refresh`, { withCredentials: true })
    .then(({ data }) => data)
    .catch(() => {
      return Promise.reject("Пользователь не авторизован");
    });
}