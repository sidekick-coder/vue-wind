<script lang="ts" setup>
import VwBtn from './components/VwBtn.vue'
</script>

<template>
    <div class="h-screen w-screen flex items-center justify-center">
        <div class="flex flex-col gap-y-4">
            <vw-btn>Click me</vw-btn>
            <vw-btn color="teal-500">Click me</vw-btn>

            <vw-btn variant="outlined">Click me</vw-btn>
            <vw-btn variant="outlined" color="teal-500">Click me</vw-btn>
        </div>
    </div>
</template>
