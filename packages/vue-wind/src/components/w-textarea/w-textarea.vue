<script lang="ts">
import { useBuilder } from "@/composable/tailwind";

export const builder = useBuilder();

builder
    .option("color", "focus:border", "teal-500")
    .option("minHeight", "min-h")
    .static("w-full", "py-3", "px-4")
    .static("focus:outline-none", "outline-none")
    .static("border", "rounded", "border-gray-300")
    .static("placeholder-shown:bg-gray-200", "focus:bg-white")
    .static("text-gray-400", "font-regular", "text-sm")
    .static("drop-shadow-sm")
    .static("transition-all");

const labelBuilder = useBuilder();
const smallBuilder = useBuilder();

labelBuilder
    .static("block")
    .static("text-gray-500", "text-sm", "font-bold", "mb-3");

smallBuilder.static("text-xs", "mt-4", "block", "text-red-500");
</script>
<script setup lang="ts">
import { useValidation, ValidationRule } from "@/composable/validation";
import { useVModel } from "@vueuse/core";
import { computed, onUnmounted, PropType, watch } from "vue";
import { useForm } from "../w-form/composable";

const props = defineProps({
    modelValue: {
        type: String,
        default: "",
    },
    label: {
        type: String,
        default: null,
    },
    rules: {
        type: Array as PropType<ValidationRule[]>,
        default: () => [],
    },
    color: {
        type: String,
        default: "teal-500",
    },
    minHeight: {
        type: String,
        default: "4",
    },
});

const emit = defineEmits(["update:modelValue"]);

const model = useVModel(props, "modelValue", emit);

const { messages, validate, reset } = useValidation(props.rules);

function validateModel() {
    return validate(model.value);
}

function resetValidation() {
    reset();
}

watch(() => props.modelValue, validate);

const form = useForm();

if (form) {
    form?.inputs.value.push(validateModel);
    form?.resets.value.push(resetValidation);
}

onUnmounted(() => {
    if (form) {
        form.inputs.value.splice(form.inputs.value.indexOf(validateModel), 1);
        form.resets.value.splice(form.resets.value.indexOf(resetValidation), 1);
    }
});

const classes = computed(() => ({
    textarea: builder.make({
        color: props.color,
        minHeight: props.minHeight,
    }),
    small: smallBuilder.make(),
    label: labelBuilder.make(),
}));
</script>
<template>
    <label :class="classes.label" :for="($attrs.id as string)" v-if="label">
        {{ label }}
    </label>

    <textarea v-bind="$attrs" v-model="model" :class="classes.textarea" />

    <small
        :class="classes.small"
        v-for="message in messages.slice(0, 1)"
        :key="message"
    >
        {{ message }}
    </small>
</template>
