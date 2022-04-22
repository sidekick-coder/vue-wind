import { afterEach, describe, expect, it } from "vitest";
import { mount, VueWrapper } from "@vue/test-utils";
import { ComponentPublicInstance, nextTick, ref } from "vue";

import WInput from "@/components/w-input/w-input.vue";
import WTextarea from "@/components/w-textarea/w-textarea.vue";
import { formKey } from "@/components/w-form/composable";

const cases = [
    {
        name: "WInput",
        component: WInput,
        elementName: "input",
    },
    {
        name: "WTextarea",
        component: WTextarea,
        elementName: "textarea",
    },
];

let wrapper: VueWrapper<ComponentPublicInstance<typeof WInput>>;

afterEach(() => {
    wrapper?.unmount();
});

describe.each(cases)("General: $name", ({ component, elementName }) => {
    it(`should render ${elementName} element`, () => {
        wrapper = mount(component);

        expect(wrapper.find(elementName).exists()).toBeTruthy();
    });

    it("should set label", () => {
        wrapper = mount(component, {
            props: {
                label: "Hello World",
            },
        });

        const label = wrapper.find("label");

        expect(label.text()).toContain("Hello World");
    });

    it(`should ${elementName} value starts with model-value`, () => {
        wrapper = mount(component, {
            props: {
                modelValue: "Hello World",
            },
        });

        const field = wrapper.find<HTMLInputElement>(elementName);

        expect(field.element.value).toBe("Hello World");
    });

    it(`should ${elementName} update value according with model-value`, async () => {
        wrapper = mount(component);

        const field = wrapper.find<HTMLInputElement>(elementName);

        expect(field.element.value).toBe("");

        wrapper.setProps({
            modelValue: "Update input",
        });

        await nextTick();

        expect(field.element.value).toBe("Update input");
    });

    it(`should emit event update:model-value when changing ${elementName} element value`, () => {
        wrapper = mount(component);

        const field = wrapper.find<HTMLInputElement>(elementName);

        field.setValue("Update input");

        expect(wrapper.emitted("update:modelValue")).toBeTruthy();
    });

    it("should validate() function use rules props to validate the model", () => {
        wrapper = mount(component, {
            props: {
                rules: [(v: string) => !!v || "This field is required"],
            },
        });

        const result = wrapper.vm.validate("");

        expect(result).toBe(false);
    });

    it("should show error message when validation failed", async () => {
        wrapper = mount(component, {
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

        wrapper = mount(component, {
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
        wrapper = mount(component);

        wrapper.vm.messages = ["message 1", "message 2"];

        await nextTick();

        const small = wrapper.findAll("small");

        expect(small.length).toBe(1);
    });

    it("should add validate function to parent form if is available", async () => {
        const form = {
            inputs: ref([]),
            resets: ref([]),
        };

        wrapper = mount(component, {
            global: {
                provide: {
                    [formKey as any]: form,
                },
            },
        });

        expect(form.inputs.value.length).toBe(1);
    });

    it("should remove validate function is component is unmounted", () => {
        const form = {
            inputs: ref([]),
            resets: ref([]),
        };

        wrapper = mount(component, {
            global: {
                provide: {
                    [formKey as any]: form,
                },
            },
        });

        expect(form.inputs.value.length).toBe(1);

        wrapper.unmount();

        expect(form.inputs.value.length).toBe(0);
    });

    it("should <label> element do not have 'for' attribute when id is not defined", () => {
        wrapper = mount(component, {
            props: {
                label: "Test",
            },
        });

        const label = wrapper.find("label");

        expect(label.attributes("for")).toBeUndefined();
    });

    it("should <label> element have for attribute when id is defined", () => {
        wrapper = mount(component, {
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

    it(`should ${elementName} focus border color be prop color`, () => {
        wrapper = mount(component, {
            props: {
                color: "red-500",
            },
        });

        const field = wrapper.find<HTMLInputElement>(elementName);

        expect(field.classes()).toContain("focus:border-red-500");
    });

    it(`should ${elementName} have placeholder`, () => {
        wrapper = mount(component, {
            attrs: {
                placeholder: "Test placeholder",
            },
        });

        const field = wrapper.find<HTMLInputElement>(elementName);

        expect(field.attributes("placeholder")).toBe("Test placeholder");
    });

    it(`should hide error message when reset validation`, async () => {
        wrapper = mount(component, {
            props: {
                rules: [(v: string) => !!v || "This field is required"],
            },
        });

        wrapper.vm.validate("");

        await nextTick();

        expect(wrapper.find("small").exists()).toBeTruthy();

        wrapper.vm.resetValidation();

        await nextTick();

        expect(wrapper.find("small").exists()).toBeFalsy();
    });
});
