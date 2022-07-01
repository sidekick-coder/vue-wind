<script lang="ts">
import { useBuilder } from "@/composable/tailwind";
import { computed, defineComponent, ref, watch } from "vue";

export const builder = useBuilder();

builder.static("relative");

builder.child("menu").static(" rounded z-20 absolute w-full overflow-hidden");

export default defineComponent({
    setup() {
        const menuRef = ref<HTMLElement>();
        const rootRef = ref<HTMLElement>();
        const model = ref(false);
        const close = () => (model.value = false);

        const classes = computed(() => ({
            main: builder.make(),
            menu: builder.child("menu").make(),
        }));

        const listener = (event: any) => {
            const isClickInside = menuRef.value?.contains(event.target);

            if (isClickInside) return;

            close();

            window.removeEventListener("mouseup", listener);
        };

        watch(model, (v) => {
            if (!v) return;

            window.addEventListener("mouseup", listener);
        });

        return { rootRef, menuRef, model, classes, close };
    },
});
</script>

<template>
    <div :class="classes.main" @mouseenter="model = true" @mouseleave="close">
        <slot name="activator" />

        <div v-show="model" ref="menuRef" :class="classes.menu" @click="close">
            <slot />
        </div>
    </div>
</template>
