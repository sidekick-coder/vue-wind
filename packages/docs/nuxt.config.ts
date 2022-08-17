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
      transpile: [
          '@fortawesome/fontawesome-svg-core',
          '@fortawesome/free-solid-svg-icons',
          '@fortawesome/free-brands-svg-icons',
      ],
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
      "~/assets/tailwind.css",
      "~/assets/index.css",
      "@fortawesome/fontawesome-svg-core/styles.css"
    ],
})
