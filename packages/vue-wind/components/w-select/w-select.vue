<script setup lang="ts">
import { computed, onUnmounted, ref, watch } from "vue";

import { useBuilder } from "../../composables/builder";
import { useValidation, ValidationRule } from "../../composables/validation";
import { useForm } from "../w-form/composable";

const props = defineProps({
     label: {
        type: String,
        default: "",
    },
    rules: {
        type: Array as () => ValidationRule[],
        default: () => [],
    },
    modelValue: {
        default: "",
    },
    options: {
        type: Array as () => any[],
        default: () => [],
    },
    valueKey: {
        type: String,
        default: undefined,
    },
    labelKey: {
        type: String,
        default: undefined,
    },
})

const emit = defineEmits(['update:modelValue'])

const builder = useBuilder();
const validation = useValidation(props.rules);
const form = useForm();

builder
    .add("w-full", "py-3", "px-4")
    .add("focus:outline-none", "outline-none")
    .add("border", "rounded", "border-gray-300")
    .add("focus:bg-white")
    .add("text-gray-400", "font-regular", "text-sm")
    .add("drop-shadow-sm")
    .add("transition-all")
    .add("relative")

builder
    .createChild("label")
    .add("block")
    .add("text-gray-500", "text-sm", "font-bold", "mb-3");

builder.createChild("small").add("text-xs", "mt-4", "block", "text-red-500");

        const selectRef = ref(null as HTMLElement | null);
        const classes = computed(() => ({
            select: builder.make(),
            label: builder.child("label").make(),
            small: builder.child("small").make(),
        }));

        const model = computed({
            get() {
                return props.modelValue;
            },
            set(option: any) {
                if (!option) return emit("update:modelValue", "");

                return emit("update:modelValue", option.value);
            },
        });

        const optionsFormatted = computed(() =>
            props.options.map((o) => ({
                label: props.labelKey ? o[props.labelKey] : o,
                value: props.valueKey ? o[props.valueKey] : o,
            }))
        );

        function validateModel() {
            return validation.value.validate(props.modelValue);
        }

        function resetValidation() {
           validation.value.reset();
        }

        if (form) {
            form.inputs.value.push(validateModel);
            form.resets.value.push(resetValidation);
        }

        watch(model, validation.value.validate);

        onUnmounted(() => {
            if (!form) return;

            form.inputs.value.splice(
                form.inputs.value.indexOf(validateModel),
                1
            );
            form.resets.value.splice(
                form.resets.value.indexOf(resetValidation),
                1
            );
        });

        function onChange(e: Event) {
            const target = e.target as HTMLSelectElement;

            const option = optionsFormatted.value.find(
                (o) => o.value === target.value
            );

            model.value = option;
        }
</script>

<template>
    <label
        v-if="label"
        :for="$attrs.id ? String($attrs.id) : undefined"
        :class="classes.label"
    >
        {{ label }}
    </label>

    <div class="relative">
        <select
            ref="selectRef"
            :value="model"
            @change="onChange"
            :class="classes.select"
            v-bind="$attrs"
        >
            <option
                v-for="(option, index) in optionsFormatted"
                :key="index"
                :value="option.value"
                :selected="option.value === model"
                v-text="option.label"
            />
        </select>
    </div>

    <small
        :class="classes.small"
        v-for="message in validation.messages.slice(0, 1)"
        :key="message"
    >
        {{ message }}
    </small>
</template>
