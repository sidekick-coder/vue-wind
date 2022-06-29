<script lang="ts">
import { useBuilder } from "@/composable/tailwind";
import { useValidation, ValidationRule } from "@/composable/validation";
import { computed, defineComponent, onUnmounted, ref, watch } from "vue";
import { useForm } from "../w-form/composable";

export const builder = useBuilder();

builder
    .option("color", "focus:border", "teal-500")
    .static("w-full", "py-3", "px-4")
    .static("focus:outline-none", "outline-none")
    .static("border", "rounded", "border-gray-300")
    .static("focus:bg-white")
    .static("text-gray-400", "font-regular", "text-sm")
    .static("drop-shadow-sm")
    .static("transition-all")
    .static("relative")
    .toggle("noSelected", "bg-gray-200");

builder
    .child("label")
    .static("block")
    .static("text-gray-500", "text-sm", "font-bold", "mb-3");

builder
    .child("option")
    .option("color", "hover:bg", "teal-500")
    .static("text-gray-500 hover:text-white")
    .static("w-full py-2 px-4")
    .static("last:rounded-b-lg")
    .static("cursor-pointer")
    .static("bg-white");

builder
    .child("menu")
    .static("w-full z-20")
    .static("absolute mt-[47px] top-0 left-0 drop-shadow-lg");

builder.child("small").static("text-xs", "mt-4", "block", "text-red-500");

export default defineComponent({
    props: {
        ...builder.props,
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
    },
    emits: ["update:modelValue"],
    setup(props, { emit }) {
        const { messages, validate, reset } = useValidation(props.rules);
        const form = useForm();

        const menu = ref(false);
        const selectRef = ref(null as HTMLElement | null);
        const classes = computed(() => ({
            select: builder.make({
                ...props,
                noSelected: !props.modelValue,
            }),
            label: builder.child("label").make(props),
            small: builder.child("small").make(props),
            option: builder.child("option").make(props),
            menu: builder.child("menu").make(props),
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
            return validate(props.modelValue);
        }

        function resetValidation() {
            reset();
        }

        if (form) {
            form.inputs.value.push(validateModel);
            form.resets.value.push(resetValidation);
        }

        watch(model, validate);

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

        function toggleMenu() {
            menu.value = true;

            if (selectRef.value) selectRef.value.focus();
        }

        return {
            menu,
            classes,
            model,
            messages,
            validate,
            resetValidation,
            optionsFormatted,
            onChange,
            toggleMenu,
            selectRef,
        };
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

    <div class="relative">
        <select
            ref="selectRef"
            :value="model"
            @change="onChange"
            :class="classes.select"
            v-bind="$attrs"
            @mousedown.prevent="toggleMenu"
        >
            <option
                v-for="(option, index) in optionsFormatted"
                :key="index"
                :value="option.value"
                :selected="option.value === model"
                v-text="option.label"
                class="hidden"
            />
        </select>

        <div :class="classes.menu" v-if="menu">
            <div
                v-for="(option, index) in optionsFormatted"
                :key="index"
                :class="classes.option"
                v-text="option.label"
                @click="
                    model = option;
                    menu = false;
                "
            />
        </div>
    </div>

    <small
        :class="classes.small"
        v-for="message in messages.slice(0, 1)"
        :key="message"
    >
        {{ message }}
    </small>
</template>
