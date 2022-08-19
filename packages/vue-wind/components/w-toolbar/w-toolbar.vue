<script setup lang="ts">
import { ref, computed } from "vue";

import { useBuilder } from "../../composables/builder";
import { useLayoutItem, useLayout } from "../w-layout/composable";

const props = defineProps({
    layoutId: {
        type: String,
        default: '',
    },
    layoutIgnore: {
        type: Array,
        default: () => [],
    },
    layout: {
        type: Boolean,
        default: false,
    },
    height: {
        type: Number,
        default: 40,
    },
})

const builder = useBuilder();
const root = ref();

builder
    .add("w-full")
    .add("absolute top-0 left-0")
    .add("flex items-center");
 
const { items } = useLayout();

const padding = computed(() => {
    const right = items.value
        .filter((i) => !props.layoutIgnore.includes(i.id))
        .filter((item) => item.type === "drawer")
        .filter((item) => item.offsetType === "right")
        .filter((item) => item.isVisible())
        .reduce((acc, item) => acc + item.width, 0)

    const left = items.value
        .filter((i) => !props.layoutIgnore.includes(i.id))
        .filter((item) => item.type === "drawer")
        .filter((item) => item.offsetType === "left")
        .filter((item) => item.isVisible())
        .reduce((acc, item) => acc + item.width, 0)

    return `0 ${right}px 0 ${left}px`;
}
    
);


useLayoutItem({
    id: props.layoutId,
    ref: root.value,
    height: props.height,
    width: 0,
    isVisible: () => true,
    offsetType: "top",
    type: "toolbar",
});

const classes = computed(() => builder.make());

</script>

<template>
    <div
        ref="root"
        :class="classes"
        :style="{ padding: padding, height: `${height}px` }"
    >
        <slot />
    </div>
</template>
