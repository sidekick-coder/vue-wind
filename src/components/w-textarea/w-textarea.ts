import Vue from 'vue';
import WInput from '../w-input';

export default Vue.extend({
    functional: true,
    model: {
        event: 'update:value'
    },
    render (createElement, { data, children }) {
        const input = createElement(WInput, {
            ...data,
            props: { component: 'textarea' }
        }, children);
        return createElement('div', [input]);
    }
});
