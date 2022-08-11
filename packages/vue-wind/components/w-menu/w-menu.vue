<script lang="ts">
import { useBuilder } from "@/composable/tailwind";
import { computed, defineComponent, ref, watch } from "vue";

export const builder = useBuilder();

builder.static("relative");

builder.child("menu").static(" rounded z-20 absolute w-full overflow-hidden");

export default defineComponent({
    props: {
        modelValue: {
            type: Boolean,
            default: null,
        },
    },
    emits: ["update:modelValue"],
    setup(props, { emit }) {
        const menuRef = ref<HTMLElement>();
        const rootRef = ref<HTMLElement>();
        const innerModel = ref(!!props.modelValue);

        const model = computed<boolean>({
            get() {
                if (typeof props.modelValue !== "boolean") {
                    return innerModel.value;
                }

                return props.modelValue;
            },
            set(value) {
                if (typeof props.modelValue !== "boolean") {
                    innerModel.value = value;
                    return;
                }

                emit("update:modelValue", value);
            },
        });

        const close = () => (model.value = false);

        const classes = computed(() => ({
            main: builder.make(),
            menu: builder.child("menu").make(),
        }));

        const listener = (event: any) => {
            const isClickInside = rootRef.value?.contains(event.target);

            if (isClickInside) return;

            close();

            window.removeEventListener("mouseup", listener);
        };

        watch(model, (v) => {
            if (!v) return;

            window.addEventListener("mouseup", listener);
        });

        function onMouseEnter() {
            if (typeof props.modelValue !== "boolean") {
                model.value = true;
            }
        }

        function onMouseLeave() {
            if (typeof props.modelValue !== "boolean") {
                model.value = false;
            }
        }

        return {
            rootRef,
            menuRef,
            model,
            classes,
            onMouseEnter,
            onMouseLeave,
            close,
        };
    },
});
</script>

<template>
    <div
        ref="rootRef"
        :class="classes.main"
        @mouseenter="onMouseEnter"
        @mouseleave="onMouseLeave"
    >
        <slot name="activator" />

        <div v-show="model" ref="menuRef" :class="classes.menu" @click="close">
            <slot />
        </div>
    </div>
</template>
