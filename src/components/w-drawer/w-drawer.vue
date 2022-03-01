<script setup lang="ts">
import { ref, nextTick, computed } from "vue";
import { useLayout } from "@/components/w-layout/composable";
import { useClassBuilder } from "@/composable/class-builder";
import { useCssHelper } from "@/composable/css-helper";

const props = defineProps({
    layout: {
        type: Boolean,
        default: false,
    },
    width: {
        type: String,
        default: "300px",
    },
});

const { drawerRef, toolbarRef } = useLayout();

const cssHelper = useCssHelper();

const classes = ref<string[]>([]);
const height = ref("100%");

const screen = computed(() => ({
    height: document.body.clientHeight,
}));

function setSizes() {
    height.value = "100%";

    if (props.layout && toolbarRef.value) {
        height.value = cssHelper.toMeasure(
            screen.value.height - toolbarRef.value.clientHeight
        );
    }

    setClasses();
}

function setClasses() {
    const builder = useClassBuilder();

    builder
        .add(`w-[${props.width}]`, `h-[${height.value}]`)
        .add("overflow-auto");

    classes.value = builder.classes;
}
setClasses();

nextTick(setSizes);
</script>
<template>
    <div ref="drawerRef" :class="classes">
        <slot />
    </div>
</template>
