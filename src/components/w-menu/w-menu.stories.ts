import WMenu from "@/components/w-menu/w-menu.vue";
import WBtn from "@/components/w-btn/w-btn.vue";
import WCard from "@/components/w-card/w-card.vue";

export default {
    title: "Components/WMenu",
    argsType: {
        label: {},
        color: {},
    },
    args: {
        label: "Label",
        color: "teal-500",
        valueKey: "value",
        labelKey: "label",
    },
};

const Template = (args: any) => ({
    components: { WMenu, WBtn, WCard },
    setup() {
        return { args };
    },
    template: `
        <div class='w-screen h-screen p-10 flex items-center justify-center'>
            <w-menu v-bind="args">
                <template #activator>
                    <w-btn>
                        Hover me
                    </w-btn>
                </template>

                <w-card class='border'>
                    <div v-for="i in 5" :key="i" class="p-2">
                        item - {{ i }}
                    </div>                
                </w-card>

            </w-menu>
        </div>
    `,
});

export const Default = Template.bind({});
