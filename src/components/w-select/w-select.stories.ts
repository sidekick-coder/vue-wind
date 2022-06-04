import WSelect from "@/components/w-select/w-select.vue";
import { ref } from "vue";

export default {
    title: "Components/WSelect",
    argsType: {
        label: {},
        color: {},
    },
    args: {
        label: "Label",
        color: "teal-500",
        valueKey: "value",
        labelKey: "label",
        options: [
            {
                label: "Select an option",
                value: "",
            },
            {
                label: "Option 1",
                value: "option-1",
            },
            {
                label: "Option 2",
                value: "option-2",
            },
        ],
    },
};

const Template = (args: any) => ({
    components: { WSelect },
    setup() {
        const model = ref("");
        return { args, model };
    },
    template: `
        <div class='w-screen h-screen p-10 flex items-center justify-center'>
            <div class='w-full max-w-md'>
                <w-select v-model='model' v-bind="args" />
            </div>
        </div>
    `,
});

export const Default = Template.bind({});
