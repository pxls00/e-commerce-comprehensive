import { defineComponent, onMounted, ref } from "vue";
import { useRoute, useRouter, RouterLink } from "vue-router";
import $infra from "@/infrastructure/index";

import type { IProduct } from "@/infrastructure/product/product.types";

export default defineComponent({
  name: "MainProductCurrent",
  setup () {
    const route = useRoute();
    const router = useRouter();
    const pageInterface = ref({
      loading: false,
      error: false,
      updateError: false,
    });
    const currentProduct = ref<IProduct>({
      uuid: "",
      name: "",
      description: null,
      price: null,
    });

    onMounted(async () => {
      pageInterface.value.loading = true;
      pageInterface.value.error = false;

      try {
        currentProduct.value = await $infra.product.getProductDetail(route.params.uuid as string);
      } catch (error) {
        pageInterface.value.error = true;
      } finally {
        pageInterface.value.loading = false;
      }
    });

    const onSubmit = async () => {
      pageInterface.value.loading = true;
      pageInterface.value.updateError = false;

      try {
        currentProduct.value = await $infra.product.updateProduct(currentProduct.value);
      } catch (error) {
        pageInterface.value.updateError = true;
      } finally {
        pageInterface.value.loading = false;
      }
    };

    const onDelete = async () => {
      pageInterface.value.loading = true;

      try {
        await $infra.product.deleteProduct(currentProduct.value.uuid);

        router.push({ name: "main-home" });
      } catch (error) {
        pageInterface.value.updateError = true;
      } finally {
        pageInterface.value.loading = false;
      }
    };

    return {
      RouterLink,
      pageInterface,
      currentProduct,
      onSubmit,
      onDelete,
    };
  },
});