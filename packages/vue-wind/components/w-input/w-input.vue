<script lang="ts">
import { computed, PropType, watch, onUnmounted, defineComponent } from "vue";
import { useVModel } from "../../composables/v-model";

import { useBuilder } from "../../composables/tailwind";
import { useForm } from "../w-form/composable";
import { ValidationRule, useValidation } from "../../composables/validation";

export const builder = useBuilder();

builder
    .option("color", "focus:border", "teal-500")
    .static("w-full", "py-3", "px-4")
    .static("focus:outline-none", "outline-none")
    .static("border", "rounded", "border-gray-300")
    .static("placeholder-shown:bg-gray-200", "focus:bg-white")
    .static("text-gray-400", "font-regular", "text-sm")
    .static("drop-shadow-sm")
    .static("transition-all");

builder
    .child("label")
    .static("block")
    .static("text-gray-500", "text-sm", "font-bold", "mb-3");

builder.child("small").static("text-xs", "mt-4", "block", "text-red-500");

export default defineComponent({
    props: {
        ...builder.props,
        modelValue: {
            type: [String, Number],
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
        placeholder: {
            type: String,
            default: " ",
        },
    },
    emits: ["update:modelValue"],
    setup(props, { emit }) {
        const model = useVModel(props, "modelValue", emit);

        const validation = useValidation(props.rules);

        const classes = computed(() => ({
            input: builder.make(props),
            label: builder.child("label").make(props),
            small: builder.child("small").make(props),
        }));

        function validateModel() {
            return validation.value.validate(props.modelValue);
        }

        function resetValidation() {
            validation.value.reset();
        }

        watch(() => props.modelValue, validation.value.validate);

        const form = useForm();

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

        return { classes, model, validation, resetValidation };
    },
});
</script>
<template>
    <label
        :for="$attrs.id ? String($attrs.id) : undefined"
        :class="classes.label"
        v-if="label"
    >
        {{ label }}
    </label>

    <input
        v-model="model"
        v-bind="$attrs"
        :class="classes.input"
        :placeholder="placeholder"
    />

    <small
        :class="classes.small"
        v-for="message in validation.messages.slice(0, 1)"
        :key="message"
    >
        {{ message }}
    </small>
</template>
