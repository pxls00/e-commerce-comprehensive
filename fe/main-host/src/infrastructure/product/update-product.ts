import instance from "../axios-instance";
import type { IProduct } from "./product.types";

export function updateProduct (payload: IProduct): Promise<IProduct> {
  return instance.put(`/product/${payload.uuid}`, payload)
    .then(({ data }) => data)
    .catch((err) => {
      return Promise.reject(err.response?.data?.message || "Не удалось обновить данные продукта");
    });
}