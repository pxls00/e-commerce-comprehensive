import { defineComponent, ref } from "vue";
import { RouterLink, useRouter } from "vue-router";
import $infra from "@/infrastructure/index";
import $service from "@/service/index";

import AuthSignForm from "@/views/auth/components/auth-sign-form/auth-sign-form.vue";

import type { IAuthRequest } from "@/infrastructure/auth/auth.types";

export default defineComponent({
  name: "AuthSignup",

  components: {
    AuthSignForm,
  },

  setup () {
    const router = useRouter();    
    const msg = "Регистрация";
    const loading = ref(false);

    const onSubmit = async (formDataPayload: IAuthRequest) => {
      loading.value = true;

      try {
        const authResponse = await $infra.auth.signup(formDataPayload);

        $service.auth.setAuthData(authResponse);
        router.push({ name: "main-profile-update" });
      } catch (error) {
        console.log("erroe auth signup", error);
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