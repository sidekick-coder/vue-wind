import { VueConstructor } from 'vue';
import registerComponents from './register-component';

export default function install (Vue: VueConstructor) {
    registerComponents(Vue);
}
