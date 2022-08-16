<script setup lang="ts">

const brands = [
    { name: 'Apple' },
    { name: 'Google'},
    { name: 'Tesla' },
    { name: 'Amazon' },
    { name: 'Facebook' },
    { name: 'Twitter' },
    { name: 'Instagram' },
    { name: 'Youtube' },
    { name: 'Spotify' },
    { name: 'Netflix' },
    { name: 'Twitch' },
    { name: 'Snapchat' },
    { name: 'Tumblr' },
    { name: 'Reddit' },
]

const search = ref('')
const options = brands.filter(({ name }) => name.includes(search.value))

</script>

<template>
    <w-autocomplete
        v-model:search="search"
        :options="options"
        label="Brand"
        label-key="name"
        value-key="name"
    />
</template>