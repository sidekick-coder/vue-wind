import Vue from 'vue';
import { VNode } from 'vue/types/umd';

export default Vue.extend({
    name: 'WBtn',
    functional: true,
    props: {
        loading: {
            type: Boolean,
            default: false
        },
        text: {
            type: Boolean,
            default: false
        },
        block: {
            type: Boolean,
            default: false
        },
        rounded: {
            type: Boolean,
            default: false
        }
    },
    render (createElement, { props, data, children }) {
        const classes = [
            'hover:bg-gray-400',
            'font-bold',
            'py-2 px-4',
            'items-center'
        ];

        const content: VNode[] = [];

        if (!props.text) {
            classes.push('bg-indigo-600', 'text-white');
        }
        if (props.block) {
            classes.push('w-full', 'block');
        }

        if (props.rounded) {
            classes.push('rounded');
        }
        content.push(
            createElement('w-icon', {
                class: {
                    hidden: !props.loading
                }
            })
        );
        content.push(
            createElement(
                'span',
                { class: { hidden: props.loading } },
                children
            )
        );
        classes.forEach((className) => {
            data.class = {
                ...data.class,
                [className]: true
            };
        });
        return createElement('button', data, content);
    }
});
