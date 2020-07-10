import { VueConstructor } from 'vue';

import { PluginOptions } from './types';
import registerComponents from './register-component';

export default function install (Vue: VueConstructor, options: PluginOptions) {
    registerComponents(Vue);
    Vue.prototype.$vuewind = {
        options
    };
}
