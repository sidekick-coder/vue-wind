
<script setup lang="ts">
import type { ParsedContentMeta } from '@nuxt/content/dist/runtime/types'

const { data } = await useAsyncData<ParsedContentMeta>('guides-navigation', () => {
    const query = queryContent('guides')
    
    return fetchContentNavigation(query)
})

</script>

<template>
  <w-layout use-percentage>
    <w-drawer class="border-r" layout-id="drawer">
        <nuxt-link
            v-for="c in data[0].children" :key="c._path" :to="c._path"
            class="block py-3 px-4 cursor-pointer text-gray-500 hover:bg-teal-50 text-sm"
            active-class="text-teal-500 font-bold"
        >
            {{ c.title }}
        </nuxt-link>
    </w-drawer>
      
    <w-content>
      <main class="w-full h-full overflow-auto">
        <content-doc class="px-4 py-5 page" />
      </main>
    </w-content>

  </w-layout>
</template>