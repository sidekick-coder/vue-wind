import { describe, it, assert } from "vitest";
import { mount } from "@vue/test-utils";

import WCard from "./w-card.vue";

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
