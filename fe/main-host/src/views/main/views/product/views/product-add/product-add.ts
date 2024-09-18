import { defineComponent, ref } from "vue";
import { RouterLink } from "vue-router";
import $infra from "@/infrastructure/index";

import type { IProductAddRequest } from "@/infrastructure/product/product.types";

export default defineComponent({
  name: "MainProductCurrent",
  setup () {
    const pageInterface = ref<any>({
      loading: false,
      error: false,
      success: false,
      successTimeout: null,
    });
    const productFormData = ref<IProductAddRequest>({
      name: "",
      description: null,
      price: null,
    });

    const onSubmit = async () => {
      pageInterface.value.loading = true;
      pageInterface.value.error = false;
      pageInterface.value.successTimeout = null;

      try {
        await $infra.product.addProduct(productFormData.value);

        productFormData.value = {
          name: "",
          description: null,
          price: null,
        };
        pageInterface.value.success = true;
        pageInterface.value.successTimeout = setTimeout(() => {
          pageInterface.value.success = false;
        }, 3000);
      } catch (error) {
        pageInterface.value.error = true;
        pageInterface.value.success = false;
        console.log("add product", error);
      } finally {
        pageInterface.value.loading = false;
      }
    };

    return {
      RouterLink,
      pageInterface,
      productFormData,
      onSubmit,
    };
  },
});