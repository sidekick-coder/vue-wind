# Installation

Some warnings before you use this lib:

- This lib don't build the files before it is distribute, you use directly the vue single files.
- You need to use **vue.runtime.esm-bundler.js** to not get errors when building the app
- You need to have tailwind already installed & configured

## Install the lib

```sh
npm i vue-wind
```

## Vite config

To configure **vue runtime bundle** in vite you can use resolve alias.

```ts
// vite-config.js

import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const vueRuntimePath = 'node_modules/vue/dist/vue.runtime.esm-bundler.js'
const clientUrl = fileURLToPath(new URL(vueRuntimePath, import.meta.url))

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      'vue': clientUrl,
    }
  }
})
```

## Nuxt

To configure **vue runtime bundle** in nuxt you can use use **nuxt hooks**.

> Tip: Also in Nuxt you can add a new components entry directory and nuxt will register the globally & generate its types.

```ts
import { defineNuxtConfig } from 'nuxt'

const vueRuntimePath = 'node_modules/vue/dist/vue.runtime.esm-bundler.js'
const clientUrl = fileURLToPath(new URL(vueRuntimePath, import.meta.url))

export default defineNuxtConfig({
    components: [
      {
        path: '~/components',
        global: true,
      },
      {
        path: '~/node_modules/vue-wind/components',
        extensions: ['.vue'],
      }
    ],
    hooks: {
        'vite:extendConfig': (config, {isClient, isServer}) => {
            if(isClient) (config.resolve.alias as any).vue = clientUrl
        },
    },
    ...
})

```

Check [Configuration](/guides/configuration) for the next steps