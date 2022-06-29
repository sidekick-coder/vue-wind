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
        <div class='flex h-screen w-screen items-center justify-center'>
            <w-tooltip v-bind="args">
                <w-btn>Hover me</w-btn>
            </w-tooltip>
        </div>
    `,
});

export const Default = Template.bind({});
