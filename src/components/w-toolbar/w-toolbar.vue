<script setup lang="ts">
import { useLayout } from "@/components/w-layout/composable";
import { useTailwindBuilder } from "@/composable/tailwind-builder";
import { computed } from "@vue/reactivity";

const props = defineProps({
    height: {
        type: String,
        default: "12",
    },
    color: {
        type: String,
        default: "gray-500",
    },
});
const { toolbarRef } = useLayout();

const builder = useTailwindBuilder();

builder
    .add("height", "h-", "12")
    .add("color", "bg-", "gray-500")
    .addStatic("w-full")
    .addStatic("px-2")
    .addStatic("flex items-center");

const classes = computed(() => builder.make(props));
</script>

<template>
    <div ref="toolbarRef" :class="classes">
        <slot></slot>
    </div>
</template>
