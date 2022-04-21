import { expect, it } from "vitest";
import { VWindTransformer } from "./tailwind-transform";

it("should transform tailwind classes", () => {
    const transformed = VWindTransformer("<w-input color='primary'></w-input>");

    expect(transformed).toContain("focus:border-primary");
});

it("should transform tailwind classes", () => {
    const transformed = VWindTransformer("<w-btn color='primary'></w-btn>");

    expect(transformed).toContain("bg-primary");
});
