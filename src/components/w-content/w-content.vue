<script setup lang="ts">
import { useClassBuilder } from "@/composable/class-builder";
import { useCssHelper } from "@/composable/css-helper";
import { ref, nextTick } from "vue";
import { useLayout } from "../w-layout/composable";

const props = defineProps({
    layout: {
        type: Boolean,
        default: false,
    },
});

const { contentRef, toolbarRef } = useLayout();
const cssHelper = useCssHelper();

const classes = ref<string[]>([]);
const height = ref("100%");

function setClasses() {
    const builder = useClassBuilder();

    builder.add("overflow-auto").add(`h-[${height.value}]`).add("flex-1");

    classes.value = builder.classes;
}

function setSizes() {
    height.value = "100%";

    if (props.layout && toolbarRef.value) {
        height.value = cssHelper.toMeasure(
            document.body.clientHeight - toolbarRef.value.clientHeight
        );
    }
}

nextTick(setSizes);
nextTick(setClasses);
</script>
<template>
    <div ref="contentRef" :class="classes">
        <slot />
    </div>
</template>
