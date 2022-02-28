<script setup lang="ts">
import { useClassBuilder } from "@/composable/class-builder";

const classes = useClassBuilder().add(
    "shadow-md w-full rounded bg-white dark:bg-gray-800"
);
</script>

<template>
    <div :class="classes.build()">
        <slot></slot>
    </div>
</template>
