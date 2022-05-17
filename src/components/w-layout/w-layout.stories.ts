import WLayout from "./w-layout.vue";
import WDrawer from "./../w-drawer/w-drawer.vue";
import WToolbar from "./../w-toolbar/w-toolbar.vue";
import WContent from "./../w-content/w-content.vue";

export default {
    title: "Components/WLayout",
    parameters: {
        previewTabs: {
            "storybook/docs/panel": { hidden: true },
        },
        viewMode: "canvas",
    },
};

const lorem =
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit. \n`.repeat(50);

const Template = (args: any) => ({
    components: { WLayout, WDrawer, WToolbar, WContent },
    setup() {
        return { args, lorem };
    },
    template: `
        <w-layout>
            <w-drawer class='bg-sky-500' >
                Left Drawer

                <p class='whitespace-pre-line' >{{lorem}}</p>
            </w-drawer>
            
            <w-content>
                
                <w-layout use-percentage>
                    <w-toolbar color='red-500' layout-ignore='right' >
                        Toolbar
                    </w-toolbar>
                    
                    <w-content class='bg-gray-500' >
                        <div class="overflow-auto h-full">
                         <p class='whitespace-pre-line' >{{lorem}}</p>
                        </div>
                    </w-content>

                    <w-drawer right layout-id='right' :width='args.rightDrawerWidth' class='bg-sky-500' >
                        Right Drawer

                        <p class='whitespace-pre-line' >{{lorem}}</p>
                    </w-drawer>
                </w-layout>

            </w-content>


        </w-layout>`,
});

export const Default = Template.bind({});
