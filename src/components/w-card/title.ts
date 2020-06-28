import Vue from 'vue';

export default Vue.extend({
    name: 'WCardTitle',
    functional: true,
    render (createElement, { data, children }) {
        const classes = {
            'px-5': true,
            'py-4': true
        };

        data.class = {
            ...data.class,
            ...classes
        };

        return createElement('div', data, children);
    }
});
