import { describe, it, expect, beforeEach, vi } from "vitest";
import { useBuilder, Builder } from "./tailwind";

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

    builder.child("label").option("color", "text");

    const classes = builder.all(
        { color: "blue" },
        {
            label: { color: "red" },
        }
    );

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
