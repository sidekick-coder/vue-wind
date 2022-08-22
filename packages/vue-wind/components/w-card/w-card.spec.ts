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


    it("should set card color", () => {
        wrapper = mount(WCard, {
            props: {
                color: "blue",
            },
        });

        assert.include(wrapper.attributes("class"), "bg-blue-500");
    });
});
