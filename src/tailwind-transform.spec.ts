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
    [
        "<w-dialog /><w-input color='primary'></w-input>",
        "focus:border-primary hidden",
    ],
    [
        `
        <script setup lang="ts">
            const test = ref();
        </script>

        <template>
            <div>
                <w-data-table
                    v-model:item="selected"
                    :columns="head"
                    :items="items"
                    enable-keyboard-navigation
                    @keydown.enter="duplicate"
                />
            </div>
        </template>

      `,
        "focus:bg-gray-100",
    ],
    [
        `<w-drawer
            v-model="layoutStore.right"
            layout-id="right"
            class="border-l bg-white"
            width="[300px]"
            right
        >
        </w-drawer>`,
        "right-0",
    ],
];

it.each(cases)("should transform tailwind classes %s", (input, output) => {
    const transformed = VWindTransformer(input);

    const classes = output.split(" ");

    classes.forEach((className) => expect(transformed).toContain(className));
});
