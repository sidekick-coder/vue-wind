<script setup lang="ts">
import { computed, ref } from "vue";
import { useBuilder } from "../../composables/builder";

defineProps({
    tag: {
        type: String,
        default: "div",
    },
    label: {
        type: String,
        default: "",
    },
})

const builder = useBuilder();
const hover = ref(false);
const root = ref<HTMLElement>();
const position = ref({
    x: 0,
    y: 0,
});


builder.add("relative");

builder
    .createChild("tooltip")
    .add('bg-black/75 text-white')
    .add("rounded-md px-4 py-1 text-xs")
    .add("fixed")
    .add("mx-auto")
    .add("transition-all")

builder.createChild('content')

const classes = computed(() => ({
    main: builder.make(),
    tooltip: builder.child("tooltip").make(),
    content: builder.child("content").make(),
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
                <slot name="label">
                    {{ label }}
                </slot>
            </div>
        </teleport>
    </component>
</template>
