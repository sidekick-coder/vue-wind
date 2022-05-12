<script lang="ts">
import { useBuilder } from "@/composable/tailwind";
export const builder = useBuilder();

builder
    .option("color", "focus:border")
    .static("w-full", "py-3", "px-4")
    .static("focus:outline-none", "outline-none")
    .static("border", "rounded", "border-gray-300")
    .static("bg-gray-200", "focus:bg-white")
    .static("text-gray-400", "font-regular", "text-sm")
    .static("drop-shadow-sm")
    .static("transition-all");
</script>
<script setup lang="ts">
import { computed, PropType, watch, onUnmounted } from "vue";
import { useVModel } from "@vueuse/core";
import { useForm } from "@/components/w-form/composable";
import { useTailwindBuilder } from "@/composable/tailwind-builder";
import { ValidationRule, useValidation } from "@/composable/validation";

const props = defineProps({
    modelValue: {
        type: String,
        default: "",
    },
    label: {
        type: String,
        default: "",
    },
    rules: {
        type: Array as PropType<ValidationRule[]>,
        default: () => [],
    },
    color: {
        type: String,
        default: "teal-500",
    },
});

const emit = defineEmits(["update:modelValue"]);

const labelBuilder = useTailwindBuilder();
const smallBuilder = useTailwindBuilder();

labelBuilder
    .addStatic("block")
    .addStatic("text-gray-500", "text-sm", "font-bold", "mb-3");

smallBuilder.addStatic("text-xs", "mt-4", "block", "text-red-500");

const model = useVModel(props, "modelValue", emit);

const classes = computed(() => ({
    input: builder.make({ color: props.color }),
    label: labelBuilder.make(),
    small: smallBuilder.make(),
}));

const { messages, validate, reset } = useValidation(props.rules);

function validateModel() {
    return validate(props.modelValue);
}

function resetValidation() {
    reset();
}

watch(() => props.modelValue, validate);

const form = useForm();

if (form) {
    form.inputs.value.push(validateModel);
    form.resets.value.push(resetValidation);
}

onUnmounted(() => {
    if (!form) {
        return;
    }
    form.inputs.value.splice(form.inputs.value.indexOf(validateModel), 1);
    form.resets.value.splice(form.resets.value.indexOf(resetValidation), 1);
});
</script>
<template>
    <label :for="($attrs.id as string)" :class="classes.label" v-if="label">
        {{ label }}
    </label>

    <input v-model="model" v-bind="$attrs" :class="classes.input" />

    <small
        :class="classes.small"
        v-for="message in messages.slice(0, 1)"
        :key="message"
    >
        {{ message }}
    </small>
</template>
