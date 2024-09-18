import type { IAuthResponse } from "@/infrastructure/auth/auth.types";

export default class AuthService {
  static auth = {
    setAuthData (payload: IAuthResponse) {
      return import("./auth-service/set-auth-data").then((module) => module.setAuthData(payload));
    },
    resetAuthData () {
      return import("./auth-service/reset-auth-data").then(async (module) => await module.resetAuthData());
    },
  };
}