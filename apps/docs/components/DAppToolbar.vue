<script setup lang="ts">
const links = [
    {
        label: 'Home',
        to: '/'
    },
    // {
    //     label: 'About',
    //     to: '/about'
    // },
    {
        label: 'Guides',
        to: '/guides/getting-started'
    },
]
</script>
<template>
    <div class="border-b py-2 px-4 flex justify-center">
        <div class="flex gap-x-4">
            <nuxt-link
                v-for="link in links"
                :key="link.label"
                :to="link.to"
                class="text-teal-500 hover:text-teal-700 font-bold"
            >
                {{ link.label }}
            </nuxt-link>
        </div>
    </div>
</template>