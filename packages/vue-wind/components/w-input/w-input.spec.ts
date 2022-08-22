import { afterEach, expect, it } from "vitest";
import { mount, VueWrapper } from "@vue/test-utils";
import { ComponentPublicInstance, nextTick } from "vue";
import WInput from "./w-input.vue";

let wrapper: VueWrapper<ComponentPublicInstance<typeof WInput>>;

afterEach(() => {
    wrapper?.unmount();
});

it(`should value starts with model-value`, () => {
    wrapper = mount(WInput, {
        props: {
            modelValue: "Hello World",
        },
    });

    const field = wrapper.find<HTMLInputElement>("input");

    expect(field.element.value).toBe("Hello World");
});

it(`should update value according with model-value`, async () => {
    wrapper = mount(WInput, {
        props: {
            modelValue: "",
        },
    });

    const field = wrapper.find<HTMLInputElement>("input");

    expect(field.element.value).toBe("");

    wrapper.setProps({
        modelValue: "Update input",
    });

    await nextTick();

    expect(field.element.value).toBe("Update input");
});

it(`should emit event update:model-value when changing element value`, () => {
    wrapper = mount(WInput);

    const field = wrapper.find<HTMLInputElement>("input");

    field.setValue("Update input");

    expect(wrapper.emitted("update:modelValue")).toBeTruthy();
});
