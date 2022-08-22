import { afterEach, expect, it } from "vitest";
import { mount, VueWrapper } from "@vue/test-utils";
import { ComponentPublicInstance, nextTick } from "vue";
import WSelect from "./w-select.vue";

let wrapper: VueWrapper<ComponentPublicInstance<typeof WSelect>>;

afterEach(() => {
    wrapper?.unmount();
});

it("should render options array of strings", () => {
    wrapper = mount(WSelect, {
        props: {
            options: ["Hello", "World"],
        },
    });

    const options = wrapper.findAll("option");

    expect(options.length).toBe(2);
    expect(options.at(0)?.attributes().value).toBe("Hello");
});

it("should render options", () => {
    wrapper = mount(WSelect, {
        props: {
            valueKey: "value",
            options: [
                {
                    label: "Option 1",
                    value: "option-1",
                },
                {
                    label: "Option 2",
                    value: "option-2",
                },
            ],
        },
    });

    const options = wrapper.findAll("option");

    expect(options.length).toBe(2);
});

it("should v-model be object valueKey", async () => {
    let modelValue;

    wrapper = mount(WSelect, {
        props: {
            valueKey: "value",
            modelValue: modelValue,
            "onUpdate:modelValue": (v: string) => (modelValue = v),
            options: [
                {
                    label: "Option 1",
                    value: "option-1",
                },
                {
                    label: "Option 2",
                    value: "option-2",
                },
            ],
        },
    });

    const select = wrapper.find("select");

    await select.setValue("option-1");

    expect(modelValue).toBe("option-1");
});

it("should v-model be option element selected", async () => {
    wrapper = mount(WSelect, {
        props: {
            modelValue: "option-1",
            options: ["", "option-1", "option-2"],
        },
    });

    const select = wrapper.find("select");

    await select.setValue("option-1");

    const option = wrapper.findAll("option");

    expect(option.at(1)?.attributes().selected).toBe("true");
});
