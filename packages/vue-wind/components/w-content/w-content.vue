<script lang="ts">
import { useBuilder } from "../../composables/builder";
import { ref, defineComponent, computed } from "vue";
import { useLayout, useLayoutItem } from "../w-layout/composable";

export const builder = useBuilder();

builder.add("overflow-hidden w-full h-full");

export default defineComponent({
    props: {
        layoutId: {
            type: String,
            default: () => Date.now().toString(),
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

        
        useLayoutItem({
            id: props.layoutId,
            ref: root.value,
            type: "content",
            offsetType: "none",
            height: 0,
            width: 0,
            isVisible: () => true,
        });
        

        const classes = computed(() => builder.make());

        return { root, classes, padding };
    },
});
</script>
<template>
    <div ref="root" :class="classes" :style="`padding: ${padding}`">
        <slot />
    </div>
</template>
