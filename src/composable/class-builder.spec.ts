import { describe, it, assert } from "vitest";
import { useClassBuilder } from "./class-builder";

describe("class-builder", () => {
    it("should add classes to builder", () => {
        const builder = useClassBuilder();

        builder.add("foo", "bar");

        assert.equal(builder.build(), "foo bar");
    });

    it("should remove classes from builder", () => {
        const builder = useClassBuilder();

        builder.add("foo").add("bar").remove("foo");

        assert.equal(builder.build(), "bar");
    });
});
