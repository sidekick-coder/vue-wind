<script lang="ts">
import { defineComponent } from '#imports'

export default defineComponent({
  props: {
    code: {
      type: String,
      default: ''
    },
    language: {
      type: String,
      default: null
    },
    filename: {
      type: String,
      default: null
    },
    highlights: {
      type: Array as () => number[],
      default: () => []
    },
    rounded: {
      type: Boolean,
      default: true
    },
  }
})
</script>

<template>
  <div class="code-container" :class="{ rounded }">
    <slot />
  </div>
</template>


<style>
.code-container {
  @apply bg-gray-800 block px-5 py-4 my-4 overflow-auto;
}

.code-container code {
  @apply flex flex-wrap;
}

.code-container .line {
  @apply inline-block w-full min-h-[1rem] text-sm;

}

</style>