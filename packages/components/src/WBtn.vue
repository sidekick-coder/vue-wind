<script setup lang="ts">
import { computed } from 'vue'
import { defineVariation } from '@vue-wind/composables'

const props = defineProps({
    mode: {
        type: String,
        default: 'default'
    },
    size: {
        type: String,
        default: 'md'
    },
    color: {
        type: String,
        default: 'teal'
    },
})

// size

const size = defineVariation(props, 'size', {
    sm: 'py-1 px-2 text-sm',
    md: 'py-2 px-4 text-base',
    lg: 'py-3 px-6 text-lg',
    _empty: (value: string) => {
        return {
            classes: value,
        }
    },
})

// color

const color = defineVariation(props, 'color', {
    teal: 'bg-teal-500 text-white',
    red: 'bg-red-500 text-white',
    blue: 'bg-blue-500 text-white',
    _empty: (value: string) => {
        return {
            classes: 'bg-[var(--color)]',
            styles: `--color: ${value};`,
        }
    },
})

// mount

const bindings = computed(() => {
    return {
        class: [size.classes, color.classes].join(' '),
        style: [size.styles, color.styles].join(' '),
    }
})


</script>
<template>
    <button v-bind="bindings">
        <slot />
    </button>
</template>