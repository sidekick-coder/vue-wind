<script setup lang="ts">
import { useClassBuilder } from "@/composable/class-builder";

const props = defineProps({
    width: {
        type: String,
        default: "full",
    },
    maxWidth: {
        type: String,
        default: null,
    },
});

const builder = useClassBuilder();

builder.add("shadow-md rounded");

builder.add("bg-white dark:bg-gray-800");

builder.add(`w-${props.width}`);

if (props.maxWidth) {
    builder.add(`max-w-${props.maxWidth}`);
}
</script>

<template>
    <div :class="builder.build()">
        <slot></slot>
    </div>
</template>
