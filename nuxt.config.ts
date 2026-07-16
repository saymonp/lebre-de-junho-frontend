// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['./app/assets/css/main.css'],

  vite: {
    plugins: [
      tailwindcss(),
    ],
  },

  runtimeConfig: {
    public: {
      apiBase: import.meta.env.VITE_BASE_URL,
      awsDefaultRegion: import.meta.env.VITE_AWS_DEFAULT_REGION,
      awsBucket: import.meta.env.VITE_AWS_BUCKET,
      awsUsePathStyleEndpoint: import.meta.env.VITE_AWS_USE_PATH_STYLE_ENDPOINT === 'true'
    }
  },

  modules: ['@nuxt/fonts', '@pinia/nuxt', 'nuxt-toast'],
})