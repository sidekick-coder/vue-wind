<script setup lang="ts">
const sizes = [
    'xs',
    'sm',
    'md',
    'lg',
    'xl'
]
</script>
<template>
    <div class="flex justify-center gap-x-4">
        <vw-tooltip
            v-for="size in sizes"
            :size="size"
            :key="size"
            class="capitalize"
        >
            <template #activator="{ attrs }">
                <vw-btn v-bind="attrs">
                    {{ size }} 
                </vw-btn>
            </template>

            <div>
                Hello world
            </div>
        </vw-tooltip>
    </div>
</template>
