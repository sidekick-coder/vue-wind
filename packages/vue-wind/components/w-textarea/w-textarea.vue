<script setup lang="ts">
import { useBuilder } from "../../composables/builder";
import { useValidation, ValidationRule } from "../../composables/validation";
import { useVModel } from "../../composables/v-model";
import { computed, onUnmounted, PropType, watch } from "vue";
import { useForm } from "../w-form/composable";
import { useVariation } from "../../composables/input";

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
        default: null,
    },
});

const emit = defineEmits(["update:modelValue"]);

const variation = useVariation();
const validation = useValidation(props.rules);
const model = useVModel(props, "modelValue", emit);

const builder = useBuilder();
const color = props.color ?? variation.color

builder
    .add(variation.colors[color])
    .add("w-full", "py-3", "px-4")
    .add("focus:outline-none", "outline-none")
    .add("border", "rounded", "border-gray-300")
    .add("placeholder-shown:bg-gray-200", "focus:bg-white")
    .add("text-gray-400", "font-regular", "text-sm")
    .add("drop-shadow-sm")
    .add("transition-all");

builder
    .createChild('label')
    .add("block")
    .add("text-gray-500", "text-sm", "font-bold", "mb-3");

builder.createChild('small').add("text-xs", "mt-4", "block", "text-red-500");

function validateModel() {
    return validation.value.validate(model.value);
}

function resetValidation() {
    validation.value.reset();
}

watch(() => props.modelValue, validation.value.validate);

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
    textarea: builder.make(),
    label: builder.child("label").make(),
    small: builder.child("small").make(),
}));
</script>
<template>
    <label :class="classes.label" :for="($attrs.id as string)" v-if="label">
        {{ label }}
    </label>

    <textarea v-bind="$attrs" v-model="model" :class="classes.textarea" />

    <small
        :class="classes.small"
        v-for="message in validation.messages.slice(0, 1)"
        :key="message"
    >
        {{ message }}
    </small>
</template>
