import WDialog from "./w-dialog.vue";
import WCard from "@/components/w-card/w-card.vue";

export default {
    title: "Components/WDialog",
    component: WDialog,
    args: {
        modelValue: true,
    },
};

const Template = (args: any) => ({
    components: { WDialog, WCard },
    setup() {
        return { args };
    },
    template: `
        <w-dialog v-bind="args">
            <w-card class='p-4' >Hello World</w-card>
        </w-dialog>
    `,
});

export const Default = Template.bind({});
