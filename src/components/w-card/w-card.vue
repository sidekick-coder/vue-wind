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
    height: {
        type: String,
        default: null,
    },
    minHeight: {
        type: String,
        default: null,
    },
});

const builder = useClassBuilder();

builder.add("shadow-md rounded");

builder.add(`w-${props.width}`);

if (props.maxWidth) {
    builder.add(`max-w-${props.maxWidth}`);
}

if (props.height) {
    builder.add(`h-${props.height}`);
}

if (props.minHeight) {
    builder.add(`min-h-${props.minHeight}`);
}
</script>

<template>
    <div :class="builder.build()">
        <slot></slot>
    </div>
</template>
