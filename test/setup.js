require('jsdom-global')();
const Vue = require('vue');
if (Vue && Vue.config) {
    Vue.config.productionTip = false;
    Vue.config.debug = false;
    Vue.config.silent = true;
    Vue.config.devtools = false;
}
