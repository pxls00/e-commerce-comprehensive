import { defineComponent } from "vue";
import { RouterLink } from "vue-router";
import { useUserStore } from "@/stores/user/user-store";

export default defineComponent({
  name: "MainProfile",
  setup () {
    const { user } = useUserStore();

    return {
      RouterLink,
      user,
    };
  },
});