<script setup lang="ts">
import { useBuilder } from "../../composables/builder";
import { useVModel } from "../../composables/v-model";
import { computed } from "vue";

const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false,
    },
})

const emit = defineEmits(['update:modelValue'])

const builder = useBuilder();
const model = useVModel(props, "modelValue", emit);

builder
    .add("bg-black/75")
    .add("fixed")
    .add("inset-0", "z-20")
    .add("h-full", "w-full")
    .add("flex", "items-center", "justify-center")

const classes = computed(() =>
    builder
        .make()
);

</script>
<template>
    <teleport to="body" >
        <div v-show="model" :class="classes" @click="model = false">
            <div @click.stop="">
                <slot />
            </div>
        </div>
    </teleport>    
</template>
