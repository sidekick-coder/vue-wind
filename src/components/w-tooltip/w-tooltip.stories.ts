import WTooltip from "./w-tooltip.vue";
import WBtn from "@/components/w-btn/w-btn.vue";

export default {
    title: "Components/WTooltip",
    component: WTooltip,
    argTypes: {
        label: {
            control: "text",
            defaultValue: "My Label",
        },
        color: {
            table: { category: "props" },
            control: { type: "inline-radio" },
            options: ["gray-500", "teal-500", "red-500", "blue-500"],
        },
    },
    args: {
        color: "gray-500",
    },
};

const Template = (args: any) => ({
    components: { WTooltip, WBtn },
    setup() {
        return { args };
    },
    template: `
        <div class='h-screen w-screen flex gap-4 items-center justify-center'>
            
            <w-tooltip v-bind="args">
                <w-btn>Left</w-btn>
            </w-tooltip>       
        
        
            <w-tooltip v-bind="args" position="top">
                <w-btn>Top</w-btn>
            </w-tooltip>
            
            <w-tooltip v-bind="args" position="top">
                <w-btn>Bottom</w-btn>
            </w-tooltip>
            
            <w-tooltip v-bind="args" position="top">
                <w-btn>Right</w-btn>
            </w-tooltip>
            
        </div>
    `,
});

export const Default = Template.bind({});
