import { afterEach, assert, describe, it } from "vitest";
import { mount, VueWrapper } from "@vue/test-utils";

import WToolbar from "./w-toolbar.vue";

let wrapper: VueWrapper;

afterEach(() => {
    if (wrapper) {
        wrapper.unmount();
    }
});

describe("w-toolbar", () => {
    it("should set height class using component prop", () => {
        wrapper = mount(WToolbar, {
            props: {
                height: "[200px]",
            },
        });

        assert.include(wrapper.attributes("class"), "h-[200px]");
    });

    it("should set color class using component prop", () => {
        wrapper = mount(WToolbar, {
            props: {
                color: "[#eee]",
            },
        });

        assert.include(wrapper.attributes("class"), "bg-[#eee]");
    });
});
