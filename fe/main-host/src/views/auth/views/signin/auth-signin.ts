import { defineComponent, ref } from "vue";
import { RouterLink, useRouter } from "vue-router";
import $infra from "@/infrastructure/index";
import $service from "@/service/index";

import AuthSignForm from "@/views/auth/components/auth-sign-form/auth-sign-form.vue";

import type { IAuthRequest } from "@/infrastructure/auth/auth.types";

export default defineComponent({
  name: "AuthSignin",

  components: {
    AuthSignForm,
  },

  setup () {
    const router = useRouter();
    const msg = "Авторизация";
    const loading = ref(false);

    const onSubmit = async (formDataPayload: IAuthRequest) => {
      loading.value = true;

      try {
        const authResponse = await $infra.auth.login(formDataPayload);

        await $service.auth.setAuthData(authResponse);
        
        router.push({ name: "home" });
      } catch (error) {
        console.log("erroe auth signin", error);
      } finally {
        loading.value = false;
      }
    };

    return {
      RouterLink,
      msg,
      loading,
      onSubmit,
    };
  },
});