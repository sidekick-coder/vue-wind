<script lang="ts">
import { useBuilder } from "@/composable/tailwind";
import { useValidation, ValidationRule } from "@/composable/validation";
import { useVModel } from "@vueuse/core";
import {
    computed,
    defineComponent,
    onUnmounted,
    ref,
    watch,
} from "vue";
import { useForm } from "../w-form/composable";

export const builder = useBuilder();

builder
    .child("list")
    .option("height", "max-h", "[200px]")
    .static("overflow-y-auto border bg-white");

builder
    .child("item")
    .static(
        "py-2 px-4 border-b last:border-b-0 border-gray-200 cursor-pointer text-gray-500 hover:bg-gray-100"
    );

builder.child("small").static("text-xs", "mt-4", "block", "text-red-500");

export default defineComponent({
    inheritAttrs: false,
    props: {
        ...builder.props,
        ...builder.child("list").props,
        rules: {
            type: Array as () => ValidationRule[],
            default: () => [],
        },
        search: {
            type: String,
            default: "",
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
    emits: ["update:modelValue", "update:search"],
    setup(props, { emit }) {
        const form = useForm();
        const { messages, validate, reset } = useValidation(props.rules);

        const searchModel = useVModel(props, "search", emit);
        const menu = ref(false);
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

        const classes = computed(() => ({
            list: builder.child("list").make(props),
            item: builder.child("item").make(props),
            small: builder.child("small").make(props),
        }));

        function onFocus() {
            searchModel.value = "";
            model.value = "";
            menu.value = true;

            setTimeout(reset, 50);
        }

        function onBlur() {
            menu.value = false;
        }

        function select(option: any) {
            searchModel.value = option.label;
            model.value = option;
            menu.value = false;
        }

        function validateModel() {
            const option = optionsFormatted.value.find(
                (o) => o.value === model.value
            );

            return validate(option ? option : "");
        }

        function resetValidation() {
            reset();
        }

        if (form) {
            form.inputs.value.push(validateModel);
            form.resets.value.push(resetValidation);
        }

        watch(model, validateModel);

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

        return {
            menu,
            searchModel,
            model,
            optionsFormatted,
            classes,
            messages,
            onFocus,
            onBlur,
            select,
        };
    },
});
</script>

<template>
    <w-menu v-model="menu">
        <template #activator>
            <w-input
                v-model="searchModel"
                v-bind="$attrs"
                @focus="onFocus"
                @blur="onBlur"
            />

            <small
                :class="classes.small"
                v-for="message in messages.slice(0, 1)"
                :key="message"
            >
                {{ message }}
            </small>
        </template>

        <div :class="classes.list">
            <div
                :class="classes.item"
                v-for="option in optionsFormatted"
                :key="option.value"
                @mousedown="select(option)"
            >
                {{ option.label }}
            </div>
        </div>
    </w-menu>
</template>
