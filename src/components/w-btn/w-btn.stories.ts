import WBtn from "@/components/w-btn/w-btn.vue";

export default {
    title: "Components/WBtn",
    component: WBtn,
    argTypes: {
        color: {
            table: { category: "props" },
            control: { type: "inline-radio" },
            options: ["gray-500", "teal-500", "red-500", "blue-500"],
        },
    },
    args: {
        color: "teal-500",
    },
};

const Template = (args: any) => ({
    components: { WBtn },
    setup() {
        const buttons = [
            {
                label: "Button XL",
                size: "xl",
            },
            {
                label: "Button XL",
                size: "xl",
                outlined: true,
            },
            {
                label: "Button MD",
                size: "md",
            },
            {
                label: "Button MD",
                size: "md",
                outlined: true,
            },
            {
                label: "Button LG",
                size: "lg",
            },
            {
                label: "Button LG",
                size: "lg",
                outlined: true,
            },
            {
                label: "Button SM",
                size: "sm",
            },
            {
                label: "Button SM",
                size: "sm",
                outlined: true,
            },
        ];
        return { args, buttons };
    },
    template: `
        <div class='flex flex-wrap h-screen w-screen p-5 justify-center'>
            <div class="w-full mb-2 last:mb-0" v-for="(b, index) in buttons" :key="index">
                <w-btn v-bind="args" :size="b.size" :outlined='b.outlined' >
                    {{ b.label }}
                </w-btn>
            </div>
        </div>
    `,
});

export const Default = Template.bind({});
