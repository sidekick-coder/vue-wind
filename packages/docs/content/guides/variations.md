# Variations

Some components can be customized using vue provider/inject api

## Button

Colors variations have a prefix to control the types of button like outlined for example

```ts
import { createApp } from 'vue'
import { key, defaultColors, defaultSizes } from 'vue-wind/composables/button'

const app = createApp()

app.provide(key, {
    color: 'teal', // default color
    size: 'md', // default size
    colors: {
        ...defaultColors,
        'basic:primary': 'bg-primary text-white',
        'outlined:primary': 'border border-primary text-primary'
    },
    sizes: {
        md: 'px-2 py-4'
    },
})

```
