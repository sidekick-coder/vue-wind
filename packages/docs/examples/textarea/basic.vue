
<script setup lang="ts">
const message = ref('')
</script>

<template>
    <div class="flex flex-wrap">
        <div class="mb-4 w-full">
            <w-textarea label="Name" v-model="message" />
        </div>
    </div>
</template>