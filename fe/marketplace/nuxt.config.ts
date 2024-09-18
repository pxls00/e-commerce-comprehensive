// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL || "http://localhost:3000/api",
    }
  },
  devServer: {
    port: 8081,
  },
  app: {
    pageTransition: { name: "transition", mode: "out-in" },
    layoutTransition: { name: "transition", mode: "in-out" }
  },
  css: ['~/assets/scss/main.scss'],
  modules: [
    '@nuxtjs/tailwindcss'
  ]
})
