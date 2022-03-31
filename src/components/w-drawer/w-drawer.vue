<script lang="ts">
import { ref, nextTick, computed } from "vue";
import { useLayout } from "@/components/w-layout/composable";
import { useCssHelper } from "@/composable/css-helper";
import { useTailwindBuilder } from "@/composable/tailwind-builder";

const builder = useTailwindBuilder();

builder.addStatic("overflow-auto").add("width", "w-", "[300px]");

export default {
    props: {
        ...builder.props,
        layout: {
            type: Boolean,
            default: false,
        },
    },
};
</script>
<script setup lang="ts">
const props = withDefaults(defineProps(), {
    layout: false,
});

const { drawerRef, toolbarRef } = useLayout();

const cssHelper = useCssHelper();

const height = ref("100%");

const screen = computed(() => ({
    height: document.body.clientHeight,
}));

const classes = computed(() => [...builder.make(props), `h-[${height.value}]`]);

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
    <div ref="drawerRef" :class="classes">
        <slot />
    </div>
</template>
