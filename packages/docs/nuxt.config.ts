// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  components: [
    {
      path: '../core/src/components',
      global: true,
    },
    {
      path: '~/components',
      global: true,
    },
  ],
  modules: [
    '@nuxt/content',
    '@nuxtjs/mdc',
    '@nuxtjs/tailwindcss',
    '@vue-macros/nuxt'
  ],
  content: {
    documentDriven: true,
    highlight: {
      // Theme used in all color schemes.
      theme: 'github-dark'
    }
  },
  macros: {
    defineProp: {
      edition: 'kevinEdition',
    },
  }
})
