import { mount, VueWrapper } from "@vue/test-utils";
import { afterEach, describe, expect, it } from "vitest";

import WBtn from "./w-btn.vue";

let wrapper: VueWrapper;

afterEach(() => {
    wrapper?.unmount();
});

describe("w-btn", () => {
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
                color: "[#eee]",
            },
        });

        expect(wrapper.attributes("class")).toContain("bg-[#eee]");
    });

    it("should set text color", () => {
        wrapper = mount(WBtn, {
            props: {
                textColor: "[#eee]",
            },
        });

        expect(wrapper.attributes("class")).toContain("text-[#eee]");
    });

    it("should set width", () => {
        wrapper = mount(WBtn, {
            props: {
                width: "[100px]",
            },
        });

        expect(wrapper.attributes("class")).toContain("w-[100px]");
    });

    it("should set text-size", () => {
        wrapper = mount(WBtn, {
            props: {
                textSize: "[3rem]",
            },
        });

        expect(wrapper.attributes("class")).toContain("text-[3rem]");
    });
});
