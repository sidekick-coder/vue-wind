import Vue from 'vue';

export default Vue.extend({
    name: 'WCard',
    functional: true,
    props: {
        color: {
            type: String,
            required: false,
            default: 'white'
        },
        rounded: {
            type: Boolean,
            required: false,
            default: true
        },
        border: {
            type: Boolean,
            required: false,
            default: false
        },
        borderColor: {
            type: String,
            required: false,
            default: 'gray-200'
        },
        borderStyle: {
            type: String,
            required: false,
            default: 'solid'
        },
        maxWidth: {
            type: String,
            required: false,
            default: null
        },
        width: {
            type: String,
            required: false,
            default: '100%'
        },
        minHeight: {
            type: String,
            required: false,
            default: null
        },
        height: {
            type: String,
            required: false,
            default: null
        },
        shadow: {
            type: [Boolean, String],
            required: false,
            default: true
        }
    },
    render (createElement, { props, data, children }) {
        const classes: string[] = [];
        const styles = [`width:${props.width}`];
        let style = data.style || '';

        if (props.color) {
            classes.push(`bg-${props.color}`);
        }

        if (props.rounded) {
            classes.push('rounded');
        }

        if (props.border) {
            classes.push('border');
        }

        if (props.border && props.borderColor) {
            classes.push(`border-${props.borderColor}`);
        }

        if (props.border && props.borderStyle) {
            classes.push(`border-${props.borderStyle}`);
        }

        if (props.maxWidth && props.maxWidth.includes('px')) {
            styles.push(`max-width: ${props.maxWidth}`);
        } else {
            classes.push(`max-w-${props.maxWidth}`);
        }

        if (props.minHeight) {
            styles.push(`min-height: ${props.minHeight}`);
        }

        if (props.height) {
            styles.push(`height: ${props.height}`);
        }

        if (props.shadow === true) {
            classes.push('shadow');
        } else if (props.shadow) {
            classes.push(`shadow-${props.shadow}`);
        }

        classes.forEach(className => {
            data.class = {
                ...data.class,
                [className]: true
            };
        });

        style += styles.join(';');

        data.style = style;

        return createElement('div', data, children);
    }
});
