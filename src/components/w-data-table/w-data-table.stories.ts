import WDataTable from "./w-data-table.vue";

const columns = Array.from({ length: 5 }, (_, k) => ({
    field: `Column ${k}`,
    label: `Column ${k}`,
}));

const items = Array.from({ length: 20 }, (v, k) =>
    columns.reduce(
        (acc, column) => ({
            ...acc,
            [column.field]: `Item ${k}`,
        }),
        {}
    )
);

export default {
    title: "Components/WDataTable",
    argTypes: {
        columns: {
            expanded: false,
        },
        items: {
            expanded: false,
        },
        onFocusItemCell: {
            action: "focusItemCell",
        },
        onFocusItemRow: {
            action: "focusItemRow",
        },
        "onUpdate:item": {
            action: "update:item",
        },
        "onUpdate:column": {
            action: "update:column",
        },
    },
    args: {
        enableKeyboardNavigation: false,
        columns: columns,
        items: items,
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

export const KeyBoardNavigation: any = Template.bind({});

KeyBoardNavigation.args = {
    enableKeyboardNavigation: true,
};
