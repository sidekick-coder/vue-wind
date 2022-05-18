<script lang="ts">
import { useBuilder } from "@/composable/tailwind";
import { uniqueId } from "lodash";
import { ref, defineComponent, onMounted, computed } from "vue";
import { useLayout, useLayoutItem } from "../w-layout/composable";

export const builder = useBuilder();

builder.static("overflow-hidden w-full h-full");

export default defineComponent({
    props: {
        ...builder.props,
        layoutId: {
            type: String,
            default: () => uniqueId(),
        },
        layout: {
            type: Boolean,
            default: false,
        },
    },
    setup(props) {
        const root = ref();

        const { items } = useLayout();

        const padding = computed(() => {
            const top = items.value
                .filter((item) => item.type === "toolbar")
                .filter((item) => item.offsetType === "top")
                .filter((item) => item.isVisible())
                .reduce((acc, item) => acc + item.height, 0);

            const left = items.value
                .filter((item) => item.type === "drawer")
                .filter((item) => item.offsetType === "left")
                .filter((item) => item.isVisible())
                .reduce((acc, item) => acc + item.width, 0);

            const right = items.value
                .filter((item) => item.type === "drawer")
                .filter((item) => item.offsetType === "right")
                .filter((item) => item.isVisible())
                .reduce((acc, item) => acc + item.width, 0);

            return `${top}px ${right}px 0 ${left}px`;
        });

        onMounted(() => {
            useLayoutItem({
                id: props.layoutId,
                ref: root.value,
                type: "content",
                offsetType: "none",
                height: 0,
                width: 0,
                isVisible: () => true,
            });
        });

        const classes = computed(() => builder.make(props));

        return { root, classes, padding };
    },
});
</script>
<template>
    <div ref="root" :class="classes" :style="`padding: ${padding}`">
        <slot />
    </div>
</template>
