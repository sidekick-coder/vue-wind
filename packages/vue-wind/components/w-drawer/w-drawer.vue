<script lang="ts">
export default defineComponent({ inheritAttrs: false });
</script>

<script setup lang="ts">
import { ref, computed, defineComponent, onMounted } from "vue";
import { useBuilder } from "../../composables/builder";
import { useLayout, useLayoutItem } from "../w-layout/composable";
import { useVModel } from "../../composables/v-model";

const props = defineProps({
    layoutId: {
        type: String,
        default: () => Date.now().toString(),
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
})

const emit = defineEmits(['update:modelValue']);

const builder = useBuilder();
const { items } = useLayout();

const root = ref();

builder
    .add("absolute")
    .add("overflow-hidden")
    .add("top-0")
    .add("transition-transform")
    .add('h-full')
    .add('w-[300px]')
    .toggler("right-0", props.right)
    .toggler("left-0", !props.right)

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

    const classes = computed(() => builder.make());

    const transform = computed(() => {
        if (model.value) return "translateX(0)";

        return props.right ? "translateX(200%)" : "translateX(-100%)";
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
