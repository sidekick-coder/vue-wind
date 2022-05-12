<script lang="ts">
import { useBuilder } from "@/composable/tailwind";
import { useVModel } from "@vueuse/core";
import { computed } from "vue";

export const builder = useBuilder();

builder
    .static("bg-black/75")
    .static("fixed")
    .static("inset-0", "z-20")
    .static("h-full", "w-full")
    .static("flex", "items-center", "justify-center");
</script>
<script lang="ts" setup>
const props = defineProps({
    modelValue: {
        default: false,
        type: Boolean,
        required: false,
    },
});

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
