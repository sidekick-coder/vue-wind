<script lang="ts">
import { useBuilder } from "@/composable/tailwind";
import { computed, defineComponent, ref } from "vue";

export const builder = useBuilder();

builder.static("relative");

builder
    .child("tooltip")
    .option("color", "bg", "gray-500")
    .option("textColor", "text", "white")
    .static("rounded-md px-4 py-1 text-xs")
    .static("fixed")
    .static("mx-auto")
    .static("transition-all");

export default defineComponent({
    props: {
        ...builder.props,
        ...builder.child("tooltip").props,
        position: {
            type: String,
            default: "bottom",
        },
        tag: {
            type: String,
            default: "div",
        },
        label: {
            type: String,
            default: "",
        },
    },
    setup(props) {
        const hover = ref(false);
        const root = ref<HTMLElement>();

        const position = ref({
            x: 0,
            y: 0,
        });

        const classes = computed(() => ({
            main: builder.make(props),
            tooltip: builder.child("tooltip").make({
                ...props,
            }),
            content: builder.child("content").make(props),
        }));

        function onMouseHover(e: MouseEvent) {
            let x = e.clientX;
            let y = e.clientY;

            if (root.value) {
                const rect = root.value.getBoundingClientRect();
                x = rect.x;
                y = rect.y + rect.height + 10;
            }

            position.value.x = x;
            position.value.y = y;

            hover.value = true;
        }

        function onMouseLeave() {
            hover.value = false;
        }

        return { root, hover, classes, position, onMouseHover, onMouseLeave };
    },
});
</script>
<template>
    <component
        :is="tag"
        ref="root"
        :class="classes.main"
        @mouseover="onMouseHover"
        @mouseleave="onMouseLeave"
    >
        <div :class="classes.content">
            <slot></slot>
        </div>

        <teleport to="body">
            <div
                :class="classes.tooltip"
                v-show="hover"
                :style="`left:${position.x}px;top:${position.y}px`"
            >
                {{ label }}
            </div>
        </teleport>
    </component>
</template>
