import { assert, describe, it } from "vitest";
import { mount } from "@vue/test-utils";

import WToolbar from "./w-toolbar.vue";

describe("w-toolbar", () => {
    it("should set height class using component prop", () => {
        const wrapper = mount(WToolbar, {
            props: {
                height: "[200px]",
            },
        });

        assert.include(wrapper.attributes("class"), "h-[200px]");
    });

    it("should set color class using component prop", () => {
        const wrapper = mount(WToolbar, {
            props: {
                color: "[#eee]",
            },
        });

        assert.include(wrapper.attributes("class"), "bg-[#eee]");
    });
});
