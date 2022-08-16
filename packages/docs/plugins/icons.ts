import { defineNuxtPlugin } from '#app'
import { library, config } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

config.autoAddCss = false

library.add(fas, far)

export default defineNuxtPlugin((app) => {
    app.vueApp.component('fa-icon', FontAwesomeIcon as any)
})