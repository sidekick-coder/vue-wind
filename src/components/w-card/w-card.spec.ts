import { describe, it, assert, afterEach } from "vitest";
import { mount, VueWrapper } from "@vue/test-utils";

import WCard from "./w-card.vue";

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

    it("should have max-width class", () => {
        wrapper = mount(WCard, {
            props: {
                maxWidth: "[500px]",
            },
        });

        assert.include(wrapper.attributes("class"), "max-w-[500px]");
    });

    it("should not set height by default", () => {
        wrapper = mount(WCard);

        assert.notInclude(wrapper.attributes("class"), "h-");
    });

    it("should set height", () => {
        wrapper = mount(WCard, {
            props: {
                height: "[500px]",
            },
        });

        assert.include(wrapper.attributes("class"), "h-[500px]");
    });

    it("should not set min-height by default", () => {
        wrapper = mount(WCard);

        assert.notInclude(wrapper.attributes("class"), "min-h");
    });

    it("should set min-height", () => {
        wrapper = mount(WCard, {
            props: {
                minHeight: "[500px]",
            },
        });

        assert.include(wrapper.attributes("class"), "min-h-[500px]");
    });

    it("should set card color", () => {
        wrapper = mount(WCard, {
            props: {
                color: "[#eee]",
            },
        });

        assert.include(wrapper.attributes("class"), "bg-[#eee]");
    });
});
