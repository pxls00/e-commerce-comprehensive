import type { IUser } from "@/stores/user/user-store.types";

export interface IAuthResponse {
  accessToken: string;
  refreshToken: string;
  customer: IUser;
}

export interface IAuthRequest {
  email: string;
  password: string;
}