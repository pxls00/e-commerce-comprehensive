import instance from "../axios-instance";
import type { IProduct } from "./product.types";

export function getAllProducts (): Promise<Array<IProduct>> {
  return instance.get("/product")
    .then(({ data }) => data)
    .catch((err) => {
      return Promise.reject(err.response?.data?.message || "Не удалось получить продукты");
    });
}