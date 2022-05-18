<script lang="ts">
import { defineComponent, onMounted, ref, computed } from "vue";

import { useLayoutItem, useLayout } from "@/components/w-layout/composable";
import { useBuilder } from "@/composable/tailwind";
import { uniqueId } from "lodash";

export const builder = useBuilder();

builder
    .option("width", "w", "full")
    .option("height", "h", "12")
    .option("color", "bg", "gray-500")
    .static("px-2")
    .static("absolute top-0 left-0")
    .static("flex items-center");

export default defineComponent({
    props: {
        ...builder.props,
        layoutId: {
            type: String,
            default: () => uniqueId(),
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

        const { items } = useLayout();

        const paddingLeft = computed(() =>
            items.value
                .filter((i) => !props.layoutIgnore.includes(i.id))
                .filter((item) => item.type === "drawer")
                .filter((item) => item.offsetType === "left")
                .filter((item) => item.isVisible())
                .reduce((acc, item) => acc + item.width, 0)
        );

        const paddingRight = computed(() =>
            items.value
                .filter((i) => !props.layoutIgnore.includes(i.id))
                .filter((item) => item.type === "drawer")
                .filter((item) => item.offsetType === "right")
                .filter((item) => item.isVisible())
                .reduce((acc, item) => acc + item.width, 0)
        );

        onMounted(() => {
            useLayoutItem({
                id: props.layoutId,
                ref: root.value,
                height: 0,
                width: 0,
                isVisible: () => true,
                offsetType: "top",
                type: "toolbar",
            });
        });

        const classes = computed(() => builder.make(props));

        return { root, classes, paddingLeft, paddingRight };
    },
});
</script>

<template>
    <head
        ref="root"
        :class="classes"
        :style="`padding-left: ${paddingLeft}px; padding-right: ${paddingRight}px`"
    >
        <slot></slot>
    </head>
</template>
