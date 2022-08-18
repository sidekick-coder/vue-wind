import { key, defaultColors, defaultSizes } from '../../vue-wind/composables/button'

export default defineNuxtPlugin((app) => {
    app.vueApp.provide(key, {
        color: 'teal',
        size: 'md',
        sizes: defaultSizes,
        colors: defaultColors,
    })
})