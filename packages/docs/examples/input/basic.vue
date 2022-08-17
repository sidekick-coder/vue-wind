
<script setup lang="ts">
const name = ref('')
</script>

<template>
    <div class="flex flex-wrap">
        <div class="mb-4 w-full">
            <w-input label="Name" v-model="name" />
        </div>

        <div>Value: {{name}}</div> 
    </div>
</template>