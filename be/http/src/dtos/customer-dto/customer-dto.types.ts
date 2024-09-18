export interface ICustomer {
  email: string;
  uuid: string;
  password: string;
  name: string | null;
  surname: string | null;
  age: number | null;
}

export type ICustomerDTO = Omit<ICustomer, "password">;