import instance from "../axios-instance";
import type { IAuthResponse, IAuthRequest } from "./auth.types";

export function login (payload: IAuthRequest): Promise<IAuthResponse> {
  return instance.post<IAuthResponse>("/login", payload)
    .then(({ data }) => data)
    .catch((err) => {
      return Promise.reject(err.response?.data?.message || "Не удалось авторизовать пользователя");
    });
}