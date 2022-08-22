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

function reset(noDelay = false) {
    if (noDelay) return form.resets.value.forEach((r) => r());

    setTimeout(() => {
        form.resets.value.forEach((r) => r());
    }, 5);
}

defineExpose({
    submit,
    reset,
});
</script>
<template>
    <form @submit.prevent="submit">
        <slot />
    </form>
</template>
