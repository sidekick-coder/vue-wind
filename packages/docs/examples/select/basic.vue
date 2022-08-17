<script setup lang="ts">

const brands = [
    { name: 'Apple' },
    { name: 'Google'},
    { name: 'Tesla' },
    { name: 'Amazon' },
    { name: 'Facebook' },
    { name: 'Twitter' },
]

const selected = ref('')
</script>

<template>
    <w-select
        v-model="selected"
        :options="brands"
        label="Brand"
        label-key="name"
        value-key="name"
    />
</template>