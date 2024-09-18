import instance from "../axios-instance";
import type { IAuthResponse, IAuthRequest } from "./auth.types";

export function signup (payload: IAuthRequest): Promise<IAuthResponse> {
  return instance.post<IAuthResponse>("/registration", payload)
    .then(({ data }) => data)
    .catch((err) => {
      return Promise.reject(err.response?.data?.message || "Не удалось зарегистрировать пользователя");
    });
}