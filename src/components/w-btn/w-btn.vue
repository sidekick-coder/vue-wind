<script lang="ts">
export const builder = useBuilder();

builder
    .option("color", "bg")
    .option("textColor", "text")
    .option("textSize", "text")
    .option("width", "w")
    .static("disabled:opacity-75")
    .static("px-4 py-2 drop-shadow rounded font-medium");
</script>

<script setup lang="ts">
import { computed } from "vue";
import { useBuilder } from "@/composable/tailwind";

const props = defineProps({
    color: {
        type: String,
        default: "gray-500",
    },
    textColor: {
        type: String,
        default: "white",
    },
    textSize: {
        type: String,
        default: "base",
    },
    width: {
        type: String,
        default: "full",
    },
});

const classes = computed(() => builder.make(props));
</script>

<template>
    <button :class="classes">
        <slot />
    </button>
</template>
