<script setup lang="ts">

import type { ParsedContentMeta } from '@nuxt/content/dist/runtime/types'

const { data } = await useAsyncData<ParsedContentMeta>('navigation', () => {
    const query = queryContent('components')
    
    return fetchContentNavigation(query)
})

</script>
<template>
    <w-layout>
        <w-drawer class="border-r">
            <nuxt-link
                v-for="c in data[0].children" :key="c._path" :to="c._path"
                class="block py-2 px-4 cursor-pointer text-gray-500 hover:bg-gray-100 border-b"
            >
                {{ c.title }}
            </nuxt-link>
        </w-drawer>

        <w-content>
            <slot />
        </w-content>
    </w-layout>
</template>