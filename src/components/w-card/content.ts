import Vue from 'vue';

export default Vue.extend({
    name: 'WCardContent',
    functional: true,
    render (createElement, { data, children }) {
        const classes = {
            'p-5': true
        };

        data.class = {
            ...data.class,
            ...classes
        };

        return createElement('div', data, children);
    }
});
