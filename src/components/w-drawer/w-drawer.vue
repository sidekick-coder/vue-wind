<script lang="ts">
import { useBuilder } from "@/composable/tailwind";
import { ref, computed, defineComponent, onMounted, watch } from "vue";
import { useLayoutItem } from "@/components/w-layout/composable";
import { uniqueId } from "lodash";

export const builder = useBuilder();

builder.static("overflow-auto").option("width", "w", "[300px]");

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
        width: {
            type: String,
            default: "[300px]",
        },
    },
    setup(props) {
        const root = ref();

        onMounted(() => {
            useLayoutItem(props.layoutId, root.value, "drawer");
        });

        const height = ref("100%");

        const classes = computed(() => builder.make(props));
        const style = computed(() => ({
            height: height.value,
        }));

        return { classes, root, style };
    },
});
</script>
<template>
    <div ref="root" :class="classes" :style="style">
        <slot />
    </div>
</template>
