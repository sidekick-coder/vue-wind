<script lang="ts">
import { useBuilder } from "@/composable/tailwind";

export const builder = useBuilder();
builder
    .option("color", "bg", "white")
    .option("width", "w", "full")
    .option("maxWidth", "max-w")
    .option("height", "h")
    .option("minHeight", "min-h")
    .option("maxHeight", "max-h");
</script>
<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
    color: {
        type: String,
        default: "white",
    },
    width: {
        type: String,
        default: "full",
    },
    maxWidth: {
        type: String,
        default: null,
    },
    height: {
        type: String,
        default: null,
    },
    maxHeight: {
        type: String,
        default: null,
    },
    minHeight: {
        type: String,
        default: null,
    },
});

const classes = computed(() => builder.make(props));
</script>

<template>
    <div :class="classes">
        <slot></slot>
    </div>
</template>
