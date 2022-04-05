<script lang="ts">
import { useTailwindBuilder } from "@/composable/tailwind-builder";
import { useVModel } from "@vueuse/core";
import { computed } from "vue";

const builder = useTailwindBuilder();

builder
    .addStatic("bg-black/75")
    .addStatic("fixed")
    .addStatic("inset-0", "z-20")
    .addStatic("h-full", "w-full")
    .addStatic("flex", "items-center", "justify-center");

export default {
    props: {
        modelValue: {
            default: false,
            type: Boolean,
            required: false,
        },
        ...builder.props,
    },
};
</script>
<script lang="ts" setup>
interface Props {
    modelValue: boolean;
}

const props = defineProps<Props>();

const emit = defineEmits(["update:modelValue"]);

const model = useVModel(props, "modelValue", emit);

const classes = computed(() => [
    ...builder.make(props),
    model.value ? "" : "hidden",
]);
</script>
<template>
    <div :class="classes" @click="model = false">
        <div @click.stop="">
            <slot />
        </div>
    </div>
</template>
