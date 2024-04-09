<template>
    <h1 :id="id" class="font-bold text-2xl mb-2 flex items-center">
      <d-icon name = "mdi:hashtag" class="mr-2 text-base text-teal-500" />

      <a
        v-if="generate"
        :href="`#${id}`"
      >
        <slot />
      </a>
      <slot v-else />
    </h1>
  </template>
  
  <script setup lang="ts">
  import { computed, useRuntimeConfig } from '#imports'
  
  const props = defineProps<{ id?: string }>()
  
  const { headings } = useRuntimeConfig().public.mdc
  const generate = computed(() => props.id && headings?.anchorLinks?.h1)
  </script>