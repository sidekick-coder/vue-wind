<script lang="ts">
import { useBuilder } from "@/composable/tailwind";
import { ref, computed, defineComponent, onMounted } from "vue";
import { useLayout, useLayoutItem } from "@/components/w-layout/composable";
import { uniqueId } from "lodash";
import { useVModel } from "@vueuse/core";

export const builder = useBuilder();

builder
    .static("absolute")
    .static("overflow-hidden")
    .static("top-0")
    .static("transition-transform")
    .option("h", "h", "full")
    .option("width", "w", "[300px]")
    .toggle("right", "right-0")
    .toggle("left", "left-0");

export default defineComponent({
    inheritAttrs: false,
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
        modelValue: {
            type: Boolean,
            default: true,
        },
        right: {
            type: Boolean,
            default: false,
        },
    },
    emits: ["update:modelValue"],
    setup(props, { emit }) {
        const root = ref();
        const { items } = useLayout();

        onMounted(() => {
            useLayoutItem({
                id: props.layoutId,
                ref: root.value,
                type: "drawer",
                height: 0,
                width: 0,
                isVisible: () => props.modelValue,
                offsetType: props.right ? "right" : "left",
            });
        });

        const paddingTop = computed(() =>
            items.value
                .filter((item) => item.type === "toolbar")
                .filter((item) => item.offsetType === "top")
                .filter((item) => item.isVisible())
                .reduce((acc, item) => acc + item.height, 0)
        );

        const model = useVModel(props, "modelValue", emit);

        const classes = computed(() =>
            builder.make({
                ...props,
                right: props.right,
                left: !props.right,
            })
        );
        const transform = computed(() => {
            if (model.value) return "translateX(0)";

            return props.right ? "translateX(200%)" : "translateX(-100%)";
        });

        return { classes, root, paddingTop, transform };
    },
});
</script>
<template>
    <aside
        ref="root"
        :class="classes"
        :style="{ paddingTop: `${paddingTop}px`, transform }"
    >
        <div class="h-full w-full overflow-auto" v-bind="$attrs">
            <slot />
        </div>
    </aside>
</template>
