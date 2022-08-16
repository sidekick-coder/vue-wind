<script setup lang="ts">
const props = defineProps({
    name: {
        type: String,
        default: '',
    },
    file: {
        type: String,
        default: '',
    }
})

const loading = ref(true)
const show = ref(false)
const content = ref('')

$fetch(`/api/examples/${props.file}`)
    .then(res => content.value = res)
    .finally(() => loading.value = false)

const componentName = computed(() => {
    return `example-${props.file.replace(/\//g, '-')}`
})

</script>
<template>
    <div class="w-full border rounded drop-shadow bg-white">
        <div class="p-4">
            <component :is="componentName" />
        </div>

        
        
        <div class="border-t px-4 py-2 text-right">
            <button @click="show = !show">
                code
            </button>
        </div>

        <div v-show="show">
            <prose-code v-html="content" />
            
            <div class="text-center w-full py-2" >
                <button @click="show = false">
                    Hide
                </button>
            </div>
        </div>

    </div>
</template>