<script setup lang="ts">
import { PropType, ref, watch, onUnmounted, useAttrs } from "vue";
import { useVModel } from "@vueuse/core";
import { useClassBuilder } from "@/composable/class-builder";
import { useForm } from "../w-form/composable";

interface ValidationRule {
    (value: string): boolean | string;
}

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
});

const emit = defineEmits(["update:modelValue"]);

const attrs = useAttrs();

const model = useVModel(props, "modelValue", emit);

const messages = ref<string[]>([]);

const classes = {
    label: useClassBuilder(),
    input: useClassBuilder(),
    small: useClassBuilder(),
};

classes.input
    .add("w-full", "py-3", "px-4")
    .add("focus:outline-none", "outline-none")
    .add("border", "rounded", "border-gray-300", "focus:border-yellow-400")
    .add("bg-gray-200", "focus:bg-white")
    .add("text-gray-400", "font-regular", "text-sm")
    .add("drop-shadow-sm")
    .add("transition-all");

classes.label.add("block").add("text-gray-500", "text-sm", "font-bold", "mb-3");

classes.small.add("text-xs", "mt-4", "block", "text-red-500");

function validate(value: string) {
    messages.value = [];

    props.rules.map((rule) => {
        const message = rule(value);

        if (typeof message === "string") {
            messages.value.push(message);
        }
    });

    return messages.value.length === 0;
}

function validateModel() {
    return validate(props.modelValue);
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

function getId() {
    return (attrs.id as string) || undefined;
}
</script>
<template>
    <label :for="getId()" :class="classes.label.build()" v-if="label">
        {{ label }}
    </label>

    <input v-model="model" v-bind="$attrs" :class="classes.input.build()" />

    <small
        :class="classes.small.build()"
        v-for="message in messages.slice(0, 1)"
        :key="message"
    >
        {{ message }}
    </small>
</template>
