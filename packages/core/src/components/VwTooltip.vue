<script lang="ts" setup>
import { ref } from 'vue';
import { useFloating, flip, offset, type Placement } from '@floating-ui/vue';
import { vVisible } from '../directives/vVisible'; // replace with the path to the directive

import type { ComponentPublicInstance, TransitionProps } from 'vue';

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

console.log(model.value)

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

    <div ref="floating" :style="floatingStyles">
        <transition v-bind="transitionAttrs">
            <div
                class="bg-zinc-700 text-zinc-100 py-1 px-2 rounded relative"
                v-visible="model"
            >
                <slot  />

                <div
                    class="flex absolute inset-0"
                    :class="[
                        placement === 'top' && 'justify-center items-end',
                        placement === 'bottom' && 'justify-center items-start',
                        placement === 'right' && 'justify-start items-center',
                        placement === 'left' && 'justify-end items-center',               
                    ]"
                >
                    <div
                        class="w-2 h-2 bg-zinc-700 rotate-45"
                        :class="[
                            placement === 'top' && 'translate-y-1/2',
                            placement === 'bottom' && '-translate-y-1/2',
                            placement === 'right' && '-translate-x-1/2',
                            placement === 'left' && 'translate-x-1/2',
                        ]"
                    />
                </div>
                
            </div>
            
        </transition>
        
       
    </div>
</template>