<script setup>
const colors = [
    'zinc-500',
    'teal-500',
    'red-500',
    'blue-500',
    'yellow-500',
    'purple-500',
    'pink-500',

]
</script>
<template>
    <div class="flex gap-2">
        <vw-btn
            v-for="color in colors" :color="color" :key="color"
            class="capitalize"
            variant="outlined"
        >
            {{ color }}
        </vw-btn>
    </div>
</template>