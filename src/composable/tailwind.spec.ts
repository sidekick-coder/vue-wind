import { it, expect, beforeEach, vi } from "vitest";
import { useBuilder, Builder } from "./tailwind";

import WDataTable from "@/components/w-data-table/w-data-table.vue";
import { mount } from "@vue/test-utils";

let builder: Builder;

beforeEach(() => {
    builder = useBuilder();
});

it("should option be converted to a class", () => {
    builder.option("color", "text");

    const classes = builder.make({ color: "red" });

    expect(classes).toEqual("text-red");
});

it("should add a child class builder", () => {
    builder.child("label").option("color", "text");

    const classes = builder.child("label").make({ color: "red" });

    expect(classes).toEqual("text-red");
});

it("should all methods return all classes including child builders", () => {
    builder.option("color", "main-color");

    builder.child("label").option("labelColor", "text");

    const classes = builder.all({ color: "blue", labelColor: "red" });

    expect(classes).toEqual("main-color-blue text-red");
});

it("should all method include child option defaults", () => {
    builder.child("label").option("color", "text", "red");

    const classes = builder.all();

    expect(classes).includes("text-red");
});

it("should all method include child static classes", () => {
    builder.child("label").static("p-2");
    builder.child("small").static("p-3");

    builder.static("border-2 border-gray-200");

    const classes = builder.all();

    expect(classes).includes("p-2");
    expect(classes).includes("p-3");
});

it("should modify method be able to update the builder", () => {
    builder.option("color", "main-color");

    builder.modify((b) => b.remove("color"));

    const classes = builder.all();

    expect(classes).toEqual("");
});

it("should modify method be able to update builder child", () => {
    builder.static("p-2");

    builder.child("label").option("color", "text");

    builder.modify((b) => b.child("label").remove("color"));

    const classes = builder.all();

    expect(classes).toEqual("p-2");
});

it("should return modify method with the props", () => {
    builder.option("color", "main-color");

    expect(builder.props.modify).toBeDefined();
});

it("should not add same static classes multiple times", () => {
    builder.static("123").static("123");

    expect(builder.make()).not.equal("123 123");
});

const cases = [WDataTable];

it.each(cases)(
    "should components be able to use modify method with %s component",
    (component) => {
        const wrapper = mount(component, {
            props: {
                modify: (b: Builder) => b.static("my-special-class"),
            },
        });

        expect(wrapper.find(".my-special-class").exists()).toBe(true);
    }
);
