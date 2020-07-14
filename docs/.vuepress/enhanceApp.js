import VueWind from '../../src/index';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

export default ({ Vue }, ctx) => {
    library.add(fas);

    Vue.component('FontAwesomeIcon', FontAwesomeIcon);

    Vue.use(VueWind, {
        includeDocs: true,
        iconComponent: 'FontAwesomeIcon'
    });
    
}