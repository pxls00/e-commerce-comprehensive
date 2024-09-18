export interface IProduct {
  uuid: string;
  name: string;
  description: string | null;
  price: number | null;
}

export type IProductAddRequest = Omit<IProduct, "uuid">;