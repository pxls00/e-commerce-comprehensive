import instance from "../axios-instance";
import type { IProduct } from "./product.types";

export function deleteProduct (uuid: string): Promise<IProduct> {
  return instance.delete(`/product/${uuid}`)
    .then(({ data }) => data)
    .catch((err) => {
      return Promise.reject(err.response?.data?.message || "Не удалось удалить продукт");
    });
}