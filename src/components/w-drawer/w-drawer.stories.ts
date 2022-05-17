import WLayout from "@/components/w-layout/w-layout.vue";
import WDrawer from "@/components/w-drawer/w-drawer.vue";
import WToolbar from "@/components/w-toolbar/w-toolbar.vue";
import WContent from "@/components/w-content/w-content.vue";
import WBtn from "@/components/w-btn/w-btn.vue";

import { ref } from "vue";

export default {
    title: "Components/WDrawer",
    parameters: {
        previewTabs: {
            "storybook/docs/panel": { hidden: true },
        },
        viewMode: "canvas",
    },
    argTypes: {
        leftDrawerWidth: {
            name: "width",
            table: {
                category: "left-drawer",
            },
            control: {
                type: "text",
            },
        },
        rightDrawerWidth: {
            name: "width",
            table: {
                category: "right-drawer",
            },
            control: {
                type: "text",
            },
        },
    },
    args: {
        leftDrawerWidth: "[300px]",
        rightDrawerWidth: "[300px]",
    },
};

const Template = (args: any) => ({
    components: { WLayout, WDrawer, WToolbar, WContent, WBtn },
    setup() {
        const left = ref(true);
        const right = ref(true);

        return { args, left, right };
    },
    template: `
        <w-layout>
            
            <w-drawer
                v-model='left'
                :width='args.leftDrawerWidth'
                layout
                class='bg-sky-500'
            >
                Left Drawer
            </w-drawer>
            
            <w-content layout class='flex items-center bg-gray-50 justify-center'>
                <w-btn @click='left = !left' width='[150px]' class='mr-2' >
                    Toggle left
                </w-btn>
                
                <w-btn @click='right = !right' width='[150px]'>
                    Toggle right
                </w-btn>
            </w-content>

            <w-drawer
                v-model='right'
                layout
                class='bg-sky-500'
                right
            >
                Right Drawer
            </w-drawer>

        </w-layout>`,
});

export const Default = Template.bind({});
