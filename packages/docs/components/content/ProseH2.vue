<template>
    <h2 :id="id" class="font-bold text-lg my-4 gap-x-1">
      <a
        v-if="generate"
        :href="`#${id}`"
      >
        <slot />
      </a>
      <slot v-else />
    </h2>
  </template>
  
  <script setup lang="ts">
  import { computed, useRuntimeConfig } from '#imports'
  
  const props = defineProps<{ id?: string }>()
  
  const { headings } = useRuntimeConfig().public.mdc
  const generate = computed(() => props.id && headings?.anchorLinks?.h1)
  </script>