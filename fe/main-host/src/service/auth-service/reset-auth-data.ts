import { useUserStore } from "@/stores/user/user-store";

export function resetAuthData () {
  const userStore = useUserStore();

  localStorage.removeItem("token");
  userStore.resetuser();
}