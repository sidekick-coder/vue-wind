import { describe, it, assert, vi, afterEach } from "vitest";
import { nextTick } from "vue";
import { mount } from "@vue/test-utils";

import WLayout from "@/components/w-layout/w-layout.vue";
import WToolbar from "@/components/w-toolbar/w-toolbar.vue";
import WDrawer from "./w-drawer.vue";

describe("w-drawer", () => {
    afterEach(() => {
        vi.resetAllMocks();
    });

    it("should set width class using component prop", async () => {
        const wrapper = mount(WDrawer, {
            props: {
                width: "[200px]",
            },
        });

        assert.include(wrapper.attributes("class"), "w-[200px]");
    });

    it("should the height be 100% when toolbarRef not exist", async () => {
        const component = {
            components: { WDrawer, WLayout },
            template: `<w-layout> <w-drawer layout />  </w-layout>`,
        };

        const wrapper = mount(component);

        await nextTick();

        const drawer = wrapper.findComponent(WDrawer);

        assert.include(drawer.attributes("class"), "h-[100%]");
    });

    it("should height be screen height - toolbar height when toolbarRef is defined", async () => {
        vi.spyOn(document.body, "clientHeight", "get").mockImplementation(
            () => 1000
        );

        const component = {
            components: { WLayout, WToolbar, WDrawer },
            template: `
                <w-layout>
                    <w-toolbar layout />
                    <w-drawer layout />
                </w-layout>`,
        };

        const wrapper = mount(component);
        const drawer = wrapper.findComponent(WDrawer);
        const toolbar = wrapper.findComponent(WToolbar);

        vi.spyOn(toolbar.element, "clientHeight", "get").mockImplementation(
            () => 50
        );

        await nextTick();
        await nextTick();
        await nextTick();

        assert.include(drawer.attributes("class"), "h-[950px]");
    });
});