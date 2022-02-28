import { describe, it, assert } from "vitest";
import { useStyleBuilder } from "./style-builder";

describe("style-builder", () => {
    it("should add style to builder", () => {
        const builder = useStyleBuilder();

        builder.add("width", 25).add("height", 25);

        assert.deepEqual(builder.build(), { width: 25, height: 25 });
    });

    it("should remove classes from builder", () => {
        const builder = useStyleBuilder();

        builder.add("width", 25).add("height", 25).remove("width");

        assert.deepEqual(builder.build(), { height: 25 });
    });
});
