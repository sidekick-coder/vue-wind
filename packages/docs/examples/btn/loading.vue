<script setup lang="ts">

const loading = ref({
    default: false,
    text: false,
    spin: false,
})
</script>

<template>
    <div class="flex justify-evenly items-end">
        <w-btn :loading="loading.default" @click="loading.default = !loading.default">
            Default
        </w-btn>
        
        <w-btn :loading="loading.text" @click="loading.text = !loading.text">
            <template #default>
                Loading Text
            </template>

            <template #loading>
                Loading...
            </template>
        </w-btn>
        
        <w-btn :loading="loading.spin" @click="loading.spin = !loading.spin">
            Spin
            <template #loading>
                <fa-icon icon="spinner" spin /> <!--  font awesome component -->
            </template>
        </w-btn>
    </div>
</template>