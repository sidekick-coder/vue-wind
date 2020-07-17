import Vue from 'vue';

export default Vue.extend({
    name: 'WCardTitle',
    functional: true,
    props: {
        defaultClass: {
            type: [String, Array, Object],
            required: false,
            default: 'px-5 pt-4'
        }
    },
    render (createElement, { data, props, children }) {
        data.class = [data.class, props.defaultClass];

        return createElement('div', data, children);
    }
});
