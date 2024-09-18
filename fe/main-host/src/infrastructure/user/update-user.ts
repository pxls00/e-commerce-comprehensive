import instance from "../axios-instance";
import type { IUser } from "@/stores/user/user-store.types";

export function updateUser (payload: IUser): Promise<IUser> {
  return instance.put<IUser>(`/customer/${payload.uuid}`, payload)
    .then(({ data }) => data)
    .catch((err) => {
      return Promise.reject(err.response?.data?.message || "Не удалось обновить данные пользователя");
    });
}