<script lang="ts">
export default defineComponent({ inheritAttrs: false });
</script>

<script setup lang="ts">
import {
    computed,
    defineComponent,
    onUnmounted,
    ref,
    watch,
} from "vue";

import { useBuilder } from "../../composables/builder";
import { useValidation, ValidationRule } from "../../composables/validation";
import { useVModel } from "../../composables/v-model";
import { useForm } from "../w-form/composable";

const props = defineProps({
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
})

const emit = defineEmits(['update:modelValue', 'update:search']);

const validation = useValidation(props.rules);
const builder = useBuilder();
const form = useForm();

builder
    .child("list")
    .add("max-h-[200px]")
    .add("overflow-y-auto border bg-white");

builder
    .child("item")
    .add("py-2 px-4")
    .add("cursor-pointer text-gray-500 hover:bg-gray-100")
    .add("border-b last:border-b-0 border-gray-200");

builder.child("small").add("text-xs", "mt-4", "block", "text-red-500");



const menu = ref(false);
const searchModel = useVModel(props, "search", emit);
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
    list: builder.child("list").make(),
    item: builder.child("item").make(),
    small: builder.child("small").make(),
}));

function onFocus() {
    searchModel.value = "";
    model.value = "";
    menu.value = true;

    setTimeout(validation.reset, 50);
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

    return validation.validate(option ? option : "");
}

function resetValidation() {
    validation.reset();
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
                v-for="message in validation.messages.slice(0, 1)"
                :class="classes.small"
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
