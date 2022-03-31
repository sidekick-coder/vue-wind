<script lang="ts">
import { computed, PropType, ref, watch, onUnmounted, useAttrs } from "vue";
import { useVModel } from "@vueuse/core";
import { useForm } from "@/components/w-form/composable";
import { useTailwindBuilder } from "@/composable/tailwind-builder";

const inputBuilder = useTailwindBuilder("input");
const labelBuilder = useTailwindBuilder("label");
const smallBuilder = useTailwindBuilder("small");

inputBuilder
    .addStatic("w-full", "py-3", "px-4")
    .addStatic("focus:outline-none", "focus:border-yellow-400", "outline-none")
    .addStatic("border", "rounded", "border-gray-300")
    .addStatic("bg-gray-200", "focus:bg-white")
    .addStatic("text-gray-400", "font-regular", "text-sm")
    .addStatic("drop-shadow-sm")
    .addStatic("transition-all");

labelBuilder
    .addStatic("block")
    .addStatic("text-gray-500", "text-sm", "font-bold", "mb-3");

smallBuilder.addStatic("text-xs", "mt-4", "block", "text-red-500");

export default {
    props: {
        ...inputBuilder.props,
        ...labelBuilder.props,
        ...smallBuilder.props,
    },
};
</script>
<script setup lang="ts">
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

const classes = computed(() => ({
    input: inputBuilder.make(),
    label: labelBuilder.make(),
    small: smallBuilder.make(),
}));

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
    <label :for="getId()" :class="classes.label" v-if="label">
        {{ label }}
    </label>

    <input v-model="model" v-bind="$attrs" :class="classes.input" />

    <small
        :class="classes.small"
        v-for="message in messages.slice(0, 1)"
        :key="message"
    >
        {{ message }}
    </small>
</template>
