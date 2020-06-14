import Vue from "vue";
import { VNode } from "vue/types/umd";

export default Vue.extend({
    functional: true,
    name: "WListItem",
    props: {
        contentDefaulClass: {
            type: [String, Object, Array],
            default: () => ["flex items-center px-5 py-2"]
        },
        to: {
            type: [String, Object],
        }
    },
    render(createElement, { data, children, slots, props }) {
        const itemChildren: VNode[] = [];

        if (props.to) {
            itemChildren.push(
                createElement(
                    "router-link",
                    {
                        props: { to: props.to },
                        class: props.contentDefaulClass
                    },
                    children
                )
            );
        } else {
            itemChildren.push(
                createElement("div", { class: props.contentDefaulClass }, children)
            );
        }

        return createElement("div", data, itemChildren);
    }
});
