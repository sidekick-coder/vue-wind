import { Builder } from "@/composable/tailwind";
import WDataTable from "./w-data-table.vue";

const columns = Array.from({ length: 4 }, (_, k) => ({
    name: `column-${k}`,
    field: `Column ${k}`,
    label: `Column ${k}`,
}));

const items = Array.from({ length: 10 }, (v, k) =>
    columns.reduce(
        (acc, column) => ({
            ...acc,
            [column.field]: `Item ${k} - ${column.field}`,
        }),
        {}
    )
);

export default {
    title: "Components/WDataTable",
    argTypes: {
        columns: {
            table: { category: "props" },
        },
        items: {
            table: { category: "props" },
        },
        focusColor: {
            table: { category: "props" },
            control: { type: "inline-radio" },
            options: ["gray-200", "teal-200", "red-200", "blue-200"],
        },
        enableNavigation: {
            table: { category: "props" },
            control: false,
        },
        navigationCellSelector: {
            table: { category: "props" },
            control: false,
        },
        "onUpdate:item": {
            table: { category: "events" },
            control: false,
            action: "update:item",
        },
        "onUpdate:column": {
            table: { category: "events" },
            action: "update:column",
        },
    },
    args: {
        columns: columns,
        items: items,
        focusColor: "gray-200",
        enableNavigation: false,
    },
};

const Template = (args: any) => ({
    components: { WDataTable },
    setup() {
        return { args };
    },
    template: '<w-data-table v-bind="args" />',
});

export const Default: any = Template.bind({});

Default.parameters = {
    controls: { exclude: ["focusColor", "enableNavigation"] },
};

export const Slots = (args: any) => ({
    components: { WDataTable },
    setup() {
        return args;
    },
    template: `
        <w-data-table :items='items' :columns='columns' :focus-color='focusColor'  >
            
            <template #item-column-0='{ item, column }'>
                <div class='text-blue-500' >{{ item[column.field] }}</div>
            </template>
            
            <template #item-column-1='{ item, column }'>
                <div class='text-purple-500' >{{ item[column.field] }}</div>
            </template>
            
            <template #item-column-2='{ item, column }'>
                <div class='text-teal-500' >{{ item[column.field] }}</div>
            </template>
            
            <template #item-column-3='{ item, column }'>
                <div class='text-red-500' >{{ item[column.field] }}</div>
            </template> 
            
            
            <template #body-append>
                <tr class='bg-sky-500 text-center text-white' >
                    <td :colspan='columns.length' >Append Body</td>
                </tr>
            </template>

        </w-data-table>
    `,
});

Slots.parameters = {
    controls: { exclude: ["focusColor", "enableNavigation"] },
};

export const Navigation: any = Template.bind({});

Navigation.args = {
    enableNavigation: true,
};

export const NavigationWithCustomSelector = (args: any) => ({
    components: { WDataTable },
    setup() {
        function modify(b: Builder) {
            b.child("td").remove("p-2").remove("border-b").static("p-0");
        }
        const classes = new Builder()
            .static("focus-me")
            .static(
                "focus:bg-teal-500/10 focus:border-teal-500 focus:outline-none"
            )
            .static("border border-transparent border-b-gray-200")
            .static("p-2 w-full");

        return {
            ...args,
            modify,
            classes: classes.make(),
        };
    },
    template: `
        <w-data-table
            :items='items'
            :columns='columns'
            focus-color='none'
            :enable-navigation='true'
            navigation-cell-selector=".focus-me"
            :modify="modify" 
        >
            
            <template v-for='col in columns' #[\`item-\${col.name}\`]="{ item }" :key="col.name"  >
                <input
                    :class='classes'
                    :value='item[col.field]'
                />
            </template>

        </w-data-table>
    `,
});

NavigationWithCustomSelector.args = {
    enableNavigation: true,
    navigationCellSelector: ".focus-me",
};

NavigationWithCustomSelector.parameters = {
    controls: { exclude: ["focusColor"] },
};
