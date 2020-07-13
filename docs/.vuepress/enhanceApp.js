import VueWind from '../../src/index';

export default ({ Vue }, ctx) => {
    Vue.use(VueWind, {
        includeDocs: true,
    });
}