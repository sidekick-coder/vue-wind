import WAutocomplete from "@/components/w-autocomplete/w-autocomplete.vue";
import { ref } from "vue";

const options = Array.from({ length: 10 }, (_, i) => ({
    label: `Option ${i + 1}`,
    value: i,
}));

export default {
    title: "Components/WAutocomplete",
    argsType: {
        label: {},
        color: {},
        options: {},
    },
    args: {
        options,
        label: "Label",
        color: "teal-500",
        valueKey: "value",
        labelKey: "label",
    },
};

export const Default = (args: any) => ({
    components: { WAutocomplete },
    setup() {
        const model = ref("");
        const search = ref("");
        return { args, model, search };
    },
    template: `
        <div class='w-screen h-screen p-10 flex flex-wrap items-center justify-center'>
            <div class='w-full max-w-md'>
                <div class="mb-4">
                    <w-autocomplete
                        v-bind="args"
                        v-model="model"
                        v-model:search="search"
                        :options="args.options.filter(o => o.label.toLowerCase().includes(search.toLowerCase()))"
                        placeholder="Search..."
                    />
                </div>
                <div> model: {{ model }} </div>
            </div>
        </div>
    `,
});

export const Validation = (args: any) => ({
    components: { WAutocomplete },
    setup() {
        const model = ref("");
        const search = ref("");

        const mustBeHello = (o: any) => {
            return o.label === "Option 3" || "Only allowed option 3";
        };

        return { args, model, search, mustBeHello };
    },
    template: `
        <div class='w-screen h-screen p-10 flex flex-wrap items-center justify-center'>
            <div class='w-full max-w-md'>                
                <w-autocomplete
                    v-bind="args"
                    v-model="model"
                    v-model:search="search"
                    :options="args.options.filter(o => o.label.toLowerCase().includes(search.toLowerCase()))"
                    :rules="[mustBeHello]"
                    placeholder="Search..."
                />
            </div>
        </div>
    `,
});
