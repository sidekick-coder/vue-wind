<script lang="ts">
import { computed, defineComponent } from "vue";
import { useBuilder } from "@/composable/tailwind";

export const builder = useBuilder();

builder
    .option("color", "bg", "gray-500")
    .option("textColor", "text", "white")
    .option("textSize", "text", "base")
    .option("width", "w", "full")
    .static("disabled:opacity-75")
    .static("px-4 py-2 drop-shadow rounded font-medium");

export default defineComponent({
    props: {
        ...builder.props,
    },
    setup(props) {
        const classes = computed(() => builder.make(props));

        return { classes };
    },
});
</script>

<template>
    <button :class="classes">
        <slot />
    </button>
</template>
