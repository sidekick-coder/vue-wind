// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxt/content','@nuxtjs/mdc', '@nuxtjs/tailwindcss'],
  content: {
    documentDriven: true,
    highlight: {
      // Theme used in all color schemes.
      theme: 'github-dark'
    }
  }
})
