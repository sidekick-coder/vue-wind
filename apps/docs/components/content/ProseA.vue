<template>
    <NuxtLink
      :href="href"
      :target="target"
      class="text-teal-500"
    >
      <slot />
    </NuxtLink>
  </template>
  
  <script setup lang="ts">
  defineProps({
    href: {
      type: String,
      default: ''
    },
    target: {
      type: String,
      default: undefined,
      required: false
    }
  })
  </script>