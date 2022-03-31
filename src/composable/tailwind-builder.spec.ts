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

    it("should return a class list based in the props passed", () => {
        builder.add("width", "w-").add("height", "h-");

        const classes = builder.make({ width: "[500px]", height: "[300px]" });

        expect(classes).toEqual(["w-[500px]", "h-[300px]"]);
    });

    it("should withProps() return option in vue props format", () => {
        builder.add("width", "w-", "auto").add("height", "h-", "md");

        const defineProps = vi.fn();

        builder.withProps(defineProps);

        expect(defineProps).toHaveBeenCalledWith({
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
    it("should withProps() add extra props passed in arguments", () => {
        builder.add("width", "w-", "auto").add("height", "h-", "md");

        const defineProps = vi.fn();

        builder.withProps(defineProps, {
            extra: Array,
        });

        expect(defineProps).toHaveBeenCalledWith({
            width: {
                type: [String, Number],
                default: "auto",
            },
            height: {
                type: [String, Number],
                default: "md",
            },
            extra: Array,
        });
    });
});
