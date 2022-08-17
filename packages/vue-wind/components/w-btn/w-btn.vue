<script setup lang="ts">
import { useBuilder } from "../../composables/builder";
import { colors, sizes } from './variations'

const props = defineProps({
    color: {
        type: String,
        default: "teal",
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
    }
})

const builder = useBuilder();

const findColor = () => {
    if (props['custom:color']) {	
        return props['custom:color']
    }

    if (props.outlined) {

        return colors[`outlined:${props.color}`]
    }


    return colors[`basic:${props.color}`]
}

builder
    .add(findColor())
    .add(props['custom:size'] ?? sizes[props.size])
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

</script>

<template>
    <button :class="builder.make()">
            <div v-if="loading"  :class="builder.child('loading').make()">
                <slot name="loading">...</slot>
            </div>
        <slot />
    </button>
</template>
