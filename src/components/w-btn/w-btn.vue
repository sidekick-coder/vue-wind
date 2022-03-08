<script setup lang="ts">
import { useClassBuilder } from "@/composable/class-builder";

const props = defineProps({
    color: {
        type: String,
        default: "gray-500",
    },
    textColor: {
        type: String,
        default: "white",
    },
    width: {
        type: String,
        default: "auto",
    },
    textSize: {
        type: String,
        default: "base",
    },
});

const builder = useClassBuilder();

builder.add(`px-4 py-2 drop-shadow rounded font-bold`);

builder.add(`bg-${props.color}`, `text-${props.textColor}`);

builder.add(`text-${props.textSize}`);

builder.add(`w-${props.width}`);
</script>
<template>
    <button :class="builder.build()">
        <slot />
    </button>
</template>
