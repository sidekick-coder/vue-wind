<script setup lang="ts">
import { useTailwindBuilder } from "@/composable/tailwind-builder";
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

const { messages, validate } = useValidation(props.rules);

function validateModel() {
    return validate(model.value);
}

watch(() => props.modelValue, validate);

const form = useForm();

if (form) {
    form?.inputs.value.push(validateModel);
}

onUnmounted(() => {
    if (form) {
        form.inputs.value.splice(form.inputs.value.indexOf(validateModel), 1);
    }
});

const builder = {
    textarea: useTailwindBuilder(),
    label: useTailwindBuilder(),
    small: useTailwindBuilder(),
};

builder.label
    .addStatic("block")
    .addStatic("text-gray-500", "text-sm", "font-bold", "mb-3");

builder.textarea
    .add("color", "focus:border-", "teal-500")
    .add("minHeight", "min-h-")
    .addStatic("w-full", "py-3", "px-4")
    .addStatic("focus:outline-none", "outline-none")
    .addStatic("border", "rounded", "border-gray-300")
    .addStatic("bg-gray-200", "focus:bg-white")
    .addStatic("text-gray-400", "font-regular", "text-sm")
    .addStatic("drop-shadow-sm")
    .addStatic("transition-all");

builder.small.addStatic("text-xs", "mt-4", "block", "text-red-500");

const classes = computed(() => ({
    textarea: builder.textarea.make({
        color: props.color,
        minHeight: props.minHeight,
    }),
    small: builder.small.make(),
    label: builder.label.make(),
}));
</script>
<template>
    <label :class="classes.label" :for="($attrs.id as string)" v-if="label">{{
        label
    }}</label>

    <textarea v-model="model" :class="classes.textarea" />

    <small
        :class="classes.small"
        v-for="message in messages.slice(0, 1)"
        :key="message"
    >
        {{ message }}
    </small>
</template>
