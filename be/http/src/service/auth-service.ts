import bcrypt from "bcrypt";

import tokenService from "./token-service";
import ApiError from "../exceptions/api-errors";
import dbQuery from "../db";
import CustomerDTO from "../dtos/customer-dto";

import { ICustomer } from "../dtos/customer-dto/customer-dto.types";

class AuthService {
  async registration(email: string, password: string) {
    const candidate = await dbQuery('SELECT * FROM customer WHERE email = $1', [email]);

    if (candidate?.rows?.[0]) {
      throw ApiError.BadRequest('Пользователь с таким email уже существует');
    }

    const hashPassword = await bcrypt.hash(password, 5);
    const customerResponse = await dbQuery(
      `INSERT INTO customer (email, password) VALUES ($1, $2) RETURNING uuid, email`,
      [email, hashPassword]
    );

    if (customerResponse?.rows?.[0]) {
      const customerInstance = new CustomerDTO(customerResponse?.rows?.[0]);

      const customerTokens = tokenService.generateTokens({ ...customerInstance });

      await tokenService.saveToken(customerInstance.uuid, customerTokens.refreshToken);

      return {
        ...customerTokens,
        customer: { ...customerInstance },
      }
    } else {
      throw new Error('Внутренняя ошибка сервера. Не удалось создать пользователя.');
    }
  }

  async login(email: string, password: string) {
    const customerResponce = await dbQuery('SELECT * FROM customer WHERE email = $1', [email]);

    if (!customerResponce?.rows?.[0]) {
      throw ApiError.BadRequest('Пользователь с таким email не найден');
    }

    const isPasswordsEqual = await bcrypt.compare(password, customerResponce.rows[0].password);
    if (!isPasswordsEqual) {
      throw ApiError.BadRequest('Неверный пароль');
    }

    const customerInstance = new CustomerDTO(customerResponce.rows[0]);

    const customerTokens = tokenService.generateTokens({ ...customerInstance });

    await tokenService.saveToken(customerInstance.uuid, customerTokens.refreshToken);

    return {
      ...customerTokens,
      customer: { ...customerInstance },
    }
  }

  async logout(refreshToken: string) {
    if (refreshToken) {
      await tokenService.removeToken(refreshToken);
    }
  }

  async refresh(refreshToken: string) {
    const refreshTokenAndCustomer = await tokenService.findRefreshToken(refreshToken)

    const customerDBResult = await dbQuery('SELECT * FROM customer WHERE uuid = $1', [refreshTokenAndCustomer.customer.uuid]);
    const customer = customerDBResult?.rows?.[0];
    if (!customer) {
      throw ApiError.BadRequest("Пользователь не найден");
    }

    const customerInstance = new CustomerDTO(customer);

    const customerTokens = tokenService.generateTokens({ ...customerInstance });

    await tokenService.saveToken(customerInstance.uuid, customerTokens.refreshToken);

    return {
      ...customerTokens,
      customer: { ...customerInstance },
    }
  }
}

export default new AuthService();