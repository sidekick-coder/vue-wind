<script setup lang="ts">
import { watch, onUnmounted } from "vue";
import { useVModel } from "../../composables/v-model";

import { useBuilder } from "../../composables/builder";
import { useForm } from "../w-form/composable";
import { useValidation } from "../../composables/validation";
import { useVariation } from "../../composables/input";

import type { ValidationRule } from "../../composables/validation";

const props = defineProps({
    modelValue: {
        type: [String, Number],
        default: "",
    },
    label: {
        type: String,
        default: "",
    },
    rules: {
        type: Array as () => ValidationRule[],
        default: () => [],
    },
    placeholder: {
        type: String,
        default: " ",
    },
    color: {
        type: String,
        default: null,
    }
})

const emit = defineEmits(['update:modelValue'])

const builder = useBuilder();
const variation = useVariation();
const form = useForm();

const validation = useValidation(props.rules);
const model = useVModel(props, "modelValue", emit);
const color = props.color ?? variation.color

builder
    .add(variation.colors[color])
    .add("w-full", "py-3", "px-4")
    .add("focus:outline-none", "outline-none")
    .add("border", "rounded")
    .add("placeholder-shown:bg-gray-200", "focus:bg-white")
    .add("text-gray-400", "font-regular", "text-sm")
    .add("drop-shadow-sm")
    .add("transition-all")

builder
    .createChild("label")
    .add("block")
    .add("text-gray-500", "text-sm", "font-bold", "mb-3");

builder.createChild("small").add("text-xs", "mt-4", "block", "text-red-500");


function validateModel() {
    return validation.value.validate(props.modelValue);
}

function resetValidation() {
    validation.value.reset();
}

watch(() => props.modelValue, validation.value.validate);

if (form) {
    form.inputs.value.push(validateModel);
    form.resets.value.push(resetValidation);
}

onUnmounted(() => {
    if (!form) {
        return;
    }

    form.inputs.value.splice(
        form.inputs.value.indexOf(validateModel),
        1
    );

    form.resets.value.splice(
        form.resets.value.indexOf(resetValidation),
        1
    );
});

</script>
<template>
    <label
        :for="$attrs.id ? String($attrs.id) : undefined"
        :class="builder.makeChild('label')"
        v-if="label"
    >
        {{ label }}
    </label>

    <input
        v-model="model"
        v-bind="$attrs"
        :class="builder.make()"
        :placeholder="placeholder"
    />

    <small
        :class="builder.makeChild('small')"
        v-for="message in validation.messages.slice(0, 1)"
        :key="message"
    >
        {{ message }}
    </small>
</template>
