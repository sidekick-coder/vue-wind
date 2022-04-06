<script lang="ts">
import { computed } from "vue";
import { useTailwindBuilder } from "@/composable/tailwind-builder";

const builder = useTailwindBuilder();

builder
    .add("color", "bg-", "gray-500")
    .add("textColor", "text-", "white")
    .add("textSize", "text-", "base")
    .add("width", "w-", "full")
    .addStatic("disabled:opacity-75")
    .addStatic("px-4 py-2 drop-shadow rounded font-medium");

export default {
    props: builder.props,
};
</script>

<script setup lang="ts">
const props = defineProps();

const classes = computed(() => builder.make(props));
</script>

<template>
    <button :class="classes">
        <slot />
    </button>
</template>
