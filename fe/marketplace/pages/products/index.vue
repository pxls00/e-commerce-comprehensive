<template>
  <div>
    <h1>Products Page</h1>
    <div>
      <div v-if="pending">
        Loading...
      </div>
      <div v-else class="columns-3">
        <NuxtLink
          v-for="product in products"
          :key="product.uuid"
          :to="`/products/${product.uuid}`"
          class="py-3 px-6 flex flex-col items-center border rounded-lg border-slate-500 border-solid"
        >
          {{product.name}}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
const { data: products, pending } = await useFetch('/api/products')

</script>