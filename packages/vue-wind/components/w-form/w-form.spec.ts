import { afterEach, describe, it, assert, expect, vi } from "vitest";
import { mount, VueWrapper } from "@vue/test-utils";
import { ComponentPublicInstance, nextTick } from "vue";

import WForm from "./w-form.vue";
import WInput from "../w-input/w-input.vue";

let wrapper: VueWrapper<ComponentPublicInstance<typeof WForm>>;

afterEach(() => {
    wrapper?.unmount();
});

describe("w-form", () => {
    it("should render the content", () => {
        wrapper = mount(WForm, {
            slots: {
                default: "<div>Hello World</div>",
            },
        });

        assert.equal(wrapper.text(), "Hello World");
    });

    it("should render a <form> element", () => {
        wrapper = mount(WForm);

        assert.equal(wrapper.find("form").exists(), true);
    });

    it("should emit submit event", async () => {
        wrapper = mount(WForm);

        await wrapper.find("form").trigger("submit");

        expect(wrapper.emitted().submit).toHaveLength(1);
    });

    it("should not emit an event when have an invalid w-input", async () => {
        const component = {
            components: { WForm, WInput },
            template: `
                <w-form>
                    <w-input v-model="modelValue" :rules='[required]' />
                </w-form>
            `,
            data() {
                return {
                    modelValue: "",
                    required: (v: string) => !!v || "Required",
                };
            },
        };

        wrapper = mount(component);

        const wForm = wrapper.findComponent(WForm);

        await wrapper.find("form").trigger("submit");

        expect(wForm.emitted().submit).toBeUndefined();
    });

    it("should validate all child w-inputs", async () => {
        const component = {
            components: { WForm, WInput },
            template: `
                <w-form>
                    <w-input v-model="modelValue" :rules='[required]' />
                    <w-input v-model="modelValue" :rules='[required]' />
                    <w-input v-model="modelValue" :rules='[required]' />
                </w-form>
            `,
            data() {
                return {
                    modelValue: "",
                    required: (v: string) => !!v || "Required",
                };
            },
        };

        wrapper = mount(component);

        await wrapper.find("form").trigger("submit");

        const messages = wrapper.findAll("small");

        expect(messages.length).toBe(3);
    });

    it("should reset validation of all child w-inputs", async () => {
        const component = {
            components: { WForm, WInput },
            template: `
                <w-form>
                    <w-input v-model="modelValue" :rules='[required]' />
                    <w-input v-model="modelValue" :rules='[required]' />
                    <w-input v-model="modelValue" :rules='[required]' />
                </w-form>
            `,
            data() {
                return {
                    modelValue: "",
                    required: (v: string) => !!v || "Required",
                };
            },
        };

        wrapper = mount(component);

        const wForm = wrapper.findComponent(WForm);

        await wrapper.find("form").trigger("submit");

        expect(wrapper.findAll("small").length).toBe(3);

        wForm.vm.reset(true);

        await nextTick();

        console.log(wrapper.html())

        expect(wrapper.findAll("small").length).toBe(0);
    });
});
