import Vue from "vue";

export default Vue.extend({
    name: "WBtn",
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
    render(createElement, { props, data, children }) {
        const classes: any[] = [
            {
                "hover:bg-gray-400": true,
                "font-bold": true,
                "py-2 px-4": true,
                "items-center": true
            }
        ];

        const content: any[] = [];

        if (!props.text) {
            classes.push({
                "bg-indigo-600": true,
                "text-white": true
            });
        }
        if (props.block) {
            classes.push({
                "w-full": true,
                block: true
            });
        }

        if (props.rounded) {
            classes.push({
                rounded: true
            });
        }
        content.push(
            createElement("w-icon", {
                class: {
                    hidden: !props.loading
                }
            })
        );
        content.push(
            createElement(
                "span",
                { class: { hidden: props.loading } },
                children
            )
        );
        classes.forEach((c) => {
            data.class = {
                ...data.class,
                ...c
            };
        });
        return createElement("button", data, content);
    }
});
