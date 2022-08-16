<script setup lang="ts">
import { onMounted, ref, computed } from "vue";

import { useBuilder } from "../../composables/builder";
import { useLayoutItem, useLayout } from "../w-layout/composable";

const props = defineProps({
     layoutId: {
            type: String,
            default: () => Date.now().toString(),
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
            type: String,
            default: "12",
        },
        color: {
            type: String,
            default: "gray-500",
        },
})

const builder = useBuilder();
const root = ref();

builder
    .add("w-full")
    .add("h-[40px]")
    .add("absolute top-0 left-0")
    .add("flex items-center");
 
const { items } = useLayout();

const paddingLeft = computed(() =>
    items.value
        .filter((i) => !props.layoutIgnore.includes(i.id))
        .filter((item) => item.type === "drawer")
        .filter((item) => item.offsetType === "left")
        .filter((item) => item.isVisible())
        .reduce((acc, item) => acc + item.width, 0)
);

const paddingRight = computed(() =>
    items.value
        .filter((i) => !props.layoutIgnore.includes(i.id))
        .filter((item) => item.type === "drawer")
        .filter((item) => item.offsetType === "right")
        .filter((item) => item.isVisible())
        .reduce((acc, item) => acc + item.width, 0)
);

onMounted(() => {
    useLayoutItem({
        id: props.layoutId,
        ref: root.value,
        height: 0,
        width: 0,
        isVisible: () => true,
        offsetType: "top",
        type: "toolbar",
    });
});

const classes = computed(() => builder.make());

</script>

<template>
    <head
        ref="root"
        :class="classes"
        :style="`padding-left: ${paddingLeft}px; padding-right: ${paddingRight}px`"
    >
        <slot />
    </head>
</template>
