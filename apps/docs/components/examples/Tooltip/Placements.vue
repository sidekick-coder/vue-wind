<script setup lang="ts">
const placements = ['bottom', 'top', 'right', 'left'] as const
</script>
<template>
    <div class="flex justify-center gap-x-4">
        <vw-tooltip
            v-for="placement in placements"
            :placement="placement"
            :key="placement"
            class="capitalize"
        >
            <template #activator="{ attrs }">
                <vw-btn v-bind="attrs">
                    {{ placement }} 
                </vw-btn>
            </template>

            <div>
                Hello world
            </div>
        </vw-tooltip>
    </div>
</template>
