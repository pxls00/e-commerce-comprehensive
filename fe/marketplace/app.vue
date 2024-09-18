<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
.transition-enter-active,
.transition-leave-active {
  transition: all 0.1s;
}
.transition-enter-from,
.transition-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>