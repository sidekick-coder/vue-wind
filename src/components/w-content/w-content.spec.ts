import { describe, it, assert, vi, afterEach } from "vitest";
import { nextTick } from "vue";
import { mount, VueWrapper } from "@vue/test-utils";

import WLayout from "@/components/w-layout/w-layout.vue";
import WToolbar from "@/components/w-toolbar/w-toolbar.vue";
import WContent from "./w-content.vue";

let wrapper: VueWrapper;

afterEach(() => {
    vi.resetAllMocks();

    if (wrapper) {
        wrapper.unmount();
    }
});

describe.skip("w-content", () => {
    it("should the height be 100% when toolbarRef not exist", async () => {
        const component = {
            components: { WContent, WLayout },
            template: `<w-layout> <w-content layout></w-content>  </w-layout>`,
        };

        wrapper = mount(component);

        await nextTick();

        const content = wrapper.findComponent(WContent);

        assert.include(content.attributes("class"), "h-[100%]");
    });

    it("should height be screen height - toolbar height when toolbarRef is defined", async () => {
        vi.spyOn(document.body, "clientHeight", "get").mockImplementation(
            () => 1000
        );

        const component = {
            components: { WLayout, WToolbar, WContent },
            template: `
                <w-layout>
                    <w-toolbar layout />
                    <w-content layout />
                </w-layout>`,
        };

        wrapper = mount(component);
        const content = wrapper.findComponent(WContent);
        const toolbar = wrapper.findComponent(WToolbar);

        vi.spyOn(toolbar.element, "clientHeight", "get").mockImplementation(
            () => 50
        );

        await nextTick();
        await nextTick();
        await nextTick();

        assert.include(content.attributes("class"), "h-[950px]");
    });
});
