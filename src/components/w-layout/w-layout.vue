<script lang="ts" setup>
import { useClassBuilder } from "@/composable/class-builder";
import { provideLayout } from "./composable";

const builder = useClassBuilder();

const { toolbarRef, drawerRef, contentRef } = provideLayout();

defineExpose({
    drawerRef,
    toolbarRef,
    contentRef,
});

builder.add("h-screen w-screen flex flex-wrap");
</script>

<template>
    <div :class="builder.classes">
        <slot />
    </div>
</template>
