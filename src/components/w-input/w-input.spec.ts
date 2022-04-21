import { mount, VueWrapper } from "@vue/test-utils";
import { afterEach, describe, expect, it } from "vitest";
import { ComponentPublicInstance, nextTick, ref } from "vue";
import { formKey } from "../w-form/composable";

import WInput from "./w-input.vue";

let wrapper: VueWrapper<ComponentPublicInstance<typeof WInput>>;

afterEach(() => {
    wrapper?.unmount();
});

describe("w-input", () => {
    it("should a <input> element", () => {
        wrapper = mount(WInput);

        expect(wrapper.find("input").exists()).toBeTruthy();
    });

    it("should set input label", () => {
        wrapper = mount(WInput, {
            props: {
                label: "Hello World",
            },
        });

        const label = wrapper.find("label");

        expect(label.text()).toContain("Hello World");
    });

    it("should <input> value starts with model-value", () => {
        wrapper = mount(WInput, {
            props: {
                modelValue: "Hello World",
            },
        });

        const input = wrapper.find("input");

        expect(input.element.value).toBe("Hello World");
    });

    it("should <input> update value according with model-value", async () => {
        wrapper = mount(WInput);

        const input = wrapper.find("input");

        expect(input.element.value).toBe("");

        wrapper.setProps({
            modelValue: "Update input",
        });

        await nextTick();

        expect(input.element.value).toBe("Update input");
    });

    it("should emit event update:model-value when changing <input> element value", () => {
        wrapper = mount(WInput);

        const input = wrapper.find("input");

        input.setValue("Update input");

        expect(wrapper.emitted("update:modelValue")).toBeTruthy();
    });

    it("should validate() function use rules props to validate the <input> value", () => {
        wrapper = mount(WInput, {
            props: {
                rules: [(v: string) => !!v || "This field is required"],
            },
        });

        const result = wrapper.vm.validate("");

        expect(result).toBe(false);
    });

    it("should show error message with validation fail", async () => {
        wrapper = mount(WInput, {
            props: {
                rules: [(v: string) => !!v || "This field is required"],
            },
        });

        wrapper.vm.validate("");

        await nextTick();

        const small = wrapper.find("small");

        expect(small.exists()).toBeTruthy();
        expect(small.text()).toBe("This field is required");
    });

    it("should error message be hidden when validation is fixed", async () => {
        let modelValue = "Hello World";

        wrapper = mount(WInput, {
            props: {
                rules: [(v: string) => !!v || "This field is required"],
                modelValue,
                "onUpdate:modelValue": (v: string) => (modelValue = v),
            },
        });

        await wrapper.setProps({
            modelValue: "",
        });

        expect(wrapper.find("small").exists()).toBeTruthy();

        await wrapper.setProps({
            modelValue: "update model",
        });

        expect(wrapper.find("small").exists()).toBeFalsy();
    });

    it("should show only one message per time", async () => {
        wrapper = mount(WInput);

        wrapper.vm.messages = ["message 1", "message 2"];

        await nextTick();

        const small = wrapper.findAll("small");

        expect(small.length).toBe(1);
    });

    it("should add validate function to parent form if is available", async () => {
        const inputs = ref([]);

        wrapper = mount(WInput, {
            global: {
                provide: {
                    [formKey as symbol]: {
                        inputs: inputs,
                    },
                },
            },
        });

        expect(inputs.value.length).toBe(1);
    });

    it("should remove validate function is component is unmounted", () => {
        const inputs = ref([]);

        wrapper = mount(WInput, {
            global: {
                provide: {
                    [formKey as symbol]: {
                        inputs: inputs,
                    },
                },
            },
        });

        expect(inputs.value.length).toBe(1);

        wrapper.unmount();

        expect(inputs.value.length).toBe(0);
    });

    it("should <label> element do not have for attribute when id is not defined", () => {
        wrapper = mount(WInput, {
            props: {
                label: "Test",
            },
        });

        const label = wrapper.find("label");

        expect(label.attributes("for")).toBeUndefined();
    });

    it("should <label> element have for attribute when id is defined", () => {
        wrapper = mount(WInput, {
            props: {
                label: "Test",
            },
            attrs: {
                id: "test-id",
            },
        });

        const label = wrapper.find("label");

        expect(label.attributes("for")).toBe("test-id");
    });

    it("should focus border color be prop color", () => {
        wrapper = mount(WInput, {
            props: {
                color: "red",
            },
        });

        const input = wrapper.find("input");

        expect(input.classes()).toContain("focus:border-red");
    });
});
