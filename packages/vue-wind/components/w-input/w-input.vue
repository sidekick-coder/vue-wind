<script lang="ts">
import { computed, PropType, watch, onUnmounted, defineComponent } from "vue";
import { useVModel } from "../../composables/v-model";

import { useBuilder } from "../../composables/builder";
import { useForm } from "../w-form/composable";
import { ValidationRule, useValidation } from "../../composables/validation";

export const builder = useBuilder();

builder
    .add("w-full", "py-3", "px-4")
    .add("focus:outline-none", "outline-none")
    .add("border", "rounded", "border-gray-300")
    .add("placeholder-shown:bg-gray-200", "focus:bg-white")
    .add("text-gray-400", "font-regular", "text-sm")
    .add("drop-shadow-sm")
    .add("transition-all");

builder
    .createChild("label")
    .add("block")
    .add("text-gray-500", "text-sm", "font-bold", "mb-3");

builder.createChild("small").add("text-xs", "mt-4", "block", "text-red-500");

export default defineComponent({
    props: {
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
            input: builder.make(),
            label: builder.child("label").make(),
            small: builder.child("small").make(),
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
