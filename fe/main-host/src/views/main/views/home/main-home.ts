import { defineComponent, useCssModule, ref, onMounted } from "vue";
import { RouterLink } from "vue-router";
import $infra from "@/infrastructure/index";

import type { IProduct } from "@/infrastructure/product/product.types";

export default defineComponent({
  name: "MainHome",
  setup () {
    const style = useCssModule();
    const headerText = "Hello from home page";
    const loading = ref(false);
    const msgError = ref("");
    const hasError = ref(false);
    const productsList = ref<Array<IProduct>>([]);

    onMounted(async () => {
      loading.value = true;
      hasError.value = false;

      try {
        productsList.value = await $infra.product.getAllProducts();

        if (!productsList.value.length) {
          hasError.value = true;
          msgError.value = "Продукты не найдены";
        }
      } catch (error) {
        hasError.value = true;
        msgError.value = "Не удалось получить продукты";
      } finally {
        loading.value = false;
      }
    });

    return {
      RouterLink,
      style,
      headerText,
      productsList,
      loading,
      msgError,
      hasError,
    };
  },
});