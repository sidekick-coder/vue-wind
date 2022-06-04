import WInput from "@/components/w-input/w-input.vue";

export default {
    title: "Components/WInput",
    argsType: {
        label: {},
        placeholder: {},
        color: {},
    },
    args: {
        label: "Label",
        placeholder: "Placeholder",
        color: "teal-500",
    },
};

const Template = (args: any) => ({
    components: { WInput },
    setup() {
        return { args };
    },
    template: `
        <div class='w-screen h-screen p-10 flex items-center justify-center'>
            <div class='w-full max-w-md'>
                <w-input v-bind="args" />
            </div>
        </div>
    `,
});

export const Default = Template.bind({});
