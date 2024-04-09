<script setup>
const colors = [
    'zinc',
    'teal',
    'red',
    'blue',
    'yellow',
    'purple',
    'pink',
]
</script>
<template>
    <div class="flex gap-2">
        <vw-btn
            v-for="color in colors" :color="color" :key="color"
            class="capitalize"
            variant="text"
        >
            {{ color }}
        </vw-btn>
    </div>
</template>