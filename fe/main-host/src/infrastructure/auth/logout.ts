import instance from "../axios-instance";

export function logout () {
  return instance.get("/logout")
    .then(({ data }) => data)
    .catch((err) => {
      return Promise.reject(err.response?.data?.message || "Не удалось выйти из системы");
    });
}