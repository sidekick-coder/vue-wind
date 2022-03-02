import { assert, describe, it, vi } from "vitest";
import { mount } from "@vue/test-utils";

import WLayout from "./w-layout.vue";

describe("w-layout", () => {
    it("should have provided child component refs", async () => {
        const wrapper = mount(WLayout);

        assert.isDefined(wrapper.vm.drawerRef);
        assert.isDefined(wrapper.vm.toolbarRef);
        assert.isDefined(wrapper.vm.contentRef);
    });
});
