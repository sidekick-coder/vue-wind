<script setup lang="ts">
import { useBuilder } from "../../composables/builder";
import { useVModel } from "../../composables/v-model";
import { computed, ref } from "vue";

const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false,
    },
    closeOnOverlayClick: {
        type: Boolean,
        default: true,
    },
    cardClass: {
        type: String,
        default: 'w-full max-w-[500px]'
    }
})

const emit = defineEmits(['update:modelValue'])

const builder = useBuilder();
const model = useVModel(props, "modelValue", emit);
const bounce = ref(false)

builder
    .add("bg-black/75")
    .add("fixed")
    .add("inset-0", "z-20")
    .add("h-full", "w-full")
    .add("flex", "items-center", "justify-center")

builder
    .createChild('card')
    .add('transition  ease-in-out')
    .add(props.cardClass)

const classes = computed(() => ({
    main: builder.make(),
    card: builder.child('card')
        .toggler('scale-110', bounce.value)
        .make()
}));

function onClick(){
    if (!props.closeOnOverlayClick) {
        bounce.value = true

        setTimeout(() => bounce.value = false, 100)

        return
    }

    model.value = false
}

function onClickContent(){
    //
}

</script>
<template>
    <teleport to="body" >
        <div v-show="model" :class="classes.main" @click="onClick">
            <slot name='content'>
                <w-card :class="classes.card" @click.stop="onClickContent">
                    <slot />
                </w-card>
            </slot>
        </div>
    </teleport>    
</template>
