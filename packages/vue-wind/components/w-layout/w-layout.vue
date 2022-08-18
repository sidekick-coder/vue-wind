<script setup lang="ts">
import { computed } from "vue";

import { useBuilder } from "../../composables/builder";
import { provideLayout } from "./composable";

const props = defineProps({
    usePercentage: {
        type: Boolean,
        default: false,
    },
})

const builder = useBuilder();

builder
    .add("overflow-hidden flex flex-wrap relative")
    .toggler("h-screen w-screen", !props.usePercentage)
    .toggler( "h-full w-full", props.usePercentage);

const classes = computed(() => builder.make());

provideLayout();

</script>

<template>
    <div :class="classes">
        <slot />
    </div>
</template>
