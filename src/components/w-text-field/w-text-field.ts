import Vue from 'vue';
import WInput from '../w-input';

export default Vue.extend({
    name: 'WTextField',
    functional: true,
    model: {
        event: 'update:value'
    },
    render (createElement, { data, children }) {
        const input = createElement(WInput, {
            ...data,
            props: { component: 'input' }
        }, children);
        return createElement('div', [input]);
    }
});
