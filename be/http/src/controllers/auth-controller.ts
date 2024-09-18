import { validationResult } from "express-validator";

import ApiError from "../exceptions/api-errors";
import authService from "../service/auth-service";

class AuthController {
  async registration(req: any, res: any, next: (payload?: any) => void) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest("Ошибка валидации", errors.array()))
      }

      const { email, password } = req.body;

      const customerWithTokens = await authService.registration(email, password);

      res.cookie("refreshToken", customerWithTokens.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true/* , secure: true */ })
      res.json(customerWithTokens);
    } catch (error) {
      next(error);
    }
  }

  async login(req: any, res: any, next: (payload?: any) => void) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest("Ошибка валидации", errors.array()))
      }

      const { email, password } = req.body;

      const customerWithTokens = await authService.login(email, password);

      res.cookie("refreshToken", customerWithTokens.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        /* expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), */
        httpOnly: true,
        /* secure: true */
      })
      res.json(customerWithTokens);
    } catch (error) {
      next(error);
    }
  }

  async logout(req: any, res: any, next: (payload?: any) => void) {
    try {
      const { refreshToken } = req.cookies;

      await authService.logout(refreshToken);

      res.clearCookie("refreshToken");
      return res.json({ message: "Вы успешно вышли из системы" });
    } catch (error) {
      next(error);
    }
  }

  async refresh(req: any, res: any, next: (payload?: any) => void) {
    try {
      const { refreshToken } = req.cookies;

      const customerWithTokens = await authService.refresh(refreshToken);

      res.cookie("refreshToken", customerWithTokens.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true/* , secure: true */ })
      res.json(customerWithTokens);
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();