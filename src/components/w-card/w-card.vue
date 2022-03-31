<script lang="ts">
import { useTailwindBuilder } from "@/composable/tailwind-builder";
import { computed } from "vue";
const builder = useTailwindBuilder();

builder
    .add("width", "w-", "full")
    .add("maxWidth", "max-w-")
    .add("height", "h-")
    .add("minHeight", "min-h-")
    .add("maxHeight", "max-h-")
    .add("color", "bg-", "white");

export default {
    props: builder.props,
};
</script>
<script setup lang="ts">
const props = defineProps();

const classes = computed(() => builder.make(props));
</script>

<template>
    <div :class="classes">
        <slot></slot>
    </div>
</template>
