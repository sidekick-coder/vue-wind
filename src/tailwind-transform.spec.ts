import { expect, it } from "vitest";
import { VWindTransformer } from "./tailwind-transform";

const cases = [
    ["<w-input></w-input>", ""],
    ["<w-input color='primary'></w-input>", "focus:border-primary"],
    ['<w-input color="primary"></w-input>', "focus:border-primary"],
    ['<div><w-input color="primary"></w-input></div>', "focus:border-primary"],
    [
        '<div><w-input \n\n\n color="primary"></w-input></div>',
        "focus:border-primary",
    ],
    ['<w-btn color="yellow" ></w-btn>', "bg-yellow"],
    ['<w-card color="yellow" ></w-card>', "bg-yellow"],
    ["<w-dialog></w-dialog>", "hidden"],
    ["<w-dialog></w-dialog>", "bg-black/75"],
];

it.each(cases)("should transform tailwind classes %s", (input, output) => {
    const transformed = VWindTransformer(input);

    expect(transformed).toContain(output);
});

it("should transform tailwind classes", () => {
    const transformed = VWindTransformer("<w-btn color='primary'></w-btn>");

    expect(transformed).toContain("bg-primary");
});
