<script lang="ts">
import { useBuilder } from "@/composable/tailwind";
import { useVModel } from "@vueuse/core";
import { computed, defineComponent } from "vue";

export const builder = useBuilder();

builder
    .static("bg-black/75")
    .static("fixed")
    .static("inset-0", "z-20")
    .static("h-full", "w-full")
    .static("flex", "items-center", "justify-center");

export default defineComponent({
    props: {
        ...builder.props,
        modelValue: {
            default: false,
            type: Boolean,
            required: false,
        },
    },
    emits: ["update:modelValue"],
    setup(props, { emit }) {
        const classes = computed(() => [
            ...builder.makeArray(props),
            model.value ? "" : "hidden",
        ]);

        const model = useVModel(props, "modelValue", emit);

        return { classes, model };
    },
});
</script>
<template>
    <div :class="classes" @click="model = false">
        <div @click.stop="">
            <slot />
        </div>
    </div>
</template>
