<script lang="ts">
import { useLayout } from "@/components/w-layout/composable";
import { useTailwindBuilder } from "@/composable/tailwind-builder";
import { computed } from "@vue/reactivity";

const builder = useTailwindBuilder();

builder
    .add("height", "h-", "12")
    .add("color", "bg-", "gray-500")
    .addStatic("w-full")
    .addStatic("px-2")
    .addStatic("flex items-center");

export default {
    props: builder.props,
};
</script>
<script setup lang="ts">
const props = defineProps();

const classes = computed(() => builder.make(props));

const { toolbarRef } = useLayout();
</script>
<template>
    <div ref="toolbarRef" :class="classes">
        <slot></slot>
    </div>
</template>
