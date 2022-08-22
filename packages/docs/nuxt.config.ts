import { defineNuxtConfig } from 'nuxt'
import { fileURLToPath } from 'url'
import packageJSON from '../../package.json'

const vuePath = require.resolve('vue/dist/vue.esm-bundler.js')
const clientUrl = fileURLToPath(new URL(vuePath, import.meta.url))

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    app: {
      cdnURL: process.env.CDN_URL || "https://vue-wind.sidekick-coder.com",
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
          "@fortawesome/vue-fontawesome",
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
    hooks: {
      'vite:extendConfig': (config, {isClient, isServer}) => {
          if(isClient) (config.resolve.alias as any).vue = clientUrl
      },
  },
})
