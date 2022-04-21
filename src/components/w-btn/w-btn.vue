<script setup lang="ts">
import { computed } from "vue";
import { useTailwindBuilder } from "@/composable/tailwind-builder";

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

const builder = useTailwindBuilder();

builder
    .add("color", "bg-", "gray-500")
    .add("textColor", "text-", "white")
    .add("textSize", "text-", "base")
    .add("width", "w-", "full")
    .addStatic("disabled:opacity-75")
    .addStatic("px-4 py-2 drop-shadow rounded font-medium");

const classes = computed(() => builder.make(props));
</script>

<template>
    <button :class="classes">
        <slot />
    </button>
</template>
