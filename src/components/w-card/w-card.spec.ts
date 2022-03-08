import { describe, it, assert, afterEach, beforeEach } from "vitest";
import { mount, VueWrapper } from "@vue/test-utils";

import WCard from "./w-card.vue";

let wrapper: VueWrapper;

beforeEach(() => {
    wrapper = mount(WCard);
});

afterEach(() => {
    wrapper.unmount();
});

describe("w-card", () => {
    it("should render the content", () => {
        const wrapper = mount(WCard, {
            slots: {
                default: "<div>Hello World</div>",
            },
        });

        assert.equal(wrapper.text(), "Hello World");
    });
});
