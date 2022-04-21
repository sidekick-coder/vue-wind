import { mount, VueWrapper } from "@vue/test-utils";
import { afterEach, describe, expect, it } from "vitest";
import { ComponentPublicInstance, nextTick } from "vue";

import WTextarea from "./w-textarea.vue";
let wrapper: VueWrapper<ComponentPublicInstance<typeof WTextarea>>;

afterEach(() => {
    wrapper?.unmount();
});

describe("w-textarea", () => {
    it("should set min height", () => {
        wrapper = mount(WTextarea, {
            props: {
                minHeight: "[100px]",
            },
        });

        const textarea = wrapper.find("textarea");

        expect(textarea.classes()).toContain("min-h-[100px]");
    });
});
