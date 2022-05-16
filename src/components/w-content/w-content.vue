<script lang="ts">
import { useBuilder } from "@/composable/tailwind";
import { computed } from "@vue/reactivity";
import { uniqueId } from "lodash";
import { ref, defineComponent, onMounted } from "vue";
import { LayoutItem, useLayoutItem } from "../w-layout/composable";

export const builder = useBuilder();

builder.static("overflow-auto");

export default defineComponent({
    props: {
        ...builder.props,
        layoutId: {
            type: String,
            default: uniqueId(),
        },
        layout: {
            type: Boolean,
            default: false,
        },
        layoutIgnore: {
            type: Array,
            default: () => [],
        },
    },
    setup(props) {
        const root = ref();

        const height = ref("100%");
        const width = ref("100%");

        function resize(items: LayoutItem[]) {
            const offsetWidth = items
                .filter((i) => i.type === "drawer")
                .filter((i) => !props.layoutIgnore.includes(i.id))
                .map((i) => i.width)
                .reduce((a, b) => a + b, 0);

            const offsetHeight = items
                .filter((i) => i.type === "toolbar")
                .map((i) => i.height)
                .reduce((a, b) => a + b, 0);

            width.value = `calc(100% - ${offsetWidth}px)`;
            height.value = `calc(100% - ${offsetHeight}px)`;
        }

        onMounted(() => {
            useLayoutItem(props.layoutId, root.value, "content", resize);
        });

        const classes = computed(() => builder.make(props));

        return { root, classes, height, width };
    },
});
</script>
<template>
    <div
        ref="root"
        :class="classes"
        :style="`height: ${height}; width: ${width}`"
    >
        <slot />
    </div>
</template>
