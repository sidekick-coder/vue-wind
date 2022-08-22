import { mount, VueWrapper } from "@vue/test-utils";
import { afterEach, describe, expect, it } from "vitest";

import WBtn from "./w-btn.vue";

let wrapper: VueWrapper;

afterEach(() => {
    wrapper?.unmount();
});


it("it should render a <button>", () => {
    wrapper = mount(WBtn);

    expect(wrapper.find("button").exists()).toBeTruthy();
});

it("it should render the content", () => {
    wrapper = mount(WBtn, {
        slots: {
            default: "Hello World",
        },
    });

    expect(wrapper.text()).toContain("Hello World");
});

it("should add color class to button component", () => {
    wrapper = mount(WBtn, {
        props: {
            color: "blue",
        },
    });

    expect(wrapper.attributes("class")).toContain("bg-blue-500");
});

