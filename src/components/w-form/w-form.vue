<script setup lang="ts">
import { provideForm } from "./composable";

const form = provideForm();

const emit = defineEmits(["submit"]);

function submit() {
    const valid = form.inputs.value.every((validate) => validate() === true);

    if (!valid) {
        return;
    }

    emit("submit");
}
</script>
<template>
    <form @submit.prevent="submit">
        <slot />
    </form>
</template>
