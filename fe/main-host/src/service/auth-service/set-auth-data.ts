import { useUserStore } from "@/stores/user/user-store";

import type { IAuthResponse } from "@/infrastructure/auth/auth.types";
import type { IUser } from "@/stores/user/user-store.types";

export function setAuthData (authResponse: IAuthResponse): IUser {
  const userStore = useUserStore();

  localStorage.setItem("token", authResponse.accessToken);
  userStore.setUser(authResponse.customer);

  return authResponse.customer;
}