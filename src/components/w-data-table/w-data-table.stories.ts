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
        focusColor: {
            control: { type: "inline-radio" },
            options: ["gray-200", "teal-200", "red-200", "blue-200"],
        },
        columns: {
            expanded: false,
        },
        items: {
            expanded: false,
        },
        "onUpdate:item": {
            action: "update:item",
        },
        "onUpdate:column": {
            action: "update:column",
        },
    },
    args: {
        focusColor: "gray-200",
        enableNavigation: false,
        columns: columns,
        items: items,
    },
};

const Template = (args: any) => ({
    components: { WDataTable },
    setup() {
        return { args };
    },
    template: '<w-data-table v-bind="args" />',
});

export const Default = Template.bind({});

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

export const Navigation: any = Template.bind({});

Navigation.args = {
    enableNavigation: true,
};

export const NavigationWithCustomSelector = (args: any) => ({
    components: { WDataTable },
    setup() {
        return args;
    },
    template: `
        <w-data-table
            :items='items'
            :columns='columns'
            focus-color='none'
            :enable-navigation='true'
            navigation-cell-selector=".focus-me"
        >
            
            <template v-for='col in columns' #[\`item-\${col.name}\`]="{ item }" :key="col.name"  >
                <input
                    class='focus-me focus:bg-teal-500/10 border border-transparent focus:border-teal-500 focus:outline-none'
                    :value='item[col.field]'
                />
            </template>

        </w-data-table>
    `,
});
