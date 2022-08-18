import { defineNuxtConfig } from 'nuxt'
import packageJSON from '../../package.json'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    ssr: false,
    app: {
      head: {
        title: 'Vue wind',
        meta: [
          { property: 'og:type', content: 'website' },
          { property: 'og:title', content: packageJSON.name },
          { property: 'og:description', content: packageJSON.description },
          { property: 'og:url', content: packageJSON.homepage },
          { property: 'og:site_name', content: packageJSON.name },
          { property: 'og:image', content: `${packageJSON.homepage}/og-image.png`},
          { property: 'og:image:with', content: '1024' },
          { property: 'og:image:height', content: '768' },
        ]
      }
    },
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
