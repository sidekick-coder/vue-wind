<script  setup lang="ts">

import WBtn from '@vue-wind/components/WBtn'

const colors = [
  'teal',
  'red',
  'blue',
  '#8b5cf6',
]

const sizes = [
  'sm',
  'md',
  'lg',
  'px-6 py-1'
]

</script>

<template>
  <div>
    <h2 class="mb-2 font-bold" >Colors</h2>

    <div class="flex">
        <WBtn :color="color" v-for="color in colors" :key="color" class="mr-2">
          {{ color }}
        </WBtn>
    </div>
    
    <h2 class="my-2 font-bold" >Sizes</h2>

    <div class="inline-flex items-end">
        <WBtn :size="size" v-for="size in sizes" :key="size" class="mr-2">
          {{ size }}
        </WBtn>
    </div>
    
  </div>
</template>
