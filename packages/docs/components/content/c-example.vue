
<script setup lang="ts">
const props = defineProps({
    file: {
        type: String,
        default: '',
    }
})

const show = ref(false)

const { data: content } = await useFetch(`/api/examples/${props.file}`, {
    key: props.file,
})

const componentName = computed(() => {
    return `example-${props.file.replace(/\//g, '-')}`
})

</script>

<template>
    <div class="w-full border rounded drop-shadow bg-white my-5">
        <div class="p-5">
            <component :is="componentName" />
        </div>        
        
        <div class="border-t px-5 py-2 text-right">
            <button @click="show = !show">
                <fa-icon icon="fa-solid fa-code" />
            </button>
        </div>

        <transition name="slide-down">
            <div v-if="show">
                <prose-code v-html="content" :rounded="false" />
                
                <div class="text-center w-full py-2" >
                    <button @click="show = false">
                        Hide
                    </button>
                </div>
            </div>
        </transition>
    </div>
</template>

<style>
.slide-down-enter-active,
.slide-down-leave-active {
  transition: max-height 0.5s ease-in-out;
}

.slide-down-enter-to,
.slide-down-leave-from {
  overflow: hidden;
  max-height: 1000px;
}

.slide-down-enter-from,
.slide-down-leave-to {
  overflow: hidden;
  max-height: 0;
}
</style>