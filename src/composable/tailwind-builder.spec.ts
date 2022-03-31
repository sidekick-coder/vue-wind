import { describe, it, expect, beforeEach, vi } from "vitest";
import { TailwindBuilder, useTailwindBuilder } from "./tailwind-builder";

/**
 * Requirements
 * - merge builder props with component props
 * - option to add width and height
 * - option to add min-width and min-height
 *
 * const props = builder.defineProps({})
 */
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
            prop: "propName",
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

    it("should builder.props return all options in vue props format", () => {
        builder.add("width", "w-", "auto").add("height", "h-", "md");

        const props = builder.props;

        expect(props).toEqual({
            width: {
                type: [String, Number],
                default: "auto",
            },
            height: {
                type: [String, Number],
                default: "md",
            },
        });
    });

    it("should create options with prefix", () => {
        builder = useTailwindBuilder("prefix");

        builder.add("width", "w-");

        const props = builder.options;

        expect(props).toEqual([{ prop: "prefixWidth", class: "w-" }]);
    });

    it("should builder.props have prefix if it was defined", () => {
        builder = useTailwindBuilder("prefix");

        builder.add("width", "w-", "auto");

        const props = builder.props;

        expect(props).toEqual({
            prefixWidth: {
                type: [String, Number],
                default: "auto",
            },
        });
    });

    it("should add non prop class and return in the class list", () => {
        builder.addStatic("static-1", "static-2").addStatic("static-3");

        const classes = builder.make();

        expect(classes).toEqual(["static-1", "static-2", "static-3"]);
    });
});
