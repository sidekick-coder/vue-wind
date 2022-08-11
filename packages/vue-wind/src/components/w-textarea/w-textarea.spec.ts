import { mount, VueWrapper } from "@vue/test-utils";
import { afterEach, describe, expect, it } from "vitest";
import { ComponentPublicInstance, nextTick } from "vue";

import WTextarea from "./w-textarea.vue";
let wrapper: VueWrapper<ComponentPublicInstance<typeof WTextarea>>;

afterEach(() => {
    wrapper?.unmount();
});
it(`should value starts with model-value`, () => {
    wrapper = mount(WTextarea, {
        props: {
            modelValue: "Hello World",
        },
    });

    const field = wrapper.find<HTMLInputElement>("textarea");

    expect(field.element.value).toBe("Hello World");
});

it(`should update value according with model-value`, async () => {
    wrapper = mount(WTextarea, {
        props: {
            modelValue: "",
        },
    });

    const field = wrapper.find<HTMLInputElement>("textarea");

    expect(field.element.value).toBe("");

    wrapper.setProps({
        modelValue: "Update input",
    });

    await nextTick();

    expect(field.element.value).toBe("Update input");
});

it(`should emit event update:model-value when changing element value`, () => {
    wrapper = mount(WTextarea);

    const field = wrapper.find<HTMLInputElement>("textarea");

    field.setValue("Update input");

    expect(wrapper.emitted("update:modelValue")).toBeTruthy();
});

it("should set min height", () => {
    wrapper = mount(WTextarea, {
        props: {
            minHeight: "[100px]",
        },
    });

    const textarea = wrapper.find("textarea");

    expect(textarea.classes()).toContain("min-h-[100px]");
});
