import Vue from "vue";

export default Vue.extend({
    name: "WList",
    functional: true,
    render(createElement, { data, children }) {
        const classes = {};

        data.class = {
            ...data.class,
            ...classes
        };

        return createElement("div", data, children);
    }
});
