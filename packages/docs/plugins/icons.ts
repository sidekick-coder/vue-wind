import { defineNuxtPlugin } from '#app'
import { library, config } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { faCircle, faCode, faHatWizard, faPlus, faTimes, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

config.autoAddCss = false

library.add(
    faGithub,
    faCircle,
    faCode,
    faHatWizard,
    faPlus,
    faTimes,
    faSpinner
)

export default defineNuxtPlugin((app) => {
    app.vueApp.component('fa-icon', FontAwesomeIcon as any)
})