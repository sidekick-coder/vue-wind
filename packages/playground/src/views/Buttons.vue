<script  setup lang="ts">

import WBtn from '@vue-wind/components/WBtn'
import { ref } from 'vue'

const colors = ref([
  'teal',
  'red',
  'blue',
  '#8b5cf6',
])

setInterval(() => {
  colors.value[3] = '#' + Math.floor(Math.random()*16777215).toString(16)
}, 5000)

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
        <WBtn :color="color" v-for="(color, index) in colors" :key="index" class="mr-2 last:mr-0">
          {{ color }}
        </WBtn>
    </div>
    
    <h2 class="my-2 font-bold" >Outlined</h2>

    <div class="flex items-end">
        <WBtn mode="outlined" :color="color" v-for="(color, index) in colors" :key="index" class="mr-2 last:mr-0">
          {{ color }}
        </WBtn>
    </div>

    <h2 class="my-2 font-bold" >Sizes</h2>

    <div class="flex items-end">
        <WBtn :size="size" v-for="size in sizes" :key="size" class="mr-2 last:mr-0">
          {{ size }}
        </WBtn>
    </div>
    
    
  </div>
</template>
