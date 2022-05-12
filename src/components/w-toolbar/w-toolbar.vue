<script lang="ts">
export const builder = useBuilder();

builder
    .option("height", "h", "12")
    .option("color", "bg", "gray-500")
    .static("w-full")
    .static("px-2")
    .static("flex items-center");
</script>
<script setup lang="ts">
import { useLayout } from "@/components/w-layout/composable";
import { useBuilder } from "@/composable/tailwind";

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

const classes = computed(() => builder.make(props));
</script>

<template>
    <div ref="toolbarRef" :class="classes">
        <slot></slot>
    </div>
</template>
