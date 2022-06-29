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
        loading: {
            table: { category: "props" },
            control: { type: "boolean" },
        },
        loadingBarColor: {
            table: { category: "props" },
            control: { type: "inline-radio" },
            options: ["gray-500", "teal-500", "red-500", "blue-500"],
        },
    },
    args: {
        columns: columns,
        items: items,
        loading: false,
        loadingBarColor: "teal-500",
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

export const Slots = (args: any) => ({
    components: { WDataTable },
    setup() {
        return { args, columns };
    },
    template: `
        <w-data-table v-bind='args'>

            <template #body-prepend>
                <tr class='bg-sky-500 text-center text-white' >
                    <td :colspan='columns.length' >Prepend Body</td>
                </tr>
            </template>

            <template #column-column-0='{ column }'>
                <div class='text-blue-500' >
                    {{ column.label }}
                </div>
            </template>

            <template #column-column-1='{ column }'>
                <div class='text-purple-500' >
                    {{ column.label }}
                </div>
            </template>

            <template #column-column-2='{ column }'>
                <div class='text-teal-500' >
                    {{ column.label }}
                </div>
            </template>

            <template #column-column-3='{ column }'>
                <div class='text-red-500' >
                    {{ column.label }}
                </div>
            </template>

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
