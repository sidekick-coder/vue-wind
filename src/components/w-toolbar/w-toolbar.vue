<script lang="ts">
import { defineComponent, onMounted, ref, computed } from "vue";

import { useLayoutItem, LayoutItem } from "@/components/w-layout/composable";
import { useBuilder } from "@/composable/tailwind";
import { uniqueId } from "lodash";

export const builder = useBuilder();

builder
    .option("height", "h", "12")
    .option("color", "bg", "gray-500")
    .static("px-2")
    .static("flex items-center");

export default defineComponent({
    props: {
        ...builder.props,
        layoutId: {
            type: String,
            default: uniqueId(),
        },
        layoutIgnore: {
            type: Array,
            default: () => [],
        },
        layout: {
            type: Boolean,
            default: false,
        },
        height: {
            type: String,
            default: "12",
        },
        color: {
            type: String,
            default: "gray-500",
        },
    },
    setup(props) {
        const root = ref();
        const width = ref("100%");

        function resize(items: LayoutItem[]) {
            const offsetWidth = items
                .filter((i) => i.type === "drawer")
                .filter((i) => !props.layoutIgnore.includes(i.id))
                .map((i) => i.width)
                .reduce((a, b) => a + b, 0);

            width.value = `calc(100% - ${offsetWidth}px)`;
        }

        onMounted(() => {
            useLayoutItem(props.layoutId, root.value, "toolbar", resize);
        });

        const classes = computed(() => builder.make(props));
        const style = computed(() => ({
            width: width.value,
        }));

        return { root, classes, style };
    },
});
</script>

<template>
    <div ref="root" :class="classes" :style="style">
        <slot></slot>
    </div>
</template>
