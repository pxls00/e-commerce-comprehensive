import instance from "../axios-instance";
import type { IProduct, IProductAddRequest } from "./product.types";

export function addProduct (payload: IProductAddRequest): Promise<IProduct> {
  return instance.post("/product/add", payload)
    .then(({ data }) => data)
    .catch((err) => {
      return Promise.reject(err.response?.data?.message || "Не удалось добавить продукт");
    });
}