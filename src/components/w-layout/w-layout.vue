<script lang="ts" setup>
import { useTailwindBuilder } from "@/composable/tailwind-builder";
import { provideLayout } from "./composable";

const builder = useTailwindBuilder();

const { toolbarRef, drawerRef, contentRef } = provideLayout();

defineExpose({
    drawerRef,
    toolbarRef,
    contentRef,
});

builder.addStatic("h-screen w-screen flex flex-wrap");
</script>

<template>
    <div :class="builder.make()">
        <slot />
    </div>
</template>
