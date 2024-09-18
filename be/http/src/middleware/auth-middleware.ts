import ApiError from "../exceptions/api-errors";
import tokenService from "../service/token-service";

export default function(req: any, res: any, next: (payload?: any) => void) {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return next(ApiError.UnathorizedError());
    }

    const accessToken = authorizationHeader.split(" ")[1];
    if (!accessToken) {
      return next(ApiError.UnathorizedError());
    }

    const customer = tokenService.validateAccessToken(accessToken);
    if (!customer) {
      return next(ApiError.UnathorizedError());
    }

    req.customer = customer;
    next();
  } catch (error) {
    return next(ApiError.UnathorizedError());
  }
}