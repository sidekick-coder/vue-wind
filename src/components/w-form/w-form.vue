<script setup lang="ts">
import { provideForm } from "./composable";

const form = provideForm();

const emit = defineEmits(["submit"]);

function submit() {
    const validateAll = form.inputs.value.map((validate) => validate());

    const valid = validateAll.every((v) => v === true);

    if (!valid) {
        return;
    }

    emit("submit");
}

function resetValidation() {
    form.resets.value.forEach((reset) => reset());
}

defineExpose({
    submit,
    resetValidation,
});
</script>
<template>
    <form @submit.prevent="submit">
        <slot />
    </form>
</template>
