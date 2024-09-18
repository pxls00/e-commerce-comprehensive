import jwt from "jsonwebtoken";

import config from "../config";
import dbQuery from "../db";
import ApiError from "../exceptions/api-errors";

class TokenService {
  generateTokens(payload: any) {
    const accessToken = jwt.sign(payload, config.JWT_ACCESS_TOKEN, { expiresIn: '50m' });
    const refreshToken = jwt.sign(payload, config.JWT_REFRESH_TOKEN, { expiresIn: '30d' });

    return {
      accessToken,
      refreshToken,
    }
  }

  validateAccessToken(token: string) {
    try {
      return jwt.verify(token, config.JWT_ACCESS_TOKEN);
    } catch (error) {
      return null;
    }
  }

  validateRefreshToken(token: string) {
    try {
      return jwt.verify(token, config.JWT_REFRESH_TOKEN);
    } catch (error) {
      return null;
    }
  }

  async saveToken(customerUuid: string, refreshToken: string) {
    try {
      let token = await dbQuery('SELECT * FROM token WHERE customer_uuid = $1', [customerUuid])

      if (token?.rows?.[0]) {
        token = await dbQuery('UPDATE token SET refresh_token = $1 where uuid = $2 RETURNING *', [
          refreshToken,
          token.rows[0].uuid,
        ])
      } else {
        token = await dbQuery(
          'INSERT INTO token (customer_uuid, refresh_token) VALUES ($1, $2) RETURNING *',
          [customerUuid, refreshToken]
        )
      }

      if (token?.rows?.[0]) {
        return token.rows[0]
      } else {
        throw new Error('Внутренняя ошибка сервера. Не удалось создать токен.')
      }
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async findRefreshToken(refreshToken: string) {
    const customer = this.validateRefreshToken(refreshToken) as {uuid: string, email: string};

    if (!customer?.uuid) {
      throw ApiError.BadRequest('Не валидный токен');
    }

    const tokenFromDBResponse = await dbQuery("SELECT * FROM token WHERE customer_uuid = $1", [customer.uuid]);
    const tokenFromDB = tokenFromDBResponse?.rows?.[0];

    if (!tokenFromDB) {
      throw ApiError.UnathorizedError();
    }

    return {
      customer,
      refreshToken: tokenFromDB,
    };
  }

  async removeToken(refreshToken: string) {
    const { customer } = await this.findRefreshToken(refreshToken);
    await dbQuery("DELETE FROM token WHERE customer_uuid = $1", [customer.uuid])
  }
}

export default new TokenService();
