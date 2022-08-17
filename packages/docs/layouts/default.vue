<script setup lang="ts">

import type { ParsedContentMeta } from '@nuxt/content/dist/runtime/types'

const { data } = await useAsyncData<ParsedContentMeta>('navigation', () => {
    const query = queryContent('components')
    
    return fetchContentNavigation(query)
})

</script>
<template>
        <w-layout>
            
            <w-toolbar :layout-ignore="['drawer']" class="border-b z-10">
                <nuxt-link to="/" class="px-4 flex items-center">
                    <img
                        src="/logo-full.svg"
                        alt="vue-wind"
                        width="35"                        
                        height="21"
                    >

                    <span class="ml-2 text-teal-500 font-bold">Vue wind</span>
                </nuxt-link>
            </w-toolbar>
    
            <w-drawer class="border-r" layout-id="drawer">
                <nuxt-link
                    v-for="c in data[0].children" :key="c._path" :to="c._path"
                    class="block py-2 px-4 cursor-pointer text-gray-500 hover:bg-teal-50 text-sm"
                >
                    {{ c.title }}
                </nuxt-link>
            </w-drawer>
    
            <w-content>
                <div class="w-full h-full overflow-auto">
                    <slot />
                </div>
            </w-content>
        </w-layout>
</template>