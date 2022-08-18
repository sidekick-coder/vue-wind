<script setup lang="ts">
import { resolveComponent } from "vue";
import { useBuilder } from "../../composables/builder";
import { useVariation } from '../../composables/button';

const props = defineProps({
    color: {
        type: String,
        default: undefined,
    },
    'custom:color': {
        type: String,
        default: null,
    },
    size: {
        type: String,
        default: "md",
    },
    'custom:size': {
        type: String,
        default: null,
    },
    loading: {
        type: Boolean,
        default: false,
    },
    outlined: {
        type: Boolean,
        default: false,
    },
    rounded: {
        type: Boolean,
        default: true,
    },
    roundedFull: {
        type: Boolean,
        default: false,
    },
    shadow: {
        type: Boolean,
        default: true,
    },
    nuxt: {
        type: Boolean,
        default: false,
    },
})

const variation = useVariation()
const color = props.color ?? variation.color

const builder = useBuilder();

const findColor = () => {
    if (props['custom:color']) {	
        return props['custom:color']
    }

    if (props.outlined) {
        return  variation.colors[`outlined:${color}`]
    }


    return variation.colors[`basic:${color}`]
}

builder
    .add(findColor())
    .add(props['custom:size'] ?? variation.sizes[props.size])
    .add("disabled:opacity-75 relative")
    .add("flex items-center justify-center")
    .add("hover:opacity-75 transition-opacity duration-150")
    .toggler("rounded", props.rounded)
    .toggler("drop-shadow", props.shadow)

builder
    .createChild("loading")
    .toggler("rounded", props.rounded)
    .add("absolute inset-0 flex items-center justify-center ")
    .add(findColor())

if (props.roundedFull) {
    builder.add("rounded-full").remove("rounded")
    builder.child("loading").add("rounded-full").remove("rounded")
}

const tag = props.nuxt ? resolveComponent('nuxt-link') : 'button'

</script>

<template>
    <component :is="tag" :class="builder.make()">
        <div v-if="loading" :class="builder.child('loading').make()">
                <slot name="loading">...</slot>
            </div>
        <slot />
    </component>
</template>
