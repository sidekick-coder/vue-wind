import WTextarea from "./w-textarea.vue";

export default {
    title: "Components/WTextarea",
    component: WTextarea,
    argTypes: {
        label: {
            control: "text",
            defaultValue: "My Label",
        },
        color: {
            control: "text",
            defaultValue: "teal-500",
        },
    },
};

const Template = (args: any) => ({
    components: { WTextarea },
    setup() {
        return { args };
    },
    template: '<WTextarea v-bind="args" />',
});

export const Default = Template.bind({});
