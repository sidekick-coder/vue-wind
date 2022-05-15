<script lang="ts">
import { useBuilder } from "@/composable/tailwind";
import { computed } from "@vue/reactivity";
import { defineComponent } from "vue";
import { provideLayout } from "./composable";

export const builder = useBuilder();

builder
    .static("overflow-hidden flex flex-wrap")
    .toggle("useScreen", "h-screen w-screen")
    .toggle("usePercentage", "h-full w-full");

export default defineComponent({
    props: {
        ...builder.props,
        usePercentage: {
            type: Boolean,
            default: false,
        },
    },
    setup(props) {
        const { update } = provideLayout();

        setTimeout(() => {
            update();
        }, 500);

        const classes = computed(() =>
            builder.make({
                ...props,
                usePercentage: props.usePercentage,
                useScreen: !props.usePercentage,
            })
        );

        return { classes };
    },
});
</script>

<template>
    <div :class="classes">
        <slot />
    </div>
</template>
<style>
* {
    scrollbar-width: none;
}
</style>
