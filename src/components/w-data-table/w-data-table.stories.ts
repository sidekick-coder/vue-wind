import WDataTable from "./w-data-table.vue";

export default {
    title: "Components/WDataTable",
    component: WDataTable,
    argTypes: {
        color: { control: "text", table: { category: "props" } },
        columns: {
            expanded: false,
            defaultValue: [],
        },
        items: {
            expanded: false,
            defaultValue: [],
        },
    },
    args: {
        color: "white",
        columns: [
            { label: "Name", field: "name" },
            { label: "Age", field: "age" },
        ],
        items: [
            { name: "John", age: 30 },
            { name: "Jane", age: 25 },
            { name: "Joe", age: 35 },
        ],
    },
};

const Template = (args: any) => ({
    components: { WDataTable },
    setup() {
        return { args };
    },
    template: '<WDataTable v-bind="args" />',
});

export const Default = Template.bind({});
