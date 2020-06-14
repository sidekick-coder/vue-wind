import Vue from "vue";

export default Vue.extend({
    name: "WCard",
    functional: true,
    props: {
        color: {
            type: String,
            required: false,
            default: "white"
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
            default: "gray-200"
        },
        borderStyle: {
            type: String,
            required: false,
            default: "solid"
        },
        maxWidth: {
            type: String,
            required: false,
            default: "gray-200"
        },
        width: {
            type: String,
            required: false,
            default: "100%"
        },
        shadow: {
            type: [Boolean, String],
            required: false,
            default: true
        }
    },
    render(createElement, { props, data, children }) {
        const classes: any = {};
        const styles = [`width:${props.width}`];
        let style = data.style || "";

        if (props.color) {
            classes[`bg-${props.color}`] = true;
        }

        if (props.rounded) {
            classes.rounded = true;
        }

        if (props.border) {
            classes.border = true;
        }

        if (props.border && props.borderColor) {
            classes[`border-${props.borderColor}`] = true;
        }

        if (props.border && props.borderStyle) {
            classes[`border-${props.borderStyle}`] = true;
        }

        if (props.maxWidth.includes("px")) {
            styles.push(`max-width: ${props.maxWidth}`);
        } else {
            classes[`max-w-${props.maxWidth}`] = true;
        }

        if (props.shadow === true) {
            classes.shadow = true;
        } else if (props.shadow) {
            classes[`shadow-${props.shadow}`] = true;
        }

        if (Array.isArray(data.class)) {
            data.class.forEach((c) => {
                classes[c] = true;
            });
            data.class = classes;
        } else {
            data.class = {
                ...data.class,
                ...classes
            };
        }

        style += styles.join(";");

        data.style = style;

        return createElement("div", data, children);
    }
});
