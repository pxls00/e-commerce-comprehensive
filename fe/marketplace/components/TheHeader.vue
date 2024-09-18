<template>
  <header class="py-4 bg-teal-600 mb-4">
    <div class="flex justify-between items-center container mx-auto">
      <NuxtLink to="/" class="text-white text-2xl">
        MarketPlace
      </NuxtLink>
      <nav class="text-stone-300">
        <ul class="flex justify-end items-center gap-x-5">
          <li>
            <NuxtLink to="/about">
              About
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/products">
              Products
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<style scoped>
header {
  position: sticky;
  top: 0;
}

nav li a.router-link-exact-active {
  font-weight: bold;
  text-decoration: underline;
  color: #e9f23f;
}
</style>