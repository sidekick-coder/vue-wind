<script setup lang="ts">
import { useTailwindBuilder } from "@/composable/tailwind-builder";
import { computed } from "vue";

const props = defineProps({
    color: {
        type: String,
        default: "gray-500",
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

const builder = useTailwindBuilder();

builder
    .add("color", "bg-", "white")
    .add("width", "w-", "full")
    .add("maxWidth", "max-w-")
    .add("height", "h-")
    .add("minHeight", "min-h-")
    .add("maxHeight", "max-h-");

const classes = computed(() => builder.make(props));
</script>

<template>
    <div :class="classes">
        <slot></slot>
    </div>
</template>
