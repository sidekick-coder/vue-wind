<script setup lang="ts">
import { useCssHelper } from "@/composable/css-helper";
import { useTailwindBuilder } from "@/composable/tailwind-builder";
import { computed } from "@vue/reactivity";
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

const height = ref("100%");

const builder = useTailwindBuilder();

builder.add("height", "h-");

builder.addStatic("overflow-auto");

const classes = computed(() =>
    builder.make({
        height: `[${height.value}]`,
    })
);

function setSizes() {
    height.value = "100%";

    if (props.layout && toolbarRef.value) {
        height.value = cssHelper.toMeasure(
            document.body.clientHeight - toolbarRef.value.clientHeight
        );
    }
}

nextTick(setSizes);
</script>
<template>
    <div ref="contentRef" :class="classes">
        <slot />
    </div>
</template>
