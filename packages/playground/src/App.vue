<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import routes from './router/routes'

</script>

<template>
  
  <header class="h-[60px] border-b wrapper flex items-center py-2 px-4">    
      <nav>
        <RouterLink 
          v-for="link in routes"
          :key="link.name"
          :to="link.path"
          class="border py-1 px-4 mr-4"
        >
          {{ link.name }}
      </RouterLink>
      </nav>    
  </header>

  <div class="h-[calc(100vh_-_60px)] px-4 py-4">
    <RouterView />
  </div>

</template>

