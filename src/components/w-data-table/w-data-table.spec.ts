import { mount, VueWrapper } from "@vue/test-utils";
import { afterEach, expect, it } from "vitest";

import WDataTable from "./w-data-table.vue";

let wrapper: VueWrapper;

afterEach(() => {
    if (wrapper) {
        wrapper.unmount();
    }
});

it("should render a table", () => {
    wrapper = mount(WDataTable);

    expect(wrapper.html()).toContain("<table");
});

it("should render columns", () => {
    const columns = [{ label: "Name" }, { label: "Age" }];

    wrapper = mount(WDataTable, {
        props: { columns },
    });

    expect(wrapper.findAll("thead th").length).toBe(columns.length);

    const th = wrapper.findAll("thead th");

    expect(th.at(0)?.text()).toBe(columns[0].label);
    expect(th.at(1)?.text()).toBe(columns[1].label);
});

it("should columns th have style defined", () => {
    const columns = [{ label: "Name", style: "width: 30px;" }];

    wrapper = mount(WDataTable, {
        props: { columns },
    });

    expect(wrapper.find("thead th").attributes("style")).toBe(columns[0].style);
});

it("should render a <tr> for each item", () => {
    const items = [{ name: "John" }, { name: "Jane" }, { name: "Joe" }];

    wrapper = mount(WDataTable, {
        props: { items },
    });

    expect(wrapper.findAll("tbody tr").length).toBe(items.length);
});

it("should render a items fields based on columns prop", () => {
    const columns = [
        { label: "Name", field: "name" },
        { label: "Age", field: "age" },
    ];

    const items: any[] = [
        { name: "John", age: 30 },
        { name: "Jane", age: 25 },
        { name: "Joe", age: 35 },
    ];

    wrapper = mount(WDataTable, {
        props: { items, columns },
    });

    const td = wrapper.findAll("tbody tr td");
    const values = items
        .map((item) => [item[columns[0].field], item[columns[1].field]])
        .flat()
        .map((value) => value.toString());

    values.forEach((value) =>
        expect(td.at(values.indexOf(value))?.text()).toBe(value)
    );
});

it("should render item slot", () => {
    const items = [{ name: "John" }, { name: "Jane" }, { name: "Joe" }];

    wrapper = mount(WDataTable, {
        props: { items },
        slots: {
            item: '<div class="item">replace-item</div>',
        },
    });

    expect(wrapper.findAll(".item").length).toBe(items.length);
});

it("should render item-[columnName] slot", () => {
    const columns = [{ name: "name", label: "Name", field: "name" }];

    const items = [{ name: "John" }, { name: "Jane" }, { name: "Joe" }];

    wrapper = mount(WDataTable, {
        props: { items, columns },
        slots: {
            "item-name": '<div class="item-name">replace-item-name</div>',
        },
    });

    const td = wrapper.findAll("tbody tr td");

    expect(td.at(0)?.text()).toBe("replace-item-name");
});

it("should render body-append slot", () => {
    wrapper = mount(WDataTable, {
        slots: {
            "body-append": '<div class="body-append">replace-body-append</div>',
        },
    });

    expect(wrapper.find(".body-append").text()).toBe("replace-body-append");
});

it("should cells tabindex=0 when enable-navigation prop is true", () => {
    expect.assertions(3);
    const columns = [{ name: "name", label: "Name", field: "name" }];
    const items = [{ name: "John" }, { name: "Jane" }, { name: "Joe" }];

    wrapper = mount(WDataTable, {
        props: { columns, items, enableNavigation: true },
    });

    const td = wrapper.findAll("tbody tr td");

    td.forEach((cell) => {
        expect(cell.attributes("tabindex")).toBe("0");
    });
});

it("should cells tabindex be undefined when enable-navigation prop is false", () => {
    expect.assertions(3);
    const columns = [{ name: "name", label: "Name", field: "name" }];
    const items = [{ name: "John" }, { name: "Jane" }, { name: "Joe" }];

    wrapper = mount(WDataTable, {
        props: { columns, items, enableNavigation: false },
    });

    const td = wrapper.findAll("tbody tr td");

    td.forEach((cell) => {
        expect(cell.attributes("tabindex")).toBe(undefined);
    });
});

const cases = [
    ["ArrowUp", [0, 0]],
    ["ArrowDown", [1, 0]],
    ["ArrowLeft", [0, 0]],
    ["ArrowRight", [0, 1]],
];

it.each(cases)("should %s key navigate to cell %j", async (key, cors) => {
    const [y, x] = cors as [number, number];

    const columns = [
        { name: "name", label: "Name", field: "name" },
        { name: "age", label: "Age", field: "age" },
        { name: "city", label: "City", field: "city" },
    ];

    const items = [
        { name: "John", age: 30, city: "London" },
        { name: "Jane", age: 25, city: "Paris" },
        { name: "Joe", age: 35, city: "New York" },
    ];

    const expectedItem = items[y];
    const expectedColumn = columns[x];

    let receivedItem: any;
    let receivedColumn: any;

    wrapper = mount(WDataTable, {
        attachTo: document.body,
        props: {
            columns,
            items,
            enableNavigation: true,
            item: receivedItem,
            column: receivedColumn,
            "onUpdate:item": (item: any) => (receivedItem = item),
            "onUpdate:column": (column: any) => (receivedColumn = column),
        },
    });

    const table = wrapper.find("table");
    const event = new KeyboardEvent("keydown", { key: key as string });

    table.element.dispatchEvent(event);

    await wrapper.vm.$nextTick();

    expect(receivedItem).toEqual(expectedItem);
    expect(receivedColumn).toEqual(expectedColumn);
});

it("should when navigating focus in navigation-cell-selector prop when is defined", async () => {
    const columns = [
        { name: "name", label: "Name", field: "name" },
        { name: "age", label: "Age", field: "age" },
        { name: "city", label: "City", field: "city" },
    ];

    const items = [{ name: "John", age: 30, city: "London" }];

    wrapper = mount(WDataTable, {
        attachTo: document.body,
        props: {
            columns,
            items,
            enableNavigation: true,
            navigationCellSelector: ".navigation-cell",
        },
        slots: {
            "item-name": '<div class="navigation-cell">item-name</div>',
        },
    });

    const table = wrapper.find("table");
    const event = new KeyboardEvent("keydown", { key: "ArrowDown" });
    const cell = wrapper.find(".navigation-cell");

    table.element.dispatchEvent(event);

    await wrapper.vm.$nextTick();

    expect(document.activeElement).toBe(cell.element);
});
