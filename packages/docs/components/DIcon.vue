<script lang="ts" setup>
import { Icon } from '@iconify/vue'

const name = defineProp<string>('name', {
    type: String,
    required: true
})

const className = defineProp<string>('class', {
    type: String,
    default: null
})
</script>

<template>
    <Icon :icon="name" :class="className" />
</template>
