import dbQuery from "../db";
import CustomerDTO from "../dtos/customer-dto";
import ApiError from "../exceptions/api-errors";

class CustomerService {
  async getAllCustomers() {
    const customersDBResult = await dbQuery("SELECT * FROM customer");
    return customersDBResult.rows
      .map(customer => new CustomerDTO(customer))
      .map(customerInstance => ({...customerInstance}));
  }

  async getCustomer(uuid: string) {
    if (!uuid) {
      throw ApiError.BadRequest("Не корректно указан идентификатор пользователя");
    }

    const customerDBResult = await dbQuery("SELECT * FROM customer where uuid = $1", [uuid]);

    if (!customerDBResult.rows?.[0]) {
      throw ApiError.BadRequest("Пользователя с указанным идентификатором нет в системе");
    }

    return {...new CustomerDTO(customerDBResult.rows[0])}
  }

  async updateCustomer(customerUuid: string, updateCustomerPayload: any) {
    const condidate = await this.getCustomer(customerUuid);

    if (updateCustomerPayload.email) {
      const customerEmailDbResult = await dbQuery("SELECT * FROM customer where email = $1", [updateCustomerPayload.email]);
      const customerViaEmail = customerEmailDbResult.rows?.[0] || null;

      if (customerViaEmail && customerViaEmail.uuid !== condidate.uuid) {
        throw ApiError.BadRequest("Пользователь с таким email уже существует");
      }
    }

    const payloadForUpdateCustomer = {
      email: updateCustomerPayload.email || condidate.email,
      name: updateCustomerPayload.name || condidate.name,
      surname: updateCustomerPayload.surname || condidate.surname,
      age: updateCustomerPayload.age || condidate.age,
    }

    const updatedCustomerResponseFromDb = await dbQuery(
      `UPDATE customer SET email = $1, name = $2, surname = $3, age = $4 WHERE uuid = $5 RETURNING email, name, surname, age, uuid`,
      [
        payloadForUpdateCustomer.email,
        payloadForUpdateCustomer.name,
        payloadForUpdateCustomer.surname,
        payloadForUpdateCustomer.age ? Number(payloadForUpdateCustomer.age) : null,
        customerUuid
      ]
    );

    if (!updatedCustomerResponseFromDb.rows?.[0]) {
      throw ApiError.ServerError("Не удалось обновить данные пользователя");
    }

    return { ...new CustomerDTO(updatedCustomerResponseFromDb.rows[0]) };
  }
}

export default new CustomerService();
