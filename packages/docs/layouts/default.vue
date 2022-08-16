<script setup lang="ts">

import type { ParsedContentMeta } from '@nuxt/content/dist/runtime/types'

const { data } = await useAsyncData<ParsedContentMeta>('navigation', () => {
    const query = queryContent('components')
    
    return fetchContentNavigation(query)
})

</script>
<template>
    

        <w-layout>
            
            <w-toolbar :layout-ignore="['drawer']" class="border-b">
                <div class="px-4 text-teal-500 font-bold">
                    Vue-wind
                </div>
            </w-toolbar>
    
            <w-drawer class="border-r" layout-id="drawer">
                <nuxt-link
                    v-for="c in data[0].children" :key="c._path" :to="c._path"
                    class="block py-2 px-4 cursor-pointer text-gray-500 hover:bg-teal-50"
                >
                    {{ c.title }}
                </nuxt-link>
            </w-drawer>
    
            <w-content>
                <slot />
            </w-content>
        </w-layout>
</template>