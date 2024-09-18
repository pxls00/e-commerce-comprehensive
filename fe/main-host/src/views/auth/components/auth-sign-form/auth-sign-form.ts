import { defineComponent, ref, useCssModule } from "vue";

import type { IAuthRequest } from "@/infrastructure/auth/auth.types";

export default defineComponent({
  name: "AuthSignForm",
  emits: [
    "submit",
  ],
  setup (props, context) {
    const style = useCssModule();

    const formData = ref<IAuthRequest>({
      email: "",
      password: "",
    });

    const onSubmit = () => {
      context.emit("submit", formData.value);
    };

    return {
      style,
      formData,
      onSubmit,
    };
  },
});