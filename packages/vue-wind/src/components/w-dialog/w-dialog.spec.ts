import { mount, VueWrapper } from "@vue/test-utils";
import { afterEach, describe, expect, it } from "vitest";
import { nextTick } from "vue";

import WDialog from "./w-dialog.vue";

let wrapper: VueWrapper;

afterEach(() => {
    if (wrapper) {
        wrapper.unmount();
    }
});

describe("w-dialog", () => {
    it("should render content", () => {
        wrapper = mount(WDialog, {
            props: {
                modelValue: true,
            },
            slots: {
                default: "Hello World",
            },
        });

        expect(wrapper.html()).toContain("Hello World");
    });

    it("should have hidden class when model is false", () => {
        wrapper = mount(WDialog, {
            props: {
                modelValue: false,
            },
        });

        expect(wrapper.classes()).toContain("hidden");
    });

    it("should toggle hidden class based in modelValue prop", async () => {
        wrapper = mount(WDialog, {
            props: {
                modelValue: false,
            },
        });

        expect(wrapper.classes()).toContain("hidden");

        await wrapper.setProps({
            modelValue: true,
        });

        expect(wrapper.classes()).not.toContain("hidden");
    });

    it("should hide dialog when user click in outside content", async () => {
        let modelValue = true;

        wrapper = mount(WDialog, {
            slots: {
                default: "<div>Hello World</div>",
            },
            props: {
                modelValue,
                "onUpdate:modelValue": (v: boolean) => (modelValue = v),
            },
        });

        await wrapper.trigger("click");

        expect(modelValue).toBe(false);
    });

    it("should not hide dialog when user click in content", async () => {
        let modelValue = true;

        wrapper = mount(WDialog, {
            slots: {
                default: "<div class='hello' >Hello World</div>",
            },
            props: {
                modelValue,
                "onUpdate:modelValue": (v: boolean) => (modelValue = v),
            },
        });

        await wrapper.find(".hello").trigger("click");

        expect(modelValue).toBe(true);
    });
});
