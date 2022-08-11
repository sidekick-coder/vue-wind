<script lang="ts">
import { computed, defineComponent } from "vue";
import { useBuilder } from "@/composable/tailwind";
import { useSvg } from "@/composable/svg";

export const builder = useBuilder();

builder
    .option("bgColor", "bg", "gray-500")
    .option("textColor", "text", "white")
    .option("textSize", "text", "base")
    .option("borderColor", "border", "transparent")
    .option("width", "w", "auto")
    .option("px", "px", "4")
    .option("py", "py", "2")
    .static("disabled:opacity-75 border")
    .static("drop-shadow rounded font-medium");

builder
    .child("loading")
    .static("absolute  inset-0 flex items-center justify-center rounded")
    .option("bgColor", "bg", "gray-500")
    .option("textColor", "text", "white");

builder
    .child("spin")
    .static("animate-spin")
    .option("bgColor", "text", "transparent")
    .option("color", "fill", "red-500");

export const sizes = {
    sm: {
        px: "4",
        py: "2",
        textSize: "xs",
        spin: 20,
    },
    md: {
        px: "4",
        py: "2",
        textSize: "base",
        spin: 20,
    },
    lg: {
        px: "4",
        py: "2",
        textSize: "lg",
        spin: 20,
    },
    xl: {
        px: "4",
        py: "2",
        textSize: "xl",
        spin: 20,
    },
};

export default defineComponent({
    props: {
        ...builder.props,
        color: {
            type: String,
            default: "gray-500",
        },
        size: {
            type: String,
            default: "md",
        },
        sizes: {
            type: Object,
            default: () => sizes,
        },
        loading: {
            type: Boolean,
            default: false,
        },
        outlined: {
            type: Boolean,
            default: false,
        },
    },
    setup(props: any) {
        const svg = useSvg();

        const currentSize = computed(
            () => props.sizes[props.size] || props.sizes.md
        );

        const classes = computed(() => ({
            btn: builder.make({
                ...props,
                ...currentSize.value,
                borderColor: props.outlined ? props.color : "transparent",
                textColor: props.outlined ? props.color : props.textColor,
                bgColor: props.outlined ? "transparent" : props.color,
                hideText: props.loading,
            }),
            loading: builder.child("loading").make({
                bgColor: props.outlined ? "white" : props.color,
                textColor: props.outlined ? props.color : props.textColor,
            }),
            spin: builder.child("spin").make({
                color: props.outlined ? props.color : props.textColor,
            }),
        }));

        return { classes, svg, currentSize };
    },
});
</script>

<template>
    <button :class="classes.btn">
        <div
            v-if="loading"
            :class="classes.loading"
            v-html="svg.circle(currentSize.spin, classes.spin)"
        />
        <slot />
    </button>
</template>
