<script setup lang="ts">
import { computed, onMounted, type PropType } from 'vue'
import { defineVariation, mountAllVariations } from '@vue-wind/composables'

const props = defineProps({
    mode: {
        type: String as PropType<'default' | 'outlined'>,
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

const size = defineVariation({
    sm: 'py-1 px-2 text-sm',
    md: 'py-2 px-4 text-base',
    lg: 'py-3 px-6 text-lg',
})

size.onEmpty((v) => ({
    classes: v,
}))

// color

const color = defineVariation({
    teal: 'bg-teal-500 text-white',
    red: 'bg-red-500 text-white',
    blue: 'bg-blue-500 text-white',
})

color.setShared('transition-colors duration-300 ease-in-out')

color.onEmpty((v) => ({
    classes: 'bg-[var(--color)]',
    styles: `--color: ${v};`,
}))

onMounted(() => {
    if (props.mode === 'default') return

    if (props.mode === 'outlined') {
        color.update({
            teal: 'border border-teal-500 text-teal-500',
            red: 'border border-red-500 text-red-500',
            blue: 'border border-blue-500 text-blue-500',
        })

        color.onEmpty((v) => ({
            classes: 'border border-[var(--color)] text-[var(--color)]',
            styles: `--color: ${v};`,
        }))


        return
    }
})


// mount

const bindings = computed(() => mountAllVariations([
    [props.size, size],
    [props.color, color],
]))


</script>
<template>
    <button v-bind="bindings">
        <slot />
    </button>
</template>