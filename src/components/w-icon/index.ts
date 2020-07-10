import Vue from 'vue';

export default Vue.extend({
    name: 'WIcon',
    functional: true,
    props: {
        vannila: {
            type: Boolean,
            default: false
        }
    },
    render (createElement, { parent, data, children, props }) {
        if (parent.$vuewind.options?.iconComponent && !props.vannila) {
            return createElement(parent.$vuewind.options?.iconComponent, data, children);
        }

        return createElement('div', data, children);
    }
});
