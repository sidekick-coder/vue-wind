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
