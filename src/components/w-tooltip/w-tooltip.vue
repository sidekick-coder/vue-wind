<script lang="ts">
import { useBuilder } from "@/composable/tailwind";
import { computed, defineComponent, ref } from "vue";

export const builder = useBuilder();

builder.static("relative");

builder
    .child("label")
    .option("color", "bg", "gray-500")
    .option("textColor", "text", "white")
    .option("opacity", "opacity", "0")
    .static("rounded-md px-4 py-1 text-xs")
    .static("absolute mt-1")
    .static("mx-auto")
    .static("transition-all");

export default defineComponent({
    props: {
        ...builder.props,
        ...builder.child("label").props,
        tag: {
            type: String,
            default: "div",
        },
        label: {
            type: String,
            default: "",
        },
    },
    setup(props) {
        const hover = ref(false);

        const classes = computed(() => ({
            main: builder.make(props),
            label: builder.child("label").make({
                ...props,
                opacity: hover.value ? "100" : "0",
            }),
            content: builder.child("content").make(props),
        }));

        return { hover, classes };
    },
});
</script>
<template>
    <component
        :is="tag"
        :class="classes.main"
        @mouseover="hover = true"
        @mouseleave="hover = false"
    >
        <div :class="classes.content">
            <slot></slot>
        </div>

        <div :class="classes.label">
            {{ label }}
        </div>
    </component>
</template>
