<script lang="ts">
import { useBuilder } from "@/composable/tailwind";
import { provideLayout } from "./composable";

export const builder = useBuilder();
</script>
<script lang="ts" setup>
const { toolbarRef, drawerRef, contentRef } = provideLayout();

defineExpose({
    drawerRef,
    toolbarRef,
    contentRef,
});

builder.static("h-screen w-screen overflow-hidden flex flex-wrap");
</script>

<template>
    <div :class="builder.make()">
        <slot />
    </div>
</template>
