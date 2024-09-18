<template>
  <RouterView />
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AuthLayout",
});
</script>

<script setup lang="ts">
import { RouterView } from "vue-router";
</script>
