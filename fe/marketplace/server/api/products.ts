export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  return await $fetch(`${config.public.apiBaseUrl}/product`);
})