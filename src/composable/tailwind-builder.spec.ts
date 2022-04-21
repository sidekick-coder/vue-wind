import { describe, it, expect, beforeEach, vi } from "vitest";
import { TailwindBuilder, useTailwindBuilder } from "./tailwind-builder";

describe("TailwindBuilder (unit)", () => {
    let builder: TailwindBuilder;

    beforeEach(() => {
        builder = useTailwindBuilder();
    });

    it("should instantiate a builder", () => {
        expect(builder).toBeInstanceOf(TailwindBuilder);
    });

    it("should add a new option to builder", () => {
        builder.add("propName", "className", "defaultValue");

        expect(builder.options[0]).toEqual({
            name: "propName",
            class: "className",
            default: "defaultValue",
        });
    });

    it("should make() return a class list based in the props passed", () => {
        builder.add("width", "w-").add("height", "h-");

        const classes = builder.make({ width: "[500px]", height: "[300px]" });

        expect(classes).toEqual(["w-[500px]", "h-[300px]"]);
    });

    it("should make() classes not include undefined values", () => {
        builder.add("width", "w-").add("height", "h-");

        const classes = builder.make({ width: undefined, height: "[300px]" });

        expect(classes).toEqual(["h-[300px]"]);
    });

    it("should add non prop class and return in the class list", () => {
        builder.addStatic("static-1", "static-2").addStatic("static-3");

        const classes = builder.make();

        expect(classes).toEqual(["static-1", "static-2", "static-3"]);
    });
});
