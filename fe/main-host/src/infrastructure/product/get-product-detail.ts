import instance from "../axios-instance";
import type { IProduct } from "./product.types";

export function getProductDetail (uuid: string): Promise<IProduct> {
  return instance.get(`/product/${uuid}`)
    .then(({ data }) => data)
    .catch((err) => {
      return Promise.reject(err.response?.data?.message || "Не удалось получить данные продукта");
    });
}