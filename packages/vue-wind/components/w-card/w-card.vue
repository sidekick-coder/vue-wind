<script setup lang="ts">
import { useBuilder } from "../../composables/builder";
import { colors } from "./variations";

const props = defineProps({
    color: {
        type: String,
        default: "white",
    },
    'custom:color': {
        type: String,
        default: null,
    },
    shadow: {
        type: Boolean,
        default: true,
    },
    rounded: {
        type: Boolean,
        default: true,
    },
});

const builder = useBuilder();

builder
    .add(props['custom:color'] ?? colors[props.color])
    .toggler("drop-shadow", props.shadow)
    .toggler("rounded", props.rounded)

builder.createChild('header').add('border-b px-4 py-2 flex items-center')

builder.createChild('footer').add('border-t px-4 py-2 flex items-center')

builder.createChild('content').add('px-4 py-2')

</script>
<template>
    <div :class="builder.make()">
        
        <div v-if="$slots.header" :class="builder.child('header').make()">
            <slot name="header" />
        </div>

        <div :class="builder.child('content').make()">
            <slot />
        </div>

        
        <div v-if="$slots.footer" :class="builder.child('footer').make()">
            <slot name="footer" />
        </div>
    </div>
</template>
