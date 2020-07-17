import Vue from 'vue';

export default Vue.extend({
    name: 'WIcon',
    functional: true,
    props: {
        vanilla: {
            type: Boolean,
            default: false
        }
    },
    render (createElement, { parent, data, children, props }) {
        if (parent.$vuewind.options?.iconComponent && !props.vanilla) {
            return createElement(parent.$vuewind.options?.iconComponent, data, children);
        }

        return createElement('i', data, children);
    }
});
