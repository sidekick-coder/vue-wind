<script setup lang="ts">

const brands = [
    { name: 'Apple' },
    { name: 'Google'},
    { name: 'Tesla' },
    { name: 'Amazon' },
    { name: 'Facebook' },
    { name: 'Twitter' },
]

const search = ref('')

const options = computed(() => brands.filter((option) => 
    option.name.toLowerCase().includes(search.value.toLowerCase())
))

</script>

<template>
    <w-autocomplete
        v-model:search="search"
        :options="options"
        label="Brand"
        placeholder="Search for a brand"
        label-key="name"
        value-key="name"
    />
</template>