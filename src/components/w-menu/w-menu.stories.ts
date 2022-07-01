import WMenu from "@/components/w-menu/w-menu.vue";
import WBtn from "@/components/w-btn/w-btn.vue";
import WCard from "@/components/w-card/w-card.vue";
import { ref } from "vue";

export default {
    title: "Components/WMenu",
    argsType: {
        modelValue: {},
    },
    args: {
        modelValue: null,
    },
};

export const Default = (args: any) => ({
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

export const UsingVModel = (args: any) => ({
    components: { WMenu, WBtn, WCard },
    setup() {
        const menu = ref(false);

        return { args, menu };
    },
    template: `
        <div class='w-screen h-screen p-10 flex items-center justify-center'>
            <w-menu v-model='menu'>
                <template #activator>
                    <w-btn @click="menu = !menu" >
                        Click me
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
