import Vue from 'vue';
import { VNode } from 'vue/types/umd';

export default Vue.extend({
    name: 'WBtn',
    functional: true,
    props: {
        color: {
            type: String,
            default: 'indigo-600'
        },
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
        },
        spinSize: {
            type: String,
            default: '1.3rem'
        },
        spinSeep: {
            type: String,
            default: '1s'
        }
    },
    render (createElement, { props, data, children }) {
        const classes = [
            'hover:bg-gray-400',
            'font-bold',
            'py-2 px-4',
            'items-center',
            'transition delay-150 duration-200 ease-in-out',
            'focus:outline-none'
        ];

        const content: VNode[] = [];

        if (!props.text) {
            classes.push(`bg-${props.color}`, 'text-white');
        } else {
            classes.push(`text-${props.color}`);
        }

        if (props.block) {
            classes.push('w-full', 'block');
        }

        if (props.rounded) {
            classes.push('rounded');
        }

        content.push(
            createElement('w-icon', {
                props: {
                    vanilla: true
                },
                style: {
                    '--size': props.spinSize,
                    '--speed': props.spinSeep,
                    absolute: true
                },
                class: {
                    hidden: !props.loading,
                    'w-btn-loader': true
                }
            })
        );

        content.push(
            createElement(
                'span',
                { class: { 'opacity-0': props.loading } },
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
