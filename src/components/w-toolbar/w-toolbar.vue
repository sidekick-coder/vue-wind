<script setup lang="ts">
import { useClassBuilder } from "@/composable/class-builder";
import { useLayout } from "@/components/w-layout/composable";

const props = defineProps({
    layout: {
        type: Boolean,
        default: false,
    },
    height: {
        type: String,
        default: "12",
    },
    color: {
        type: String,
        default: "blue-500",
    },
});

const classes = useClassBuilder();
const { toolbarRef } = useLayout();

classes
    .add("w-full", `h-${props.height}`)
    .add("px-2")
    .add("flex items-center")
    .add(`bg-${props.color}`);
</script>
<template>
    <div ref="toolbarRef" :class="classes.build()">
        <slot></slot>
    </div>
</template>
