import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    ssr: false,
    components: [
      {
        path: '~/components',
        global: true,
      },
      {
        path: '~/examples',
        global: true,
        prefix: 'example'
      },
      {
        path: '../vue-wind/components',
        extensions: ['.vue'],
      }
    ],
    modules: [
      '@nuxt/content'
    ],
    content: {
      highlight: {
        theme: 'dracula',
      }
    },
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
