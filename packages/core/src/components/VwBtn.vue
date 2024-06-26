<script lang="ts" setup>
import { computed, watch, ref } from 'vue';
import { twMerge } from 'tailwind-merge'

// general
const className = defineProp<string>('class', {
    type: String,
    default: null
})

const classMap = ref(new Map<string, string>())

const classes = computed(() => {
    const all = Array.from(classMap.value.values()).join(' ')

    return twMerge(all, className.value)
})

classMap.value.set('base', 'transition')

// size
type SizeProp = 'none' | 'xs' | 'md'

const size = defineProp<SizeProp>('size', {
    type: String,
    default: 'md',
})

function setSize(){
    const options = {
        none: '',
        xs: 'px-2 py-1 text-xs',
        sm: 'px-3 py-1 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-6 py-3 text-lg',
        xl: 'px-8 py-4 text-xl',
    }

    classMap.value.set('size', options[size.value])
}

watch(size, setSize, { immediate: true })

// color & variant
type ColorProp = 'none' | 'zinc' | 'teal' | 'red' | 'blue' | 'yellow' | 'purple' | 'pink'
type VariantProp = 'default' | 'outlined' | 'text'

const color = defineProp<ColorProp>('color', {
    type: String,
    default: 'zinc',
})

const variant = defineProp<VariantProp>('variant', {
    type: String,
    default: 'default',
})

function setDefaultColor(){
    const options = {
        'none': '',
        'zinc': 'bg-zinc-500 text-white hover:bg-zinc-600',
        'teal': 'bg-teal-500 text-white hover:bg-teal-600',
        'red': 'bg-red-500 text-white hover:bg-red-600',
        'blue': 'bg-blue-500 text-white hover:bg-blue-600',
        'yellow': 'bg-yellow-500 text-white hover:bg-yellow-600',
        'purple': 'bg-purple-500 text-white hover:bg-purple-600',
        'pink': 'bg-pink-500 text-white hover:bg-pink-600',
    }

    const option = options[color.value] ?? options['zinc']

    classMap.value.set('color', option)
}

function setOutlinedColor(){
    const options = {
        'none': '',
        'zinc': 'bg-transparent text-zinc-500 border border-zinc-500 hover:bg-zinc-500 hover:text-white',
        'teal': 'bg-transparent text-teal-500 border border-teal-500 hover:bg-teal-500 hover:text-white',
        'red': 'bg-transparent text-red-500 border border-red-500 hover:bg-red-500 hover:text-white',
        'blue': 'bg-transparent text-blue-500 border border-blue-500 hover:bg-blue-500 hover:text-white',
        'yellow': 'bg-transparent text-yellow-500 border border-yellow-500 hover:bg-yellow-500 hover:text-white',
        'purple': 'bg-transparent text-purple-500 border border-purple-500 hover:bg-purple-500 hover:text-white',
        'pink': 'bg-transparent text-pink-500 border border-pink-500 hover:bg-pink-500 hover:text-white',
    }

    const option = options[color.value] ?? options['zinc']

    classMap.value.set('color', option)
}

function setTextColor(){
    const options = {
        'none': '',
        'zinc': 'bg-transparent text-zinc-500 hover:bg-zinc-500/25',
        'teal': 'bg-transparent text-teal-500 hover:bg-teal-500/25',
        'red': 'bg-transparent text-red-500 hover:bg-red-500/25',
        'blue': 'bg-transparent text-blue-500 hover:bg-blue-500/25',
        'yellow': 'bg-transparent text-yellow-500 hover:bg-yellow-500/25',
        'purple': 'bg-transparent text-purple-500 hover:bg-purple-500/25',
        'pink': 'bg-transparent text-pink-500 hover:bg-pink-500/25',
    }

    const option = options[color.value] ?? options['zinc']

    classMap.value.set('color', option)
}

function setVariant(){
    const options = {
        default: setDefaultColor,
        outlined: setOutlinedColor,
        text: setTextColor,
    }

    const option = options[variant.value] ?? options['default']

    option()
}

watch([color, variant], setVariant, { immediate: true })

// rounded
type RoundedProp = 'none' | 'sm' | 'md' | 'lg' | 'full'

const rounded = defineProp<RoundedProp>('rounded', {
    type: String,
    default: 'md',
})

function setRounded(){
    const options = {
        none: '',
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-lg',
        full: 'rounded-full',
    }

    classMap.value.set('rounded', options[rounded.value])
}

watch(rounded, setRounded, { immediate: true })
</script>

<template>
    <button :class="classes">
        <slot></slot>
    </button>
</template>
