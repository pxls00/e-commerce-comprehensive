import { defineComponent, onMounted, ref } from "vue";
import { RouterLink } from "vue-router";
import $infra from "@/infrastructure/index";
import { useUserStore } from "@/stores/user/user-store";

import type { IUser } from "@/stores/user/user-store.types";

export default defineComponent({
  name: "ProfileUpdate",
  setup () {
    const userStore = useUserStore();
    const updateUserFormData = ref<IUser>({
      uuid: "",
      email: "",
      name: null,
      surname: null,
      age: null,
    });
    const loading = ref(false);

    onMounted(() => {
      updateUserFormData.value = userStore.user;
    });

    const onSubmit = async () => {
      loading.value = true;

      try {
        const user = await $infra.user.updateUser(updateUserFormData.value);
        
        userStore.setUser(user);
      } catch (error) {
        console.log(error);
      } finally {
        loading.value = false;
      }
    };

    return {
      RouterLink,
      updateUserFormData,
      loading,
      onSubmit,
    };
  },
});