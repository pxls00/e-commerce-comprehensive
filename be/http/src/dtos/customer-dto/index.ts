import type { ICustomer, ICustomerDTO } from "./customer-dto.types";

export default class CustomerDTO implements ICustomerDTO {
  email: string;
  uuid: string;
  name: string | null;
  surname: string | null;
  age: number | null;

  constructor(model: ICustomer) {
    this.email = model.email;
    this.uuid = model.uuid;
    this.name = model.name;
    this.surname = model.surname;
    this.age = model.age ? Number(model.age) : null;
  }
}