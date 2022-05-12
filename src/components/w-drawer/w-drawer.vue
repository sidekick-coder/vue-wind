<script lang="ts">
import { useBuilder } from "@/composable/tailwind";
import { ref, nextTick, computed } from "vue";
import { useLayout } from "@/components/w-layout/composable";
import { useCssHelper } from "@/composable/css-helper";

export const builder = useBuilder();

builder.static("overflow-auto").option("width", "w", "[300px]");
</script>
<script setup lang="ts">
const props = defineProps({
    layout: {
        type: Boolean,
        default: false,
    },
    width: {
        type: String,
        default: "[300px]",
    },
});

const { drawerRef, toolbarRef } = useLayout();

const cssHelper = useCssHelper();

const height = ref("100%");

const screen = computed(() => ({
    height: document.body.clientHeight,
}));

const classes = computed(() => builder.make(props));
const style = computed(() => `height: ${height.value};`);

function setSizes() {
    height.value = "100%";

    if (props.layout && toolbarRef.value) {
        height.value = cssHelper.toMeasure(
            screen.value.height - toolbarRef.value.clientHeight
        );
    }
}

nextTick(setSizes);
</script>
<template>
    <div ref="drawerRef" :class="classes" :style="style">
        <slot />
    </div>
</template>
