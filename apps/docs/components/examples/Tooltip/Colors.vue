<script setup lang="ts">
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
    <div class="flex justify-center gap-x-4">
        <vw-tooltip
            v-for="color in colors"
            :color="color"
            :key="color"
            class="capitalize"
        >
            <template #activator="{ attrs }">
                <vw-btn v-bind="attrs">
                    {{ color }} 
                </vw-btn>
            </template>

            <div>
                Hello world
            </div>
        </vw-tooltip>
    </div>
</template>
