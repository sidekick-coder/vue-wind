import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    components: [
        '~/components',
        '../vue-wind/components',
    ],
    modules: [
      '@nuxt/content'
    ],
    build: {
        postcss: {
          postcssOptions: {
            plugins: {
              tailwindcss: {},
              autoprefixer: {},
            },
          },
        },
    },
    css: [
     "~/assets/tailwind.css"
    ],
})
