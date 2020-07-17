import Vue from 'vue';

export default Vue.extend({
    name: 'WCardContent',
    functional: true,
    props: {
        defaultClass: {
            type: [String, Array, Object],
            required: false,
            default: 'p-5'
        }
    },
    render (createElement, { data, props, children }) {
        data.class = [props.defaultClass, data.class];

        return createElement('div', data, children);
    }
});
