import { describe, it, assert, afterEach } from "vitest";
import { mount, VueWrapper } from "@vue/test-utils";

import WCard from "./w-card.vue";
import { nextTick } from "process";

let wrapper: VueWrapper;

afterEach(() => {
    wrapper.unmount();
});

describe("w-card", () => {
    it("should render the content", () => {
        wrapper = mount(WCard, {
            slots: {
                default: "<div>Hello World</div>",
            },
        });

        assert.equal(wrapper.text(), "Hello World");
    });

    it("should use width prop in the class", () => {
        wrapper = mount(WCard, {
            props: {
                width: "[500px]",
            },
        });

        assert.include(wrapper.attributes("class"), "w-[500px]");
    });

    it("should not have max-width by default", () => {
        wrapper = mount(WCard);

        assert.notInclude(wrapper.attributes("class"), "max-w");
    });

    it("should use max-width class based in prop value", () => {
        wrapper = mount(WCard, {
            props: {
                maxWidth: "[500px]",
            },
        });

        assert.include(wrapper.attributes("class"), "max-w-[500px]");
    });
});
