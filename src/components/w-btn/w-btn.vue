<script lang="ts">
import { computed, defineComponent } from "vue";
import { useBuilder } from "@/composable/tailwind";

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

export const sizes = {
    sm: {
        px: "4",
        py: "2",
        textSize: "xs",
    },
    md: {
        px: "4",
        py: "2",
        textSize: "base",
    },
    lg: {
        px: "4",
        py: "2",
        textSize: "lg",
    },
    xl: {
        px: "4",
        py: "2",
        textSize: "xl",
    },
};

export default defineComponent({
    props: {
        ...builder.props,
        color: {
            type: String,
            default: undefined,
        },
        size: {
            type: String,
            default: "md",
        },
        sizes: {
            type: Object,
            default: () => sizes,
        },
        outlined: {
            type: Boolean,
            default: false,
        },
    },
    setup(props: any) {
        const classes = computed(() =>
            builder.make({
                ...props,
                ...props.sizes[props.size],
                borderColor: props.outlined ? props.color : "transparent",
                textColor: props.outlined ? props.color : props.textColor,
                bgColor: props.outlined ? "transparent" : props.color,
            })
        );

        return { classes };
    },
});
</script>

<template>
    <button :class="classes">
        <slot />
    </button>
</template>
