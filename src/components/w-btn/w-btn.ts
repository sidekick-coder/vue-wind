import Vue from 'vue';
import { VNode } from 'vue/types/umd';
import { Props } from './types';

export default Vue.extend<Props>({
    name: 'WBtn',
    functional: true,
    props: {
        defaultClass: {
            type: [String, Object, Array],
            required: false,
            default: () => [
                'hover:bg-gray-400',
                'font-bold',
                'py-2 px-4',
                'items-center',
                'transition delay-150 duration-200 ease-in-out',
                'focus:outline-none'
            ]
        },
        color: {
            type: String,
            default: 'indigo-600'
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
            description: 'Make button border rounded',
            default: false
        },
        loading: {
            type: Boolean,
            description: 'Show loading spin',
            default: false
        },
        spinSize: {
            type: String,
            description: 'Size of loading spin',
            default: '1.3rem'
        },
        spinSeep: {
            type: String,
            description: 'Speed of loading spin',
            default: '1s'
        }
    },
    docs: {
        events: {
            click: {
                description: 'Default click event'
            }
        }
    },
    render (createElement, { props, data, children }) {
        const classes = Array.isArray(props.defaultClass) ? props.defaultClass : [props.defaultClass];

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
                    'w-btn-loader': true,
                    hidden: !props.loading
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
