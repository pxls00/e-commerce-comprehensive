import { defineStore } from "pinia";

import type { IUserStore, IUser } from "./user-store.types";

export const useUserStore = defineStore({
  id: "user",

  state: (): IUserStore => {
    return {
      user: {
        email: "",
        uuid: "",
        name: null,
        surname: null,
        age: null,
      },
    };
  },

  actions: {
    setUser (payload: IUser) {
      this.user = {
        email: payload.email || "",
        uuid: payload.uuid || "",
        name: payload.name || null,
        surname: payload.surname || null,
        age: payload.age || null,
      };
    },
    resetuser () {
      this.user = {
        email: "",
        uuid: "",
        name: null,
        surname: null,
        age: null,
      };
    },
  },

  getters: {
    // isMaterialsIncludesElements: (state): boolean => !!state.materials.length
  },
});
