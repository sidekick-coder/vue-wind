import WLayout from "./w-layout.vue";
import WDrawer from "./../w-drawer/w-drawer.vue";
import WToolbar from "./../w-toolbar/w-toolbar.vue";
import WContent from "./../w-content/w-content.vue";

export default {
    title: "Components/WLayout",
    component: WLayout,
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

const lorem =
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit. \n`.repeat(50);

const Template = (args: any) => ({
    components: { WLayout, WDrawer, WToolbar, WContent },
    setup() {
        return { args, lorem };
    },
    template: `
        <w-layout>
            <w-drawer layout-id='left' :width='args.leftDrawerWidth' layout class='bg-sky-500' >
                Left Drawer

                <p class='whitespace-pre-line' >{{lorem}}</p>
            </w-drawer>
            
            <w-content>
                
                <w-layout use-percentage>
                    <w-toolbar color='red-500' layout-ignore='["right"]' >
                        Toolbar
                    </w-toolbar>
                    
                    <w-content class='bg-gray-500' >
                        <p class='whitespace-pre-line' >{{lorem}}</p>
                    </w-content>

                    <w-drawer layout-id='right' :width='args.rightDrawerWidth' layout class='bg-sky-500' >
                        Right Drawer

                        <p class='whitespace-pre-line' >{{lorem}}</p>
                    </w-drawer>
                </w-layout>

            </w-content>


        </w-layout>`,
});

export const Default = Template.bind({});
