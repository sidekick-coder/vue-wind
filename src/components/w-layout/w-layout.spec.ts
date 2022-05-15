import { afterEach, assert, describe, it, vi } from "vitest";
import { mount, VueWrapper } from "@vue/test-utils";
import { ComponentPublicInstance } from "vue";

import WLayout from "./w-layout.vue";

let wrapper: VueWrapper<ComponentPublicInstance<typeof WLayout>>;

afterEach(() => {
    vi.resetAllMocks();

    if (wrapper) {
        wrapper.unmount();
    }
});

describe.skip("w-layout", () => {
    it("should have provided child component refs", async () => {
        wrapper = mount(WLayout);

        assert.isDefined(wrapper.vm.drawerRef);
        assert.isDefined(wrapper.vm.toolbarRef);
        assert.isDefined(wrapper.vm.contentRef);
    });
});
