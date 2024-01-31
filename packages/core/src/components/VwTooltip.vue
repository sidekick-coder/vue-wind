<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import { useFloating, flip, offset, type Placement } from '@floating-ui/vue';
import { twMerge } from 'tailwind-merge'
import { vVisible } from '../directives/vVisible'; // replace with the path to the directive

import type { ComponentPublicInstance, TransitionProps } from 'vue';

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

// floating ui definition
const root = ref<Element | null>(null)
const floating = ref<HTMLElement | null>(null)

const placement = defineProp<Placement>('placement', {
    type: String,
    default: 'bottom',
})

const { floatingStyles } = useFloating(root, floating, {
    placement,
    middleware: [flip(), offset(6)],
})

function onRef(el: Element | ComponentPublicInstance | null)  {
    if (el instanceof Element) {
        root.value = el
        return
    }

    if (el?.$el) {
        root.value = el.$el
        return
    }
}

// color
type ColorProp = 'none' | 'zinc' | 'teal' | 'red' | 'blue' | 'yellow' | 'purple' | 'pink'

const color = defineProp<ColorProp>('color', {
    type: String,
    default: 'zinc',
})

function setColor(){
    const options = {
        'none': '',
        'zinc': 'bg-zinc-500 hover:bg-zinc-600 focus:bg-zinc-600 text-white',
        'teal': 'bg-teal-500 hover:bg-teal-600 focus:bg-teal-600 text-white',
        'red': 'bg-red-500 hover:bg-red-600 focus:bg-red-600 text-white',
        'blue': 'bg-blue-500 hover:bg-blue-600 focus:bg-blue-600 text-white',
        'yellow': 'bg-yellow-500 hover:bg-yellow-600 focus:bg-yellow-600 text-white',
        'purple': 'bg-purple-500 hover:bg-purple-600 focus:bg-purple-600 text-white',
        'pink': 'bg-pink-500 hover:bg-pink-600 focus:bg-pink-600 text-white',
    }

    classMap.value.set('color', options[color.value])
}

watch(color, setColor, { immediate: true })

// size
type SizeProp = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'

const size = defineProp<SizeProp>('size', {
    type: String,
    default: 'sm',
})

function setSize(){
    const options = {
        'none': '',
        'xs': 'px-2 py-1 text-xs',
        'sm': 'px-3 py-1 text-sm',
        'md': 'px-4 py-2 text-base',
        'lg': 'px-6 py-3 text-lg',
        'xl': 'px-8 py-4 text-xl',
    }

    classMap.value.set('size', options[size.value])
}

watch(size, setSize, { immediate: true })

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

// visibility
const model = defineModel({
    default: false,
})

function show() {
    model.value = true
}

function hide() {
    model.value = false
}

// transition
const transitionAttrs = defineProp<TransitionProps>('transitionAttrs', {
    type: Object,
    default: () => ({
        enterActiveClass: 'transition ease-out duration-100',
        leaveActiveClass: 'transition ease-in duration-75',
        enterFromClass: 'opacity-0 scale-50',
        leaveToClass: 'opacity-0 scale-50',
    }),
})

</script>

<template>
    <slot
        name="activator"
        :attrs="{
            ref: onRef,
            onMouseenter: show,
            onMouseleave: hide
        }" 
    />

    <div ref="floating" :style="floatingStyles" class="pointer-events-none">
        <transition v-bind="transitionAttrs">
            <div
                :class="classes"
                v-visible="model"
            >
                <slot  />
                
            </div>
            
        </transition>
        
       
    </div>
</template>