<script setup>
const sizes = [
    'xs',
    'sm',
    'md',
    'lg',
    'xl'
]
</script>
<template>
    <div class="flex items-end gap-2">
        <vw-btn
            v-for="size in sizes" :size="size" :key="size"
            class="capitalize"
        >
            {{ size }} size
        </vw-btn>
    </div>
</template>